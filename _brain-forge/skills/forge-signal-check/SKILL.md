---
name: forge-signal-check
description: "Graph-informed maintenance + lint/health-check pass on the wiki/ synthesis layer plus the slim primers catalog (primers/_index.md). Enriches natural wikilinks, surfaces contradictions/duplication/orphans/stale claims/large-or-unfocused pages, light frontmatter hygiene per the Frontmatter Constitution, and — as consumer #2 of forge-synthesis-engine — runs an engine-driven restructure/de-duplication/canonical-home/re-scope pass (propose-only). Delegates link integrity to vault-link-check; requires fresh Graphify for full passes. Follows the vault constitution: strong preference for updating existing pages, always add provenance, present findings + proposals rather than large autonomous refactors. Human direction overrides."
argument-hint: "[optional: specific wiki page path (e.g. wiki/ai-skills.md) or 'all' or 'primers-index']"
---

> Product core (`_brain-forge/skills/forge-signal-check/SKILL.md`). Install copies the framework folder into an instance. Adopting a skill into a host is the vault owner's job.

# forge-signal-check Skill

The dedicated **Lint / Health Check** and ongoing graph-informed maintenance of the `wiki/` (LLM-maintained synthesis) layer, plus maintenance of the slim human-readable catalog in `primers/_index.md`. This is wiki-layer maintenance (forging the synthesis). The `/forge-signal-check` command is a thin, human-facing entry point.

**Brain vs. hands.** This skill is **consumer #2 of `forge-synthesis-engine`** (canonical core: `_brain-forge/skills/forge-synthesis-engine/SKILL.md`): it calls the engine's classification + learned-preferences brain to drive **restructure / de-duplication / canonical-home / re-scope proposals** over *existing* wiki content (step 6), and owns its own gated edit path. It also delegates **link integrity** to the `vault-link-check` engine (step 4). Two delegations, two concerns: link integrity = a filesystem check; restructure = a classification check. (Engine consumer of `forge-synthesis-engine`.)

**Purpose:** Keep the wiki high-signal, well-connected, and navigable without unnecessary page proliferation. The forge purview is conservative by default and favors integration and enrichment over creation or large structural changes.

**When to run:**
- Periodically (e.g. after batches of raw ingest or significant wiki evolution).
- Before or after major synthesis work.
- Whenever you have (or can obtain) a fresh Graphify output and want to strengthen connections or audit health.
- On explicit request: "run maintenance on the wiki", "lint the wiki", "health check wiki/", "find duplication / restructure", etc.

**Prerequisites:**
- A fresh graph is **mandatory** for any full pass. Run `/vault-graph-refresh` first if `_graphify-out/` (or `graphify-out/`) is stale (> ~24h or after substantial changes). Recommended focused scope: `graphify wiki raw`. Graphify is a user install; `vault-graph-refresh` carries the install steps.
- Consult `wiki/_index.md` and recent `raw/_log.md` for orientation on what is current vs. legacy.

**Scope and philosophy:**
- Primary target: pages under `wiki/`, plus the slim catalog in `primers/_index.md`.
- Use `_graphify-out/graph.json` or `graphify-out/graph.json`, plus `GRAPH_REPORT.md` beside it (communities, god nodes, connections), and the HTML for relationship discovery.
- **Strong default**: update existing pages. Add wikilinks and small improvements where natural. Flag (do not auto-execute) anything that would create new pages, merge, split, or delete.
- Every meaningful edit must carry lightweight provenance.
- Human direction always overrides. Protected pages (`ai-behavior`) have strict limits — read and honor their AI Instructions callouts.

---

## Execution steps (for the target page(s) or 'all')

### 1. Load context
- Read the page (or pages).
- Read `wiki/_index.md`, recent sections of `raw/_log.md`, and the latest `_graphify-out/GRAPH_REPORT.md` + graph.json (for related nodes, communities, surprising connections).
- Note current frontmatter, existing wikilinks/provenance, and approximate size/focus. Link-integrity file resolution is handled by `vault-link-check` in step 4.

### 2. Frontmatter hygiene (light, schema-aligned)
Apply only safe, current-schema fixes per the Frontmatter Constitution (Core table + Canonical Frontmatter Blocks + rules) in `_brain-forge/schema.md`:
- Ensure appropriate `type:` (e.g. `concept`, `topic`, `reference`, `project`, `evolution`, `log`, `primer` — never legacy values).
- `signal: true` on high-value living content that should participate in the graph and AI attention.
- `status: active|draft|archived|...` where it adds orientation value.
- `created:` and `last-updated:` (YYYY-MM-DD) present and reasonable.
- For pages with `ai-behavior`: confirm the matching collapsed `> [!ai-instructions]- AI Instructions (Strict)` callout exists immediately after the frontmatter block.
- Clean deprecated fields on regular (non-protected) pages: `maturity:`, `domains:`, old `tags: [signal]`, stray `title:`. Stamp `last-updated:` on any change.
- Align toward the canonical ordering defined in schema. Do not invent new properties. When in doubt, leave it or propose.

Auto-apply low-risk hygiene. Surface anything that requires judgment.

### 3. Wikilink enrichment and connection strengthening
- From graph data, identify strong related concepts that already exist as wiki pages.
- Where the concept/term appears naturally in the existing prose, wrap it with `[[Exact Page Title]]` (or `[[page|display text]]` only if it improves readability).
- Do **not** rewrite sentences or add explanatory text just to create a link.
- Add or repair provenance links back to `raw/YYYYMM/...` sources where a contribution is being integrated or was previously missing.
- Look for orphans or weakly connected pages and propose specific inbound links from higher-signal pages or the index.
- Keep additions high-signal and sparse.

Auto-apply these small, natural link/provenance additions.

### 4. Link integrity audit (delegate to `vault-link-check`)
Link resolution and drift repair are a **vault-purview** concern (substrate, not synthesis), so this step **delegates** to the `vault-link-check` skill — do not duplicate the resolution logic here.
- Invoke **`vault-link-check` scoped to `wiki/`**. It resolves every wikilink on the in-scope page(s) against the real file tree (a filesystem check, not a graph check), auto-repairs unambiguous rename/move drift (one clear target after normalizing `raw/YYYYMM/` relocation, `YYYY-MM-DD`→`YYYYMMDD`, separator changes), and surfaces dead or ambiguous links for human decision. It never auto-creates or auto-deletes files and honors the capability matrix + `ai-behavior` protections.
- Fold its results into this pass's summary (step 8).
- Full resolution rules live in `_brain-forge/skills/vault-link-check/SKILL.md`. **Why it matters:** a broken link silently spawns an empty phantom file the instant a human clicks it in Obsidian.

### 5. Health / lint scan (qualitative surface)
Surface (never silently fix):
- Contradictions, stale claims, or outdated references.
- Legacy-namespace references in *out-of-scope* surfaces (e.g. `journal/`, archived notes) — note for human cleanup.
- Weak overall connectivity or missing updates to `wiki/_index.md` for core areas / recent activity.
- Any drift from the current raw + wiki model or the vault constitution.

(Duplication and over-large/unfocused pages are now handled with model-driven rigor in step 6 — surface anything here that the engine pass doesn't, but prefer routing structural findings through step 6.)

For protected pages, only propose changes that respect their `ai-behavior` rules.

### 6. Restructure / de-duplication pass (engine-driven — `forge-synthesis-engine`)
The distinctive new value: drive consolidation/dedup/re-scope from the **learned classification model**, not one-off judgment. For the in-scope page(s):

- **Call `forge-synthesis-engine`** (module `classify`) treating each existing page's content as the material: *what is this page really about → which broad domain/hub → is that its canonical home → is it over-broad (a section ready to break out) or over-narrow (should fold into an umbrella)?* When synthesis steering is on, the engine reads `preferences.md` and the recent trace.
- **Emit proposals** in the categories: **consolidation/merge** (same idea in multiple places → canonical home + cross-links, or a merge target), **de-duplication**, **canonical-home assignment**, **re-scope** (over-large → extract a section into an existing page; over-narrow → fold under an umbrella hub).
- **Minimum proposal shape (required)** — each proposal must: (i) name a **canonical home**, (ii) cite **concrete** merge/cross-link/re-scope edits, (iii) carry **provenance**, (iv) be **propose-only / reversible**.
- **Propose-only (v1).** Never apply restructure edits autonomously. Present them (step 8); the human approves; approved edits are applied through this skill's own write path, governed by the capability matrix (`_brain-forge/schema.md`) + the confidence gate. (Proposal *quality* is learned from pilot feedback — see below.)
- **Post-apply envelope (§5.7).** After any approved restructure edit lands (merge/move/extract), run **`vault-link-check` scoped to `wiki/`** to repair links to merged/moved pages, then **refresh the graph** (`/vault-graph-refresh`) since edits make it stale.
- **Feed the shared trace (when steering is on).** When a restructure proposal gets feedback (accept/modify/reject), the engine writes a `source: forge-signal-check` entry to `tweaks-log.md`, and durable corrections fold into `preferences.md`. Off: do not create those files.


### 7. Index and activity recording
- If the pass reveals the need for catalog updates (new core area, major page, significant recent activity), prepare a concise proposed diff for `wiki/_index.md`.
- When touching `primers/_index.md`, keep it a slim, human-readable catalog only. Record non-trivial maintenance outcomes on the affected wiki page (or an instance system log, if it keeps one). Do **not** append to `raw/_log.md` unless the work also involved ingesting new raw material.
- **Primer-catalog lint:** diff tracked primer files against the catalog. Compare `git ls-files "primers/*.md"` (tracked only — gitignored personal primers like `_me.md` are naturally excluded; also ignore `primers/_index.md` itself) against the entries under "Tracked System Primers" in `primers/_index.md`. Flag any tracked primer missing from the catalog and any catalog entry whose file no longer exists. Propose additions/removals; do not silently rewrite the catalog.

### 8. Present compact summary + proposals
Always end with a clear, scannable report. Example structure:

```
── /forge-signal-check run: 2026-06-28 ──

Graph: fresh (2026-06-28, 281 nodes)   [or: stale — run /vault-graph-refresh first]

Auto-applied (small, low-risk):
  wiki/ai-skills.md — added natural [[wikilink]]s (2); removed legacy maturity: field; stamped last-updated

Restructure / dedup proposals (engine-driven; propose-only — canonical home + concrete edits):
  [merge] wiki/pkm.md §X duplicates wiki/ai-tooling.md §Y → canonical home: ai-tooling; cross-link from pkm. Provenance: <sources>. Reversible.
  [re-scope] wiki/some-large-page.md (~2100 words) → extract "X protocol" into [[related-concept]].

Findings (qualitative — review & direct):
  Orphan signal: [[claude-ai.md]] has few inbound wiki links. Consider adding from [[ai-skills]] or [[wiki/_index]].

No material issues on: wiki/harbor.md, ...
```

### 9. Log the run (minimal structured transcript — Eval Logs Convention)
If the instance keeps an eval log for this skill, append a minimal entry after presenting the summary:
- Append at the end (oldest-first reading order).
- Use the recommended skeleton (## date header, key metadata like Changeset/Graph/Auto-applied/Findings, canonical summary excerpt).
- **Live step call-outs required:** a "**Step call-outs observed during this execution:**" section with explicit "Step 1: ...", "Step 4: delegated to vault-link-check", "Step 6: engine-driven restructure pass", etc. for the major phases.
- Include a timing marker: "**Core log written at:** after presenting the summary (before any direction or ephemeral handling)."
- **Strict separation:** the eval-log is *tool-performance only*. The engine's *learning* content (restructure proposal → feedback → delta) goes to `tweaks-log.md` as `source: forge-signal-check`. Never mix.

If the pass is clean across the targets, say so concisely.

---

## Non-negotiables (the vault constitution + schema)

- **Fresh graph required** for full lint/health. Explicitly call out when operating on stale data and recommend `/vault-graph-refresh`.
- **Provenance on every meaningful contribution** to a wiki page.
- **Strong preference for existing pages.** New pages only when the topic is distinct, recurring/high-value, substantial, and likely to receive ongoing additions. Even then, propose — do not create unilaterally.
- **No large autonomous refactors.** Restructure/dedup is **propose-only (v1)** — present contradictions, duplication, scope issues as findings + concrete options (minimum proposal shape). Human decides; approved edits go through the capability matrix + confidence gate.
- **Restructure is engine-driven.** Drive consolidation/dedup/canonical-home/re-scope from `forge-synthesis-engine`'s classification + learned preferences (step 6), not ad-hoc judgment. Do not duplicate the classification doctrine here — it lives in the engine.
- **Post-restructure envelope.** After approved restructure edits land, run scoped `vault-link-check` + a graph refresh.
- **No prose rewriting** for links. Insert around existing natural language only.
- **Link integrity on every full pass — delegated to `vault-link-check`** scoped to `wiki/`. Do not duplicate the resolution logic here.
- **Respect protections.** Read and obey any `ai-behavior` + AI Instructions callout on protected pages.
- **Do not invent parallel trees.** Stay in `raw/` and `wiki/` (plus `primers/` for the catalog). If this vault still has other layouts, leave them unless the user directed cleanup.
- **Logging split:** Raw ingest activity → only `raw/_log.md`. Wiki maintenance findings → the wiki pages (or an instance system log, if it keeps one). Tool-performance transcript → the instance eval log, if it keeps one. Restructure learning → the engine trace (`source: forge-signal-check`).
- **Update `wiki/_index.md`** for significant structural or catalog changes.
- Keep `primers/_index.md` as a pure human-readable catalog.
- Human direction takes precedence over any automation.

---

## Related
- `_brain-forge/skills/forge-synthesis-engine/SKILL.md` — the classification brain this skill consumes for the restructure pass (step 6).
- The vault constitution — vault operations (non-negotiables, provenance, lint/health).
- `_brain-forge/schema.md` (authoritative frontmatter + AI steering rules; capability matrix; Tool Structure Convention).
- `_brain-forge/skills/vault-link-check/SKILL.md` — the vault-purview link-integrity engine (step 4 delegates here, scoped to `wiki/`).
- `/vault-graph-refresh` (required prerequisite for serious passes; post-restructure refresh).
- `wiki/_index.md` (living catalog you help maintain).
- `_graphify-out/GRAPH_REPORT.md` and graph.json (main relationship signal during the pass).

**Current version:** Consumer #2 of `forge-synthesis-engine` (restructure / dedup, propose-only). Link integrity delegates to `vault-link-check`.
