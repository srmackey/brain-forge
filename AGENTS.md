# AGENTS.md — Brain Forge

Canonical constitution for developing the Brain Forge **product**. Claude loads it via the thin `CLAUDE.md` shim. Edit this file, never the shim.

**Product.** Brain Forge is a vault framework: capture, catalog, link, graph, synthesize. This folder is the source. An instance is a vault that installed a copy. Not a second brain. Not an operating system. Not Insitu, Envoy, or the nexus.

This file does not travel with install. Vault operations that travel live in `templates/vault.md`.

## Agent stance

You are developing the framework. Sit here to change how a vault works. Sit in an instance to use a vault. Do not put personal content in this tree. Do not copy instance overlay, learned preferences, or wiki pages into this repo.

This is an ordinary public-bound dev chair. `methodology/repo-public` applies from the first commit. Never `git add -A`. Stage paths by name.

## What ships

Framework source, tracked here:

| Path | Role |
|---|---|
| `skills/` | Skill cores (forge, vault) |
| `templates/` | journal, primer, raw, schema, vault ops |
| `scripts/` | Vault helper scripts |
| `.graphifyignore` | Starting ignore for a new vault graph |

Learned `preferences.md` files are instance overlay. They do not ship.

Imported third-party skills (defuddle, json-canvas, obsidian-*) are instance host copies. This product lists them as dependencies. It does not vendor them.

`_system/` is not product source. If this chair later subscribes to system-development, that pack owns `_system/` as gitignored operator context.

## Purviews (the framework)

The capability matrix in `templates/schema.md` is the canonical home. Precedence: matrix, then ritual, then explicit direction. Direction wins.

| Purview | Job |
|---|---|
| **forge** | Ingest, synthesis, the wiki |
| **vault** | Mechanics and substrate: graph rebuilds, link integrity. Name pending. |
| **brain** | Interaction layer: retrieval, query, analysis. Write capability is named and not designed. An outside agent operates here and is denied forge and vault. |

## Skills that ship

- `forge-distill`, `forge-ingest`, `forge-primer`, `forge-signal-check`, `forge-synthesis-engine`
- `vault-graph-refresh`, `vault-link-check`

Install copies `skills/` and `templates/` into an instance as generic files. It does not write host skill directories, `AGENTS.md`, or `README.md`. Host exposure is the instance operator's job.

`forge-ingest` owns wiki vs hold. Hold when the user directed it, or the capture is not this vault's material. Otherwise wiki.

## File categories (the install invariant)

| Category | Where | Git in an instance |
|---|---|---|
| Product source | This repo | Tracked here |
| Installed framework | Instance `skills/*/SKILL.md`, `scripts/` | Untracked. Overwritten on update. |
| User-owned | Instance `raw/`, `wiki/`, `journal/`, `archive/`, `primers/`, adapted templates, learned preferences, chair overlay, instance-authored skills | Tracked there. Never overwritten. |

## Public repo

This checkout may be cloned and pushed. Treat the tree, commits, and the remote as public.

- Never blanket-add. Stage paths by name.
- Host overlay (`.claude/`, `.cursor/`, `.grok/`, `project.yaml`) stays untracked, not gitignored.
- Chair overlay (`_status/`, `inbox/`, `PROTOCOL.md`) is gitignored.
- `_system/` is operator context and is gitignored.
- Docs, comments, examples, and tests use fictional vocabulary. No real vault paths, no sibling project names, no personal content.
- Enable the hook: `git config core.hooksPath .githooks`

Attribution in LICENSE and commit authorship is the intended exception.

## Layout (this repo)

| Path | Role |
|---|---|
| `AGENTS.md` | This constitution (product-dev). Does not travel. |
| `README.md` | What the product is. Does not travel. |
| `skills/` | Framework cores |
| `templates/` | What install copies into a vault |
| `scripts/` | Helper scripts |
| `.githooks/` | Public-repo pre-commit gate |
| `_status/STATUS.md` | Local where / next (not shipped) |

## Status

`_status/STATUS.md` is the digest. Do not turn it into the life board.

## Human-sounding

All agent output must read like a competent human wrote it. No em-dashes or en-dashes as rhetorical separators. No stock model cadence.
