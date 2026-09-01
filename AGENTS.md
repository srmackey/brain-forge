# AGENTS.md — Brain Forge

Guidance for agents and contributors working in this repository. Claude Code loads it via the thin `CLAUDE.md` shim. Edit this file, never the shim.

**Product.** Brain Forge is a vault framework: capture, catalog, link, graph, synthesize. This repository is the source. A vault that installed a copy is an instance. The value of a second brain is its contents, and contents do not ship.

This file does not travel with install. Vault operations that travel live in `templates/vault.md`.

## Agent stance

You are developing the framework. Change how a vault works here. Use a vault in an instance. Do not put personal notes, wiki pages, or journal entries in this tree.

## Model

`raw/` is an immutable capture layer. `wiki/` is an LLM-maintained synthesis layer. The **forge** purview turns arrivals into a corpus. The **vault** purview keeps graph and links honest. **brain** is the interaction layer: retrieval, query, analysis. Write tools for brain (curated sets, saved searches, emitted results) are not built yet.

An agent working against someone else's vault operates in brain and does not run forge or vault tools.

The capability matrix in `templates/schema.md` is the canonical home for tool permissions. Precedence: matrix, then ritual, then explicit direction. Direction wins.

## What ships

| Path | Role |
|---|---|
| `skills/` | Skill cores (forge, vault) |
| `templates/` | journal, primer, raw, schema, vault ops, distill format |
| `scripts/` | Vault helper scripts |
| `.graphifyignore` | Starting ignore for a new vault graph |

Install copies `skills/` and `templates/` into a vault as ordinary files. It does not write host skill directories, `AGENTS.md`, or `README.md`. Exposing a skill to a coding agent is the vault owner's choice.

## Skills

**Forge:** `forge-distill`, `forge-ingest`, `forge-primer`, `forge-signal-check`, `forge-synthesis-engine`

**Vault:** `vault-graph-refresh`, `vault-link-check`

`forge-ingest` decides wiki vs hold. Hold when the user directed it, or the capture is not this vault's material. Otherwise wiki.

New skills follow the shape of the files in `skills/`. Vault operations they must obey live in `templates/vault.md`.

## File categories (the install invariant)

| Category | Where | Git in an instance |
|---|---|---|
| Product source | This repo | Tracked here |
| Installed framework | Instance `skills/*/SKILL.md`, `scripts/` | Untracked. Overwritten on update. |
| User-owned | Instance `raw/`, `wiki/`, `journal/`, `archive/`, `primers/`, adapted templates, the vault's own constitution and inbox, instance-authored skills | Tracked there. Never overwritten. |

## Public repo

This checkout may be cloned and pushed. Treat the tree, every commit, and any remote as public.

- Stage paths by name. Do not add the whole working tree at once.
- Do not commit personal vault contents, real people's names, or another project's files.
- Docs, comments, examples, and tests use fictional names and paths.
- Do not commit `.claude/`, `.cursor/`, or `.grok/`.
- Local working files (`_status/`, `inbox/`) are gitignored.

Attribution in LICENSE and commit authorship is the intended exception.

## Layout (this repo)

| Path | Role |
|---|---|
| `AGENTS.md` | This file. Product-development constitution. Does not travel. |
| `README.md` | What the product is. Does not travel. |
| `skills/` | Framework cores |
| `templates/` | What install copies into a vault |
| `scripts/` | Helper scripts |
