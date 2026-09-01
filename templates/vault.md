# Vault operations (Brain Forge)

Operations for a vault that installed Brain Forge. This is not a host constitution. Install copies this file. Adapt it. Do not treat it as `AGENTS.md`.

The vault is a store: capture, catalog, link, graph, synthesize. It is not an operating system and not the place you invent the next tool.

Framework cores live in the product. Install copies them into this vault as generic files under `skills/`. Host exposure (copying or mapping those files into `.claude/skills`, `.grok/skills`, or any other discovery path) is yours.

## Model

- `raw/` is a dumb drop zone. New material lands here with minimal overhead. It is immutable after capture.
- `wiki/` is the living synthesis layer. The forge purview maintains it.
- Human direction always overrides the capability matrix.

## Purviews

The matrix in `templates/schema.md` is the canonical home. Tools reference it. They never duplicate it.

| Purview | Job |
|---|---|
| **forge** | Ingest, synthesis, the wiki |
| **vault** | Graph rebuilds, link integrity, structural plumbing |
| **brain** | Retrieval, query, and analysis over the material. An outside agent operates here and is denied forge and vault. |

## Wiki or hold

`forge-ingest` makes this call. Default is wiki. Hold when the user directed hold, or the capture is not this vault's material. Hold means leave in `raw/` and surface to the human.

## File categories

| Category | What | Update may touch |
|---|---|---|
| Installed framework | `skills/*/SKILL.md`, `scripts/` | Yes, overwrite |
| User-owned | `raw/`, `wiki/`, `journal/`, `archive/`, `primers/`, adapted templates, learned `preferences.md`, the vault's own constitution and inbox, instance-authored skills | Never |
| Product source | Not in this vault. Lives in the Brain Forge product repo. | n/a |

A skill may keep a `preferences.md` next to its `SKILL.md` for learned corrections (for example the synthesis engine's classification model). That file is user-owned and is not overwritten on update.

## Non-negotiables

- Provenance on every wiki contribution: `Source: [[raw/…]]`.
- Preserve the user's voice. Integrate, quote, or summarize with attribution.
- Protected pages (`ai-behavior` plus the AI Instructions callout) are more restrictive than the folder default.
- Real dates only (`YYYY-MM-DD`). Never infer a date from a filename.
- Frictionless capture is the highest priority.
- Strong default: update an existing wiki page rather than create a new one.

## Human-sounding

All agent output must read like a competent human wrote it. No em-dashes or en-dashes as rhetorical separators. No stock model cadence.
