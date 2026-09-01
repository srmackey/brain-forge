# AGENTS.md — vault constitution (Brain Forge instance)

Canonical constitution for a vault that installed Brain Forge. Claude loads it via the thin `CLAUDE.md` shim. Edit this file, never the shim.

This vault is a store: capture, catalog, link, graph, synthesize. It is not an operating system and not the place you invent the next tool.

Generated framework copies are stamped. Do not hand-edit them. Change the product, then update.

## Model

- `raw/` is a dumb drop zone. New material lands here with minimal overhead. It is immutable after capture.
- `wiki/` is the living synthesis layer. The forge purview maintains it.
- Human direction always overrides the capability matrix.

## Purviews

The matrix in `_system/schema.md` is the canonical home. Tools reference it. They never duplicate it.

| Purview | Job |
|---|---|
| **forge** | Ingest, synthesis, the wiki |
| **vault** | Graph rebuilds, link integrity, structural plumbing |
| **brain** | Retrieval, query, and analysis over the material. An outside agent operates here and is denied forge and vault. |

Capture triage (`brain-routing-engine`) routes to `wiki` or `hold`. `hold` means leave in `raw/` and surface to the human.

## File categories

| Category | What | Update may touch |
|---|---|---|
| Generated copies | Stamped skill copies, stamped templates | Yes, overwrite |
| User-owned | `raw/`, `wiki/`, `journal/`, `archive/`, learned preferences, chair overlay | Never |
| Product source | Not in this vault. Lives in the Brain Forge product repo. | n/a |

## Non-negotiables

- Provenance on every wiki contribution: `Source: [[raw/…]]`.
- Preserve the user's voice. Integrate, quote, or summarize with attribution.
- Protected pages (`ai-behavior` plus the AI Instructions callout) are more restrictive than the folder default.
- Real dates only (`YYYY-MM-DD`). Never infer a date from a filename.
- Frictionless capture is the highest priority.

## Human-sounding

All agent output must read like a competent human wrote it. No em-dashes or en-dashes as rhetorical separators. No stock model cadence.
