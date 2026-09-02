---
name: vault-update
description: "Vault-purview skill that installs or updates the Brain Forge framework in this vault. Copies the framework files, seeds the ones that have to live outside the framework folder, creates the vault's own starting layout on a first install, and reports which of the owner's adopted copies are now behind the framework source. Owns the framework layout and the update contract. Invoke for /vault-update, 'install Brain Forge', 'update the framework', or after pulling a new version of the product."
argument-hint: "[optional: path to the Brain Forge product checkout]"
---

> Product core (`_brain-forge/skills/vault-update/SKILL.md`). Install copies the framework folder into an instance. Adopting a skill into a host is the vault owner's job.

# vault-update Skill

The **vault purview's** framework install and update hands. Install is update from nothing, so this is one skill.

This skill is the canonical home for the framework layout and the update contract. Other tools do not restate them.

## The one rule

An update writes the files the framework ships, and nothing else. **The manifest is the product's own file list**: whatever exists under `_brain-forge/` in the product checkout is what gets written. There is no separate manifest file to drift out of sync.

That has two consequences worth stating outright.

- **Nothing is deleted.** An update never clears the folder first. A file in the vault that the product does not ship is left where it is, whether it is owner state or a leftover from an older version.
- **Owner state may live inside the framework folder.** `preferences.md` and `tweaks-log.md` sit beside the engine core because that is where the engine looks for them, and they survive because they are not on the manifest.

Everything outside `_brain-forge/` is the owner's without qualification. Install may place the first copy of a few files that have to live outside it to be found or read, and after that placement they are the owner's too.

## Layout

| Path | What | Update |
|---|---|---|
| `_brain-forge/constitution.md` | Vault constitution | Written |
| `_brain-forge/schema.md` | Frontmatter, capability matrix, conventions | Written |
| `_brain-forge/skills/` | Skill cores (nine) | Written |
| `_brain-forge/primers.md` | The primer layer manual | Written |
| `_brain-forge/primers/` | Shipped primers: distill format, vault-design primer, personal skeleton | Written |
| `_brain-forge/templates/` | Obsidian stationery | Written |
| `_brain-forge/obsidian/` | Obsidian plugin macros | Written |
| `_brain-forge/tools/` | Scripts an agent runs | Written |
| `_brain-forge/.graphifyignore` | Seed source for the vault-root ignore | Written |
| `_brain-forge/CHANGELOG.md` | Version record | Written |
| `_brain-forge/skills/forge-synthesis-engine/preferences.md` | Learned synthesis model | Never. Not on the manifest. |
| `_brain-forge/skills/forge-synthesis-engine/tweaks-log.md` | Its trace | Never. Not on the manifest. |
| `_brain-forge/eval.md` | Tool-performance log | Never. Not on the manifest. |
| `_brain-forge/system-log.md` | Shape-change record, yours | Never. Not on the manifest. |
| `primers/_system.md`, `primers/_me.md` | Seeded copies, beside the owner's own primers | Never |
| `primers/distill.md` | Seeded copy, beside the owner's primers | Never |
| `.graphifyignore` (vault root) | Seeded copy, where Graphify reads it | Never |
| `raw/` `wiki/` `primers/` `journal/` `archive/` | Vault contents | Never |
| Adopted constitution, host skill copies | Wherever the owner put them | Never |

Install leaves exactly one framework-owned thing visible at the vault root, `_brain-forge/`. The rest of what appears there is the vault's own: `raw/`, `wiki/`, and `primers/`, made on a first install and never touched again. The seeded ignore is a dotfile and the seeded primers go inside `primers/`. Excluding the framework folder from Obsidian search and graph is one entry in that vault's settings.

## Adoption (what the owner does, not what install does)

Four kinds of framework file are meant to be used from somewhere else. Install never places them, because the destination is the owner's choice and their edits there must survive.

- **The constitution.** Copy `_brain-forge/constitution.md` to wherever the host loads a constitution (`AGENTS.md`, `CLAUDE.md`, or a shim that imports it). Adapt it.
- **Skills.** Copy or map `_brain-forge/skills/<name>/SKILL.md` into the host's discovery path (`.claude/skills/`, `.grok/skills/`, `.cursor/skills/`).
- **Templates and Obsidian macros.** Point the relevant plugin at `_brain-forge/templates/` or `_brain-forge/obsidian/`, or copy those files somewhere of your choosing.
- **Tools.** Run them from `_brain-forge/tools/`, or put them on a path.

`schema.md` is deliberately not on this list. The skills read it at its framework path, so a forked copy would not be consulted. Per-vault deviation belongs in the constitution.

## Install (no `_brain-forge/` present)

1. **Copy** the product's `_brain-forge/` to this vault's root.
2. **Create the starting layout**, only for what is absent. These are the owner's from birth and are never touched again. This comes before seeding, because the seeded primers land in a directory this step makes.
   - Directories `raw/`, `wiki/`, `primers/`.
   - `raw/_log.md`, the raw-processing memory. `forge-ingest` treats reading it as a hard precondition, so an absent file makes ingest fail on its first step. Give it a heading and nothing else.
   - `wiki/_index.md`, the living catalog.
   - `primers/_index.md`, the slim human-readable primer catalog.
   - `_brain-forge/eval.md` and `_brain-forge/system-log.md`, the two owner records. A heading line and nothing else. Both sit inside the framework folder and neither is on the manifest, so update never touches them again.

   A heading and nothing else means exactly that. The wording is yours, the file is the owner's from here, and no run of this skill will look at it again.
3. **Seed the outside files**, only where absent. Never overwrite any of them.
   - `_brain-forge/.graphifyignore` to `.graphifyignore` at the vault root. Graphify reads it from the root it scans and cannot be pointed inside the framework folder.
   - `_brain-forge/primers/distill.md` to `primers/distill.md`, so the owner finds it beside their own primers.
   - `_brain-forge/primers/_system.md` to `primers/_system.md`, the shipped surface primer for working on the vault's own design.
   - `_brain-forge/primers/_me.md` to `primers/_me.md`. It arrives empty with instructions in it. Say plainly that filling it in is the first thing to do: it is the seed of the primer layer, and most composition examples pull sections from it.
4. **Report** the adoption steps above. Nothing works until the owner does them: no skill is exposed to a host and no constitution is loaded.

## Update (`_brain-forge/` already present)

1. **Read the installed version first.** The top entry of `_brain-forge/CHANGELOG.md` is what this vault currently has. Record it before touching anything. There is no separate stamp file; the changelog in the vault's own framework folder is the version.
2. **Write every file the product ships**, at the same relative path. Do not clear the folder. Do not merge, do not ask per file.
3. **Write nothing else.** Not the seeded files, not the vault contents, not any adopted copy, and not anything inside the framework folder that the product does not ship.
4. **Report what changed**: every changelog entry newer than the version recorded in step 1.
5. **Report orphans.** Anything under `_brain-forge/` that the product no longer ships, minus the known owner state (`preferences.md`, `tweaks-log.md`, `eval.md`). Cross-check the changelog, which names removals. Report them and leave them in place. Deleting is the owner's call, and a file you do not recognize is more likely theirs than stale.
6. **Report which adopted copies are behind.** This is the point of the skill. An update refreshes the source and leaves every derived copy silently stale. For each framework file that changed, name where the owner's copy of it probably lives:

   | Changed | Tell the owner |
   |---|---|
   | `constitution.md` | Their adopted constitution needs the diff applied |
   | `skills/<name>/SKILL.md` | Their host copy is stale. Point them at `vault-surfaces`, which repairs it. |
   | `primers/distill.md` | Their `primers/distill.md` is behind, show the diff |
   | `primers/_system.md` | Their seeded copy is behind, show the diff |
   | `primers/_me.md` | Never report. It shipped empty and whatever is there now is theirs. |
   | `templates/*`, `obsidian/*` | Stale only if they copied rather than pointed a plugin at the folder |
   | `tools/*` | Stale only if they copied it onto a path |
   | `.graphifyignore` | Their root copy is theirs; name any new framework line worth adding |

   Do not apply any of these. Report and let the owner decide.

## Non-negotiables

- **Manifest only.** An update writes the files the product ships and nothing else, inside the framework folder or out of it. If a fix seems to need writing beyond that, it is a design problem in the product, not a case for an exception here.
- **Never delete.** Not on update, not to tidy orphans, not to reconcile. Report and leave.
- **Seed once, never re-seed.** The two outside files are placed only when absent. A present file is the owner's, whatever it now contains.
- **Never create vault content.** Step 2 of install makes empty scaffolding. It does not write captures, wiki pages, or primers.
- **Never apply a reconcile.** Adopted copies are reported, never edited. The owner may have changed them deliberately.
- **Report honestly.** If a copy step failed or a path was unwritable, say so. A partial install that reports success is worse than a failed one.
- **Human direction overrides.** An owner who wants a different destination gets it.

## Output

```
── /vault-update run: YYYY-MM-DD ── install | update

Framework: 0.1.0 -> 0.2.0

Changed in this update:
  constitution.md: file categories rewritten
  skills/forge-ingest/SKILL.md: capture-quality screen reworded

Your copies to reconcile:
  Adopted constitution: file-categories section changed, diff below
  Host copy of forge-ingest: stale, re-copy from _brain-forge/skills/

Orphans (no longer shipped, left in place):
  skills/brain-routing-engine/SKILL.md: removed in 0.2.0, yours to delete

Seeded (first install only): none
Untouched: raw/, wiki/, primers/, preferences.md, tweaks-log.md, eval.md
```

If nothing changed, say so in one line.

## Related
- `_brain-forge/constitution.md` — vault operations, and the file-categories table this skill enforces.
- `_brain-forge/schema.md` — the capability matrix and the Tool Structure Convention.
- `_brain-forge/CHANGELOG.md` — the version record this skill reads.
