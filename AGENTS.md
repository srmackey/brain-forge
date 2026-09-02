# AGENTS.md — Brain Forge

Guidance for agents and contributors working in this repository. Claude Code loads it via the thin `CLAUDE.md` shim. Edit this file, never the shim.

**Product.** Brain Forge is a vault framework: capture, catalog, link, graph, synthesize. This repository is the source. A vault that installed a copy is an instance. The value of a second brain is its contents, and contents do not ship.

This file does not travel with install. The constitution that travels is `_brain-forge/constitution.md`.

## Agent stance

You are developing the framework. Change how a vault works here. Use a vault in an instance. Do not put personal notes, wiki pages, or journal entries in this tree.

## Model

`raw/` is an immutable capture layer. `wiki/` is an LLM-maintained synthesis layer. The **forge** purview turns arrivals into a corpus. The **vault** purview keeps graph and links honest and owns framework install and update. **brain** is the interaction layer: retrieval, query, analysis. Write tools for brain are not built yet.

An agent working against someone else's vault operates in brain and does not run forge or vault tools.

The capability matrix in `_brain-forge/schema.md` is the canonical home for tool permissions. Precedence: matrix, then ritual, then explicit direction. Direction wins.

## What ships

Everything under `_brain-forge/`, and nothing else. That is the whole answer, and it is a location rather than a list so it cannot drift out of sync with the tree.

Install copies that folder to a vault root. Update rewrites the files the product ships and deletes nothing, so owner state such as the learned synthesis model can live inside it. Two files are seeded outside it on a first install only, because they do not work anywhere else: `.graphifyignore` at the vault root, where Graphify reads it, and `primers/distill.md`, where the owner will look for it. After seeding, both belong to the owner.

Install does not write host skill directories, a constitution, or `README.md`. Adopting the framework into a host is the vault owner's step. `vault-update` owns the full contract.

## Skills

**Forge:** `forge-distill`, `forge-ingest`, `forge-primer`, `forge-signal-check`, `forge-synthesis-engine`

**Vault:** `vault-graph-refresh`, `vault-link-check`, `vault-update`

`forge-ingest` decides wiki vs hold. Hold when the user directed it, or the capture is not this vault's material. Otherwise wiki.

New skills follow the shape of the files in `_brain-forge/skills/`. Vault operations they must obey live in `_brain-forge/constitution.md`, and they cite it by concept rather than by path, since an instance adopts it under whatever name its host loads.

## File categories (the install invariant)

| Category | Where | Git in an instance |
|---|---|---|
| Product source | This repo | Tracked here |
| Installed framework | The shipped files under instance `_brain-forge/` | Untracked. Rewritten on update. |
| Framework-adjacent owner state | Instance `_brain-forge/skills/forge-synthesis-engine/preferences.md` and `tweaks-log.md` | The owner. Not shipped, so never written. |
| Seeded | Instance `.graphifyignore`, `primers/distill.md` | The owner's after first install. Never overwritten. |
| Adopted | The owner's constitution, host skill copies, plugin template paths | The owner's. Never written by install or update. |
| User-owned | Instance `raw/`, `wiki/`, `journal/`, `archive/`, `primers/`, the vault's inbox, instance-authored skills | Tracked there. Never overwritten. |

## Public repo

This checkout may be cloned and pushed. Treat the tree, every commit, and any remote as public.

- Stage paths by name. Do not add the whole working tree at once.
- Do not commit personal vault contents, real people's names, or another project's files.
- Docs, comments, examples, and tests use fictional names and paths.
- Do not commit `.claude/`, `.cursor/`, or `.grok/`.
- Local working files (`_status/`, `inbox/`) are gitignored.
- Enable the hygiene hook in a fresh clone: `git config core.hooksPath .githooks`. It also wants a `.git/hygiene-denylist`, one term per line, which is deliberately untracked.

Attribution in LICENSE and commit authorship is the intended exception.

## Layout (this repo)

| Path | Role |
|---|---|
| `_brain-forge/` | The framework. Everything that ships. |
| `AGENTS.md` | This file. Product-development constitution. Does not travel. |
| `README.md` | What the product is. Does not travel. |
| `LICENSE` | Does not travel. |
| `.githooks/` | Public-repo hygiene gate. Does not travel. |
