---
name: forge-card-primer
description: "Compile a prose primer from a card-list definition. Reads the cards that definition selects, including the body when the definition names it, and returns a block the owner can paste or save. Does not write the wiki and does not edit the cards. Use for /forge-card-primer, or when the owner wants a primer from a card list so a sitting can brainstorm the next one. Follows the vault constitution; human direction overrides."
argument-hint: "<path to a primer definition>"
---

> Product core (`_brain-forge/skills/forge-card-primer/SKILL.md`). Install copies the framework folder into an instance. Adopting a skill into a host is the vault owner's job.

# forge-card-primer Skill

One skill reads a primer definition and returns the prose. The definition is the instruction. This skill does not replace `forge-primer`. That skill still composes wiki context from its heading contract.

The query shape is `_brain-forge/schema.md`, Primer definitions. Apply that section. Do not restate it.

## When to run

- **Run** on `/forge-card-primer` with a path, or when the owner asks for a primer from a card list so a sitting can brainstorm the next one.
- **Do not run** to assemble vault context for a goal. That is `forge-primer`. Do not run to file a card. That is intake.

## Core flow

### Step 1 — The definition

Read the file the owner named.

- `shape: prose` is a primer definition. Use it.
- `shape: table` is a list. Look in the same folder for one prose definition whose `where` matches. One match: use it. None, or more than one: stop and name what you found.
- Anything else: stop.

### Step 2 — Select the cards

Read `cards/` once. Skip `cards/_removed.md` and everything under `cards/_images/`. Keep a card when `where` matches. `where.tags` means every named tag is present. `where.exclude_tags` drops a card that has any named tag. `where.type` matches the frontmatter `type`.

### Step 3 — Read the named fields

From each selected card, read only the fields the definition lists. `body` is the markdown after the frontmatter. Do not open a field the definition does not name.

If the writing instruction names another file, read that file too. Read only the section it names.

### Step 4 — Write the block

Follow the body of the definition. That body is the writing instruction. Return one block the owner can paste or save.

Do not invent a rating, a note, or a title. Do not write an ordered list unless the instruction says so. Use a title only as evidence for a kind.

Do not write the block into the definition. Do not write a file unless the owner says to save it, and then only at the path they name.

### Step 5 — Eval log

Append one entry to `_brain-forge/eval.md`. Shape and charter are in `_brain-forge/schema.md`, Eval log. Count the cards read and name the definition path. Do not copy titles, ratings, notes, or the block into the log.

## Non-negotiables

- The definition stays an instruction. The primer is the returned block.
- Do not edit cards. Do not write `wiki/`. Do not walk `raw/`.
- Human direction overrides everything here.

## Related

- `_brain-forge/schema.md` — Primer definitions.
- `_brain-forge/lists/working-primer.md` — the shipped example.
- `_brain-forge/skills/forge-primer/SKILL.md` — wiki context. Not this path.

**Provenance:** Added 2026-11-05 so a card list can be compiled into a primer without a second skill per list.
