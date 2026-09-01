import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', 'node_modules', '_graphify-out']);

// 1. Inventory the real file tree
const allFiles = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(path.join(dir, e.name));
    } else {
      allFiles.push(path.relative(ROOT, path.join(dir, e.name)).split(path.sep).join('/'));
    }
  }
}
walk(ROOT);

const byPathNoExt = new Map(); // 'wiki/foo' -> [files]
const byPathExt = new Map();   // 'wiki/foo.md' -> [files]
const byBase = new Map();      // 'foo' -> [files] (basename no ext)
const add = (m, k, f) => { if (!m.has(k)) m.set(k, []); m.get(k).push(f); };
for (const f of allFiles) {
  const ext = path.extname(f);
  const noExt = f.slice(0, f.length - ext.length);
  add(byPathExt, f.toLowerCase(), f);
  add(byPathNoExt, noExt.toLowerCase(), f);
  add(byBase, path.basename(noExt).toLowerCase(), f);
}

// normalize for drift matching: dates YYYY-MM-DD->YYYYMMDD, collapse separators
function norm(s) {
  return s.toLowerCase()
    .replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1$2$3')
    .replace(/[-_]+/g, '')
    .replace(/\s+/g, '');
}
const byBaseNorm = new Map();
for (const f of allFiles) {
  const noExt = f.slice(0, f.length - path.extname(f).length);
  add(byBaseNorm, norm(path.basename(noExt)), f);
}

// 2. Extract links from each .md, ignoring code
function stripCode(text) {
  text = text.replace(/```[\s\S]*?```/g, m => m.replace(/[^\n]/g, ' '));
  text = text.replace(/`[^`\n]*`/g, m => m.replace(/[^\n]/g, ' '));
  return text;
}

const mdFiles = allFiles.filter(f => f.endsWith('.md'));
const results = { autorepair: [], dead: [], ambiguous: [], scanned: 0 };

function resolveTarget(rawTarget, srcFile) {
  // strip alias and section/anchor
  let t = rawTarget.split('|')[0].trim();
  t = t.split('#')[0].trim();
  if (!t) return { status: 'anchor' }; // pure section link within same file
  const tl = t.toLowerCase();
  const tlNoMd = tl.replace(/\.md$/, '');
  const hasSlash = t.includes('/');
  // direct resolution
  if (hasSlash) {
    if (byPathExt.has(tl) || byPathNoExt.has(tl) || byPathNoExt.has(tlNoMd)) return { status: 'ok' };
    if (byPathExt.has(tl + '.md')) return { status: 'ok' };
  } else {
    if (byBase.has(tlNoMd)) {
      return byBase.get(tlNoMd).length === 1 ? { status: 'ok' } : { status: 'ok-multi' };
    }
  }
  // unresolved -> drift candidate by normalized basename
  const base = path.basename(t).replace(/\.md$/, '');
  const cand = byBaseNorm.get(norm(base)) || [];
  const uniq = [...new Set(cand)];
  if (uniq.length === 1) return { status: 'drift', target: uniq[0] };
  if (uniq.length > 1) return { status: 'ambiguous', candidates: uniq };
  return { status: 'dead' };
}

for (const f of mdFiles) {
  const raw = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const text = stripCode(raw);
  const links = [];
  // wikilinks (incl embeds)
  for (const m of text.matchAll(/!?\[\[([^\]]+)\]\]/g)) links.push({ kind: 'wiki', target: m[1] });
  // markdown links to vault files
  for (const m of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    let p = m[1].trim();
    if (/^(https?:|mailto:|#|tel:|obsidian:)/i.test(p)) continue;
    p = p.split('#')[0].replace(/^<|>$/g, '').trim();
    if (!p) continue;
    links.push({ kind: 'md', target: decodeURIComponent(p) });
  }
  for (const l of links) {
    results.scanned++;
    let r;
    if (l.kind === 'md') {
      // resolve relative to file dir then root
      const relDir = path.dirname(f);
      const tries = [
        path.normalize(path.join(relDir, l.target)).split(path.sep).join('/'),
        path.normalize(l.target).split(path.sep).join('/'),
      ];
      let ok = false;
      for (const tr of tries) {
        const trl = tr.toLowerCase();
        if (byPathExt.has(trl) || byPathNoExt.has(trl) || byPathExt.has(trl + '.md')) { ok = true; break; }
      }
      if (ok) continue;
      // drift / dead for md links
      const base = path.basename(l.target);
      const cand = [...new Set(byBaseNorm.get(norm(base.replace(/\.md$/,''))) || [])];
      if (cand.length === 1) results.autorepair.push({ src: f, link: l.target, kind: 'md', target: cand[0] });
      else if (cand.length > 1) results.ambiguous.push({ src: f, link: l.target, kind: 'md', candidates: cand });
      else results.dead.push({ src: f, link: l.target, kind: 'md' });
      continue;
    }
    r = resolveTarget(l.target, f);
    if (r.status === 'ok' || r.status === 'anchor') continue;
    if (r.status === 'ok-multi') continue; // resolves (basename unique enough in Obsidian); not broken
    if (r.status === 'drift') results.autorepair.push({ src: f, link: l.target, kind: 'wiki', target: r.target });
    else if (r.status === 'ambiguous') results.ambiguous.push({ src: f, link: l.target, kind: 'wiki', candidates: r.candidates });
    else results.dead.push({ src: f, link: l.target, kind: 'wiki' });
  }
}

console.log(`Inventory: ${allFiles.length} files (${mdFiles.length} markdown)`);
console.log(`Links scanned: ${results.scanned}`);
console.log(`\n=== AUTO-REPAIR CANDIDATES (unambiguous drift): ${results.autorepair.length} ===`);
for (const x of results.autorepair) console.log(`  [${x.src}]  ${x.kind}:[[${x.link}]]  ->  ${x.target}`);
console.log(`\n=== AMBIGUOUS (multiple candidates): ${results.ambiguous.length} ===`);
for (const x of results.ambiguous) console.log(`  [${x.src}]  ${x.kind}:[[${x.link}]]  ->  ${x.candidates.join(' | ')}`);
console.log(`\n=== DEAD (no target): ${results.dead.length} ===`);
for (const x of results.dead) console.log(`  [${x.src}]  ${x.kind}:[[${x.link}]]`);
