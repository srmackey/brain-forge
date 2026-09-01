# Brain Forge

A vault framework: capture, catalog, link, graph, synthesize.

This repository is the **product**. A vault that installed it is an **instance**. The value of a second brain is its contents, and contents do not ship. What ships is the engine, the conventions, and the contract.

## Model

`raw/` is an immutable capture layer. `wiki/` is an LLM-maintained synthesis layer. The **forge** purview turns arrivals into a corpus. The **vault** purview keeps graph and links honest. **brain** is the interaction layer (retrieval, query, analysis); its write tools are not built yet.

Install copies `skills/` and `templates/` into a vault as ordinary files. It does not write host skill directories or the vault's `AGENTS.md`. Exposing a skill to a coding agent is the vault owner's choice. User-owned files are never overwritten.

A skill may keep a `preferences.md` beside its `SKILL.md` for learned corrections. That file belongs to the instance.

## This repo

| Path | Role |
|---|---|
| `skills/` | Skill cores |
| `templates/` | journal, primer, raw, schema, vault ops |
| `scripts/` | Helper scripts |
| `.graphifyignore` | Starting ignore for a new vault graph |
| `AGENTS.md` | Product-development constitution. Does not travel. |
| `README.md` | This file. Does not travel. |

## Skills

**Forge:** `forge-distill`, `forge-ingest`, `forge-primer`, `forge-signal-check`, `forge-synthesis-engine`

**Vault:** `vault-graph-refresh`, `vault-link-check`

`forge-ingest` decides wiki vs hold. Hold when directed, or when the capture is not vault material.

Dependencies an instance is expected to have: Graphify, and the Obsidian-adjacent host skills (defuddle, json-canvas, obsidian-*) if that vault uses them. This repo does not vendor them.

## Status

Framework source stood up 2026-09-01. Init and update are not built yet. A manual copy is the first install. Do not treat this tree as a finished distribution.
