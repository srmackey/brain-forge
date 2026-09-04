# AGENTS.md — Brain Forge

Guidance for agents and contributors working in this repository. Claude Code loads it via the thin `CLAUDE.md` shim. Edit this file, never the shim.

**Product.** Brain Forge is a vault framework: capture, catalog, link, graph, synthesize. This repository is the source. A vault that installed a copy is an instance. The value of a second brain is its contents, and contents do not ship.

This file does not travel with install. The constitution that travels is `_brain-forge/constitution.md`.

## Agent stance

You are developing the framework. Change how a vault works here. Use a vault in an instance. Do not put personal notes, wiki pages, or journal entries in this tree.

## Model

`raw/` is an immutable capture layer. `wiki/` is an LLM-maintained synthesis layer. The **forge** purview turns arrivals into a corpus. The **synapse** purview keeps the graph and links honest. **brain** is the interaction layer: retrieval, query, analysis. Write tools for brain are not built yet. The three are siblings, not nested.

Framework install and update are not a purview. `brainforge-update` and `brainforge-surfaces` write the framework rather than the corpus, so they sit outside the capability matrix and take the product's name.

An agent working against someone else's vault operates in brain and does not run forge or synapse tools.

The capability matrix in `_brain-forge/schema.md` is the canonical home for tool permissions. Precedence: matrix, then ritual, then explicit direction. Direction wins.

## What ships

Everything under `_brain-forge/`, and nothing else. That is the whole answer, and it is a location rather than a list so it cannot drift out of sync with the tree.

Install copies that folder to a vault root. Update rewrites the files the product ships and deletes nothing, so owner state such as the learned synthesis model can live inside it. A few files are seeded outside it on a first install only, because they do not work anywhere else: `.graphifyignore` at the vault root, where Graphify reads it, and the shipped primers beside the owner's own in `primers/`. After seeding, they belong to the owner.

Install does not write host skill directories, a constitution, or `README.md`. Adopting the framework into a host is the vault owner's step. `brainforge-update` owns the full contract.

## Skills

**Forge:** `forge-distill`, `forge-ingest`, `forge-primer`, `forge-signal-check`, `forge-synthesis-engine`

**Synapse:** `synapse-graph-refresh`, `synapse-link-check`

**Product:** `brainforge-surfaces`, `brainforge-update`

`forge-ingest` decides wiki vs hold. Hold when the user directed it, or the capture is not this vault's material. Otherwise wiki.

New skills follow the shape of the files in `_brain-forge/skills/`. Vault operations they must obey live in `_brain-forge/constitution.md`, and they cite it by concept rather than by path, since an instance adopts it under whatever name its host loads.

## File categories (the install invariant)

| Category | Where | Git in an instance |
|---|---|---|
| Product source | This repo | Tracked here |
| Installed framework | The shipped files under instance `_brain-forge/` | Untracked. Rewritten on update. |
| Framework-adjacent owner state | Instance `_brain-forge/skills/forge-synthesis-engine/preferences.md` and `tweaks-log.md` | The owner. Not shipped, so never written. |
| Seeded | Instance `.graphifyignore`, `primers/distill.md`, `primers/_system.md`, `primers/_me.md` | The owner's after first install. Never overwritten. |
| Adopted | The owner's constitution, host skill copies, plugin template paths | The owner's. Never written by install or update. |
| User-owned | Everything outside instance `_brain-forge/` that is not seeded or adopted. This is a rule, not a list; examples today include `raw/`, `wiki/`, `journal/`, `archive/`, `primers/`, the vault's inbox, and instance-authored skills | Tracked there. Never overwritten. |

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
