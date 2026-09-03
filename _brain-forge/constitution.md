# Vault constitution (Brain Forge)

framework: 0.2.0

The constitution for a vault that installed Brain Forge.

**Adopt this file.** Copy it to wherever your coding agent loads a constitution from (`AGENTS.md`, `CLAUDE.md`, a shim that imports it), or adapt it to your platform. Your adopted copy is yours and nothing overwrites it.

Keep the `framework:` line when you copy, and leave it alone afterwards. It says which version of this document your copy reflects, which is how `brainforge-surfaces` can tell that your copy is behind without guessing from a timestamp. Adapt everything else freely.

This file is framework-owned and updates in place at `_brain-forge/constitution.md`. When it moves ahead of what you adopted, `brainforge-update` says so and shows you the difference.

The vault is a store: capture, catalog, link, graph, synthesize. It is not an operating system and not the place you invent the next tool.

## Model

- `raw/` is a dumb drop zone. New material lands here with minimal overhead. It is immutable after capture.
- `wiki/` is the living synthesis layer. The forge purview maintains it.
- **The graph maps the corpus, not what this vault knows.** It spans `raw/` and `wiki/` together, which is the point: connections between unprocessed material and settled synthesis are what it is for. So it indexes captures nobody has judged, captures held back at ingest, and claims the wiki would have tagged as unvalidated, all with no marker separating them from anything else. A graph hit is a pointer into the corpus, never a claim this vault holds. Epistemic status lives in `wiki/`, where a contribution says whose idea it was and whether anyone ever agreed with it. An agent answering from the graph goes to the wiki page before treating anything as true.
- Human direction always overrides the capability matrix.

## Purviews

The matrix in `_brain-forge/schema.md` is the canonical home. Tools reference it. They never duplicate it.

| Purview | Job |
|---|---|
| **forge** | Ingest, synthesis, the wiki |
| **synapse** | The graph and link integrity: rebuilds, resolution, repair |
| **brain** | Retrieval, query, and analysis over the material. An outside agent operates here and is denied forge and synapse. |

**The three are siblings, not nested.** A synapse is anatomically inside a brain and this table is not, so an agent in **brain** is denied the **synapse** column like any other. Two dated notes for anyone reading an older vault: **brain** used to mean governance and was reassigned to the interaction layer on 2026-08-31, and the third purview was called **vault** until 2026-09-03.

**Framework install and update are not a purview.** `brainforge-update` and `brainforge-surfaces` write the framework rather than the corpus, so they sit outside the matrix entirely and take the product's name instead of a purview prefix.

## Wiki or hold

`forge-ingest` makes this call. Default is wiki. Hold when the user directed hold, or the capture is not this vault's material. Hold means leave in `raw/` and surface to the human.

## File categories

| Category | What | Update |
|---|---|---|
| Framework | The files the product ships under `_brain-forge/` | Overwritten |
| Adopted | Your constitution, host skill copies, whatever path your template plugin reads, the seeded primers in `primers/`, root `.graphifyignore` | Never touched. `brainforge-update` reports when the framework source moved ahead. |
| User-owned | `raw/`, `wiki/`, `journal/`, `archive/`, `primers/`, `preferences.md` and `tweaks-log.md` beside the engine core, your inbox, instance-authored skills | Never touched |

Update writes the files the product ships and never deletes anything, so your own state may sit inside the framework folder as long as it does not use a shipped filename. That is why the learned synthesis model lives beside the engine core.

**Do not edit a framework file.** Every file the product ships is overwritten on the next update, with no merge and no prompt. `schema.md` is the one most likely to tempt you, because it holds the frontmatter model and the capability matrix and it is deliberately not adopted, so a forked copy would never be consulted. Per-vault deviation belongs in this constitution, which is yours and which nothing overwrites. `brainforge-update` now names any framework file it had to restore, so an edit is reported rather than lost quietly, but the report arrives after the change is already gone.

Framework skills live at `_brain-forge/skills/<name>/SKILL.md`. Exposing one to a coding agent means putting a copy in that host's discovery path (`.claude/skills`, `.grok/skills`, and so on). Which skills you expose is your call, not install's; making the copies is `brainforge-surfaces expose`, which stamps them so it can keep them current for you afterwards. `brainforge-update` tells you which copies an update left behind.

Synthesis steering is optional and off unless you create `_brain-forge/skills/forge-synthesis-engine/preferences.md`. `forge-synthesis-engine` carries the instruction.

## Primers

The reusable context layer. `_brain-forge/primers.md` is the manual: the kinds of primer, the reserved headings, how composition works, and when to use `forge-primer` instead of transclusion. `primers/_me.md` is where a new vault starts.

## Records

Four files record different things about this vault. They are kept apart on purpose, because a log that holds two kinds of thing is useful for neither.

| File | Holds | Written by |
|---|---|---|
| `raw/_log.md` | What happened to each capture | `forge-ingest` |
| `_brain-forge/eval.md` | How the skills behaved: steps taken, gates fired, policy invented | Every skill, after its run |
| `_brain-forge/system-log.md` | What changed in the shape of your system, and why | You, and agents on your direction |
| A `wiki/` evolution page | Why your thinking about the system changed | Proposed by agents, never appended |

`system-log.md` is yours. When you add a skill, rewrite a row of the capability matrix, or change what a folder means, that is a shape change and it belongs there. Dated entries, newest first. Install seeds it empty and nothing writes it on your behalf without you asking.

The evolution page is the narrative counterpart: not what the shape is now, but why you stopped believing the old one. Give it `type: evolution` and `ai-behavior: historical-evolution` so agents propose additions rather than appending. Create it when you have something to put in it. Install will not, because install does not write vault content.

The synthesis engine keeps a fifth, `tweaks-log.md`, but only when steering is on, and it is that engine's own trace rather than a record of the vault.

## Non-negotiables

- Provenance on every wiki contribution: `Source: [[raw/…]]`.
- Preserve the user's voice. Integrate, quote, or summarize with attribution.
- Protected pages (`ai-behavior` plus the AI Instructions callout) are more restrictive than the folder default.
- Real dates only (`YYYY-MM-DD`). Never infer a date from a filename.
- Frictionless capture is the highest priority.
- Strong default: update an existing wiki page rather than create a new one.
