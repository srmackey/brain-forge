# Vault constitution (Brain Forge)

The constitution for a vault that installed Brain Forge.

**Adopt this file.** Copy it to wherever your coding agent loads a constitution from (`AGENTS.md`, `CLAUDE.md`, a shim that imports it), or adapt it to your platform. Your adopted copy is yours and nothing overwrites it.

This file is framework-owned and updates in place at `_brain-forge/constitution.md`. When it moves ahead of what you adopted, `vault-update` says so and shows you the difference.

The vault is a store: capture, catalog, link, graph, synthesize. It is not an operating system and not the place you invent the next tool.

## Model

- `raw/` is a dumb drop zone. New material lands here with minimal overhead. It is immutable after capture.
- `wiki/` is the living synthesis layer. The forge purview maintains it.
- Human direction always overrides the capability matrix.

## Purviews

The matrix in `_brain-forge/schema.md` is the canonical home. Tools reference it. They never duplicate it.

| Purview | Job |
|---|---|
| **forge** | Ingest, synthesis, the wiki |
| **vault** | Graph rebuilds, link integrity, framework install and update, structural plumbing |
| **brain** | Retrieval, query, and analysis over the material. An outside agent operates here and is denied forge and vault. |

## Wiki or hold

`forge-ingest` makes this call. Default is wiki. Hold when the user directed hold, or the capture is not this vault's material. Hold means leave in `raw/` and surface to the human.

## File categories

| Category | What | Update |
|---|---|---|
| Framework | Everything under `_brain-forge/` | Overwritten wholly |
| Adopted | Your constitution, host skill copies, whatever path your template plugin reads, `primers/distill.md`, root `.graphifyignore` | Never touched. `vault-update` reports when the framework source moved ahead. |
| User-owned | `raw/`, `wiki/`, `journal/`, `archive/`, `primers/`, root `preferences.md` and `tweaks-log.md`, your inbox, instance-authored skills | Never touched |

Framework skills live at `_brain-forge/skills/<name>/SKILL.md`. Exposing one to a coding agent means copying or mapping it into that host's discovery path (`.claude/skills`, `.grok/skills`, and so on), and that is your job, not install's. Re-do it after an update, or run `vault-update`, which tells you which copies are behind.

Synthesis steering is optional and off unless you create `preferences.md`. `forge-synthesis-engine` carries the instruction.

## Non-negotiables

- Provenance on every wiki contribution: `Source: [[raw/…]]`.
- Preserve the user's voice. Integrate, quote, or summarize with attribution.
- Protected pages (`ai-behavior` plus the AI Instructions callout) are more restrictive than the folder default.
- Real dates only (`YYYY-MM-DD`). Never infer a date from a filename.
- Frictionless capture is the highest priority.
- Strong default: update an existing wiki page rather than create a new one.
