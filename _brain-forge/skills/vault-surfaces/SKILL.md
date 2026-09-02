---
name: vault-surfaces
description: "Vault-purview skill that keeps derived surfaces aligned with their sources. Checks and regenerates host skill copies from the framework cores using header stamps, flags the vault constitution and the system primer when one has moved ahead of the other, and reports rule text duplicated out of the schema. Run after a framework update, after editing a skill core or the constitution, or whenever an agent seems to be following an old rule. Invoke for /vault-surfaces, 'check the surfaces', 'regenerate my skills', or 'are my host copies stale'."
argument-hint: "[optional: check (default) | regenerate | a single surface name]"
---

> Product core (`_brain-forge/skills/vault-surfaces/SKILL.md`). Install copies this file into an instance. Host exposure is the vault owner's job.

# vault-surfaces Skill

The **vault purview's** derived-surface hands. Structural plumbing, same purview as graph rebuilds and link integrity.

A vault runs the framework through copies. Skill cores get copied into host discovery paths, the constitution gets adopted into whatever file the host loads, and the system primer restates the operating model for a web session. Every one of those is a derived surface, and every one of them goes stale silently when its source moves. Nothing else in the framework notices.

`vault-update` reports that copies are behind. This skill is what fixes them.

## The stamp

A generated copy carries a header stamp naming what it came from and when:

```
generated from _brain-forge/skills/forge-ingest/SKILL.md on 2026-09-02 - edit the source, not this file.
```

Place it as the first line after the frontmatter. Use a plain hyphen, not a dash character, since some hosts are strict about the file's opening bytes.

The stamp makes staleness mechanically decidable rather than a judgment call. Two checks, in order:

1. **Stamp present?** No stamp means the file was hand-authored or hand-edited. Never overwrite it. Report and stop.
2. **Byte-identical to a fresh generation, ignoring the stamp line?** If yes it is current. If no it is stale.

A file that fails check 1 is the owner's, whatever it looks like. That rule is what makes it safe to regenerate anything that passes.

## Modes

**check** (default) reports and writes nothing.

**regenerate** applies the fixes that are mechanical and unambiguous: stamped copies whose source moved. It never touches an unstamped file, never resolves a parity flag, and never edits the constitution or a primer.

## 1. Host skill copies

The framework cores are at `_brain-forge/skills/<name>/SKILL.md`. A host finds skills by scanning a directory, so using one means copying the core into that directory.

| Host | Discovery path |
|---|---|
| Claude Code | `.claude/skills/<name>/SKILL.md` |
| Cursor | `.cursor/skills/<name>/SKILL.md`, or the `.claude/skills` compat path |
| Grok | `.grok/skills/<name>/SKILL.md` |

Other hosts scan other paths. Read the host's own documentation rather than guessing, and do not invent a tree a host does not document.

For each core, for each host directory that exists in this vault:

- **Copy missing.** The owner chose not to expose that skill. Report it once as available, not as an error, and do not create it.
- **Copy present and stamped and current.** Say nothing.
- **Copy present and stamped and stale.** This is the case regenerate fixes. Copy the core, add the stamp, keep the filename.
- **Copy present and unstamped.** Report. Never overwrite. It may be the owner's own variant of a framework skill, which is a legitimate thing to have.
- **Copy present with no matching core.** Either an instance-authored skill, which is fine and not yours, or an orphan from a framework version that dropped it. Report, never delete.

Only act on host directories that already exist. Creating `.grok/skills/` in a vault that has never used Grok is not your call.

## 2. Constitution and system primer parity

`_brain-forge/constitution.md` is the framework's copy. The owner adopted it into whatever file their host loads, and adapted it. `primers/_system.md` restates the same operating model for a web session. Those two describe one thing in two places, which is the coupling this framework ships and cannot enforce.

This half is **semantic and cannot be made mechanical**. Do not pretend otherwise, and do not diff them into a report nobody can act on. Use a modification-time heuristic and hand the judgment to the owner:

- If the adopted constitution has changed more recently than `primers/_system.md`, flag it: a doctrine change may not have reached the primer.
- If `_brain-forge/constitution.md` changed in the last update and the adopted copy did not, flag that too. That is the same finding `vault-update` reports, and repeating it here is correct because this is where the owner comes to fix it.
- Name what changed if you can see it. "The purview table gained a row" is actionable. "These files differ" is not.

Never edit either file to resolve a flag. The adopted constitution is the owner's, and the primer is a document they hand to other people's models.

## 3. Canonical-home drift

`_brain-forge/schema.md` is the canonical home for the frontmatter model, the capability matrix, the producer boundary, the tool structure convention, and the eval log. Every other surface is supposed to carry a short principle plus a pointer, never a second copy of the rule.

Scan the vault's own surfaces (the adopted constitution, instance-authored skills, `primers/_system.md`) for text that restates a schema rule rather than pointing at it. Report the location and which canonical section it duplicates.

Do not scan the framework's own files for this. They are the product's problem, not this vault's.

Duplication is not always wrong. A one-line restatement beside a pointer is the convention working. Flag a second full copy of a rule, not a summary of it.

## Output

```
── /vault-surfaces run: YYYY-MM-DD ── check | regenerate

Host copies:
  .claude/skills/ — 5 of 8 exposed, 1 stale
    forge-ingest — stale, source moved 2026-09-02 [regenerated]
    vault-link-check — unstamped, left alone (yours?)
  .grok/skills/ — 2 of 8 exposed, all current

Available but not exposed: forge-primer, forge-distill, vault-surfaces

Parity:
  Adopted constitution changed 2026-09-01, primers/_system.md last touched
  2026-08-14. The purview table gained a row. Review the primer.

Canonical-home drift:
  Your constitution restates the full capability matrix from schema.md.
  Pointer would do.

Nothing else moved.
```

If everything is current, say so in one line.

## Non-negotiables

- **Never overwrite an unstamped file.** No exceptions, including when it looks exactly like a stale copy. The stamp is the only evidence that a file is derived.
- **Never delete.** Orphaned copies are reported and left. The owner decides.
- **Never create a host directory** that does not already exist, and never expose a skill the owner has not exposed.
- **Never resolve a parity or drift flag by editing.** Those need judgment and both files belong to the owner.
- **Regenerate is opt-in.** Check is the default and writes nothing.
- **Report honestly.** A host you do not know how to generate for is a thing to say, not a thing to guess at.
- Append an entry to `_brain-forge/eval.md` after the run. Unconditional; format and charter in `_brain-forge/schema.md`.

## Related
- `_brain-forge/skills/vault-update/SKILL.md` — installs and updates the framework, and reports the staleness this skill repairs.
- `_brain-forge/schema.md` — the canonical home whose drift section 3 checks.
- `_brain-forge/constitution.md` — one half of the parity coupling.
- `_brain-forge/primers/_system.md` — the other half.
