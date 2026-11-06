---
name: forge-card-primer
description: "Compile a prose primer from a brief. Reads the cards that brief selects, including the body when the brief names it, and any instruction it includes. Returns a block the owner can paste or save. Does not write the wiki and does not edit the cards. Use for /forge-card-primer, or when the owner wants a primer from a card list or a brief so a sitting can brainstorm the next one. Follows the vault constitution; human direction overrides."
argument-hint: "<path to a brief>"
---

> Product core (`_brain-forge/skills/forge-card-primer/SKILL.md`). Install copies the framework folder into an instance. Adopting a skill into a host is the vault owner's job.

# forge-card-primer Skill

One skill reads a brief and returns the primer. The brief is the instruction. This skill does not replace `forge-primer`. That skill still composes wiki context from its heading contract.

The query shape is `_brain-forge/schema.md`, Primer definitions. Apply that section. Do not restate it.

## When to run

- **Run** on `/forge-card-primer` with a path, or when the owner asks for a primer from a card list or a brief so a sitting can brainstorm the next one.
- **Do not run** to assemble vault context for a goal. That is `forge-primer`. Do not run to file a card. That is intake.

## Core flow

### Step 1 — The brief

Read the file the owner named.

- `type: brief` and a `where`: this is the brief. Use it.
- `type: brief` and no `where`: stop. This file is an instruction another brief includes.
- `type: list`: look in `briefs/` at the vault root and in `_brain-forge/briefs/` for one brief whose `where` equals this list's `where`. One match: use it. None, or more than one: stop and name what you found.
- Anything else: stop.

### Step 2 — Includes

Read `include` on this brief only. Apply the include rule in schema.

- A missing file, or a heading that is not in the file: stop and name it.
- Two headings with the same text: stop and name them.
- A wiki path must name a heading whose text starts with `Codex - `. Anything else under `wiki/`, a path under `primers/`, or a file whose `type` is `primer`: stop and name it.
- Do not follow an `include` key on an included file.
- An include adds instruction text. It does not add that file's cards.

### Step 3 — Select the cards

Read `cards/` once. Skip `cards/_removed.md` and everything under `cards/_images/`. Keep a card when this brief's `where` matches. `where.tags` means every named tag is present. `where.exclude_tags` drops a card that has any named tag. `where.type` matches the frontmatter `type`.

### Step 4 — Read the named fields

From each selected card, read only the fields this brief lists. `body` is the markdown after the frontmatter. Do not open a field the brief does not name.

### Step 5 — Write the block

Follow the included instructions in list order, then the body of this brief. Return one block the owner can paste or save.

Do not import a wiki page except a Codex heading this brief names. Do not import a saved primer. Do not write the block back into that heading. Do not invent a rating, a note, or a title. Do not write an ordered list unless the instruction says so. Use a title only as evidence for a kind.

Do not write the block into the brief. Do not write a file unless the owner says to save it, and then only at the path they name.

### Step 6 — Eval log

Append one entry to `_brain-forge/eval.md`. Shape and charter are in `_brain-forge/schema.md`, Eval log. Count the cards read. Name the brief path and any include paths. Do not copy titles, ratings, notes, or the block into the log.

## Non-negotiables

- The brief stays an instruction. The primer is the returned block.
- Do not edit cards. Do not write `wiki/`. Do not walk `raw/`.
- Human direction overrides everything here.

## Related

- `_brain-forge/schema.md` — Primer definitions.
- `_brain-forge/briefs/working.md` — the shipped brief.
- `_brain-forge/skills/forge-primer/SKILL.md` — wiki context. Not this path.

**Provenance:** Added 2026-11-05 so a card list can be compiled into a primer without a second skill per list. A brief is `type: brief`. `include` is a list of brief paths or a wiki `Codex - ` heading.
