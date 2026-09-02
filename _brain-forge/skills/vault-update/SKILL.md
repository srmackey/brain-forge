---
name: vault-update
description: "Vault-purview skill that installs or updates the Brain Forge framework in this vault. Copies the framework folder, seeds the two files that have to live outside it, creates the vault's own starting layout on a first install, and reports which of the owner's adopted copies are now behind the framework source. Owns the framework layout and the update contract. Invoke for /vault-update, 'install Brain Forge', 'update the framework', or after pulling a new version of the product."
argument-hint: "[optional: path to the Brain Forge product checkout]"
---

> Product core (`_brain-forge/skills/vault-update/SKILL.md`). Install copies this file into an instance. Host exposure is the instance operator's job.

# vault-update Skill

The **vault purview's** framework install and update hands. Install is update from nothing, so this is one skill.

This skill is the canonical home for the framework layout and the update contract. Other tools do not restate them.

## The one rule

The framework owns `_brain-forge/` and overwrites it wholly. Everything outside that folder belongs to the vault owner and is never written by an update. Install may place the first copy of two files that have to live outside the folder to work at all, and after that placement they are the owner's too.

## Layout

| Path | What | Update |
|---|---|---|
| `_brain-forge/constitution.md` | Vault constitution | Overwritten |
| `_brain-forge/schema.md` | Frontmatter, capability matrix, conventions | Overwritten |
| `_brain-forge/skills/` | Skill cores | Overwritten |
| `_brain-forge/primers/distill.md` | Web distill format | Overwritten |
| `_brain-forge/templates/` | Obsidian stationery | Overwritten |
| `_brain-forge/scripts/` | Helper scripts | Overwritten |
| `_brain-forge/.graphifyignore` | Seed source for the vault-root ignore | Overwritten |
| `_brain-forge/CHANGELOG.md` | Version record | Overwritten |
| `primers/distill.md` | Seeded copy, beside the owner's primers | Never |
| `.graphifyignore` (vault root) | Seeded copy, where Graphify reads it | Never |
| `raw/` `wiki/` `primers/` `journal/` `archive/` | Vault contents | Never |
| `preferences.md`, `tweaks-log.md` | Learned synthesis model and its trace | Never |
| Adopted constitution, host skill copies | Wherever the owner put them | Never |

## Adoption (what the owner does, not what install does)

Four framework files are meant to be used from somewhere else. Install never places them, because the destination is the owner's choice and their edits there must survive.

- **The constitution.** Copy `_brain-forge/constitution.md` to wherever the host loads a constitution (`AGENTS.md`, `CLAUDE.md`, or a shim that imports it). Adapt it.
- **Skills.** Copy or map `_brain-forge/skills/<name>/SKILL.md` into the host's discovery path (`.claude/skills/`, `.grok/skills/`, `.cursor/skills/`).
- **Templates.** Point the Obsidian template or QuickAdd plugin at `_brain-forge/templates/`, or copy those files somewhere of your choosing.
- **Scripts.** Same as templates.

`schema.md` is deliberately not on this list. The skills read it at its framework path, so a forked copy would not be consulted. Per-vault deviation belongs in the constitution.

## Install (no `_brain-forge/` present)

1. **Copy** the product's `_brain-forge/` to this vault's root.
2. **Seed the two outside files**, only if absent. Never overwrite either.
   - `_brain-forge/.graphifyignore` to `.graphifyignore` at the vault root. Graphify reads it from the root it scans and cannot be pointed inside the framework folder.
   - `_brain-forge/primers/distill.md` to `primers/distill.md`, so the owner finds it beside their own primers.
3. **Create the starting layout**, only for what is absent. These are the owner's from birth and are never touched again.
   - Directories `raw/`, `wiki/`, `primers/`.
   - `raw/_log.md`, the raw-processing memory. `forge-ingest` treats reading it as a hard precondition, so an absent file makes ingest fail on its first step. Seed it with a heading and nothing else.
   - `wiki/_index.md`, the living catalog.
   - `primers/_index.md`, the slim human-readable primer catalog.
4. **Report** the adoption steps above. Nothing works until the owner does them: no skill is exposed to a host and no constitution is loaded.

## Update (`_brain-forge/` already present)

1. **Read the installed version first.** The top entry of `_brain-forge/CHANGELOG.md` is what this vault currently has. Record it before touching anything. There is no separate stamp file; the changelog in the vault's own framework folder is the version.
2. **Overwrite `_brain-forge/` wholly** from the product. Do not merge, do not preserve, do not ask per file. Nothing an owner cares about lives there.
3. **Write nothing else.** Not the seeded pair, not the vault contents, not any adopted copy.
4. **Report what changed**: every changelog entry newer than the version recorded in step 1.
5. **Report which adopted copies are behind.** This is the point of the skill. An update refreshes the source and leaves every derived copy silently stale. For each framework file that changed in this update, name where the owner's copy of it probably lives and say it needs reconciling:

   | Changed | Tell the owner |
   |---|---|
   | `constitution.md` | Their adopted constitution needs the diff applied |
   | `skills/<name>/SKILL.md` | Their host copy of that skill is stale, re-copy or re-map it |
   | `primers/distill.md` | Their `primers/distill.md` is behind, show the diff |
   | `templates/*` | Stale only if they copied rather than pointed a plugin at the folder |
   | `scripts/*` | Same |
   | `.graphifyignore` | Their root copy is theirs; name any new framework line worth adding |

   Do not apply any of these. Report and let the owner decide.

## Non-negotiables

- **One folder.** An update writes `_brain-forge/` and nothing else. If a fix seems to require writing outside it, that is a design problem in the product, not a case for an exception here.
- **Seed once, never re-seed.** The two outside files are placed only when absent. A present file is the owner's, whatever it now contains.
- **Never create vault content.** Step 3 of install makes empty scaffolding. It does not write captures, wiki pages, or primers.
- **Never apply a reconcile.** Adopted copies are reported, never edited. The owner may have changed them deliberately.
- **Report honestly.** If a copy step failed or a path was unwritable, say so. A partial install that reports success is worse than a failed one.
- **Human direction overrides.** An owner who wants a different destination gets it.

## Output

```
── /vault-update run: YYYY-MM-DD ── install | update

Framework: 0.1.0 → 0.2.0

Changed in this update:
  constitution.md — file categories rewritten
  skills/forge-ingest/SKILL.md — capture-quality screen reworded

Your copies to reconcile:
  Adopted constitution — file-categories section changed, diff below
  Host copy of forge-ingest — stale, re-copy from _brain-forge/skills/

Seeded (first install only): none
Untouched: raw/, wiki/, primers/, preferences.md
```

If nothing changed, say so in one line.

## Related
- `_brain-forge/constitution.md` — vault operations, and the file-categories table this skill enforces.
- `_brain-forge/schema.md` — the capability matrix and the Tool Structure Convention.
- `_brain-forge/CHANGELOG.md` — the version record this skill reads.
