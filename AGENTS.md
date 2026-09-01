# AGENTS.md — Brain Forge

Canonical constitution for the Brain Forge **product**. Claude loads it via the thin `CLAUDE.md` shim. Edit this file, never the shim.

**Product.** Brain Forge is a vault framework: capture, catalog, link, graph, synthesize. This folder is the source. An instance is a vault that installed a copy. Not a second brain. Not an operating system. Not Insitu, Envoy, or the nexus.

**Design lock.** The Phase 5 spec and the accepted manifest are the current shape. Skill cores under `_system/skills/` are the framework. Generated host copies are stamped and overwritten. Do not hand-edit copies.

## Agent stance

You are developing the framework. Sit here to change how a vault works. Sit in an instance to use a vault. Do not put personal content in this tree. Do not copy instance overlay, learned preferences, or wiki pages into this repo.

This is an ordinary public-bound dev chair. `methodology/repo-public` applies from the first commit. Never `git add -A`. Stage paths by name.

## What ships

Framework source, tracked here:

| Path | Role |
|---|---|
| `_system/skills/` | Canonical skill cores (forge, vault, routing engine) |
| `_templates/` | journal, primer, raw, schema, instance constitution |
| `_scripts/` | Vault helper scripts |
| `.graphifyignore` | Starting ignore for a new vault graph |

Learned `preferences.md` files are instance overlay. They do not ship.

Imported third-party skills (defuddle, json-canvas, obsidian-*) are instance host copies. This product lists them as dependencies, it does not vendor them.

## Purviews (the framework)

The capability matrix in `_templates/schema.md` is the canonical home. Precedence: matrix, then ritual, then explicit direction. Direction wins.

| Purview | Job |
|---|---|
| **forge** | Ingest, synthesis, the wiki |
| **vault** | Mechanics and substrate: graph rebuilds, link integrity. Name pending. |
| **brain** | Interaction layer: retrieval, query, analysis. Write capability is named and not designed. An outside agent operates here and is denied forge and vault. |

The `brain-routing-engine` name is historical. It is capture triage (`wiki` / `hold`), not the interaction layer.

## Skills that ship

- `forge-distill`, `forge-ingest`, `forge-primer`, `forge-signal-check`, `forge-synthesis-engine`
- `vault-graph-refresh`, `vault-link-check`
- `brain-routing-engine` (cut to `wiki` + `hold`)

Host discovery is filesystem-based. Install copies these cores into an instance's host skill paths. Update overwrites those copies and does not touch user-owned files.

## File categories (the install invariant)

| Category | Where | Git in an instance |
|---|---|---|
| Product source | This repo | Tracked here |
| Generated copies | Instance host paths and stamped templates | Untracked, overwritten on update |
| User-owned | Instance `raw/`, `wiki/`, `journal/`, `archive/`, learned preferences, chair overlay | Tracked there, never overwritten |

## Public repo

This checkout may be cloned and pushed. Treat the tree, commits, and the remote as public.

- Never blanket-add. Stage paths by name.
- Host overlay (`.claude/`, `.cursor/`, `.grok/`, `project.yaml`) stays untracked, not gitignored.
- Chair overlay (`_status/`, `inbox/`, `PROTOCOL.md`) is gitignored.
- `_system/skills/` is the product and is tracked. Other `_system/` paths are operator context and are gitignored.
- Docs, comments, examples, and tests use fictional vocabulary. No real vault paths, no sibling project names, no personal content.
- Enable the hook: `git config core.hooksPath .githooks`

Attribution in LICENSE and commit authorship is the intended exception.

## Layout (this repo)

| Path | Role |
|---|---|
| `AGENTS.md` | This constitution |
| `README.md` | What the product is |
| `_system/skills/` | Framework cores |
| `_templates/` | What install copies into a vault |
| `_scripts/` | Helper scripts |
| `.githooks/` | Public-repo pre-commit gate |
| `_status/STATUS.md` | Local where / next (not shipped) |

## Status

`_status/STATUS.md` is the digest. Do not turn it into the life board.

## Human-sounding

All agent output must read like a competent human wrote it. No em-dashes or en-dashes as rhetorical separators. No stock model cadence.
