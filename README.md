# Brain Forge

A vault framework: capture, catalog, link, graph, synthesize.

This repository is the **product**. A vault that installed it is an **instance**. The value of a second brain is its contents, and contents do not ship. What ships is the engine, the conventions, and the contract.

## Model

`raw/` is an immutable capture layer. `wiki/` is an LLM-maintained synthesis layer. The **forge** purview turns arrivals into a corpus. The **vault** purview keeps graph and links honest. **brain** is the interaction layer (retrieval, query, analysis); its write tools are not designed yet.

Install copies the framework into a vault because host skill discovery is filesystem-based. Generated copies are stamped and overwritten on update. User-owned files are never overwritten.

## This repo

| Path | Role |
|---|---|
| `_system/skills/` | Canonical skill cores |
| `_templates/` | journal, primer, raw, schema, instance constitution |
| `_scripts/` | Helper scripts |
| `.graphifyignore` | Starting ignore for a new vault graph |

Learned preferences stay in the instance. They are not in this tree.

## Skills

**Forge:** `forge-distill`, `forge-ingest`, `forge-primer`, `forge-signal-check`, `forge-synthesis-engine`

**Vault:** `vault-graph-refresh`, `vault-link-check`

**Triage:** `brain-routing-engine` (destination classes: `wiki`, `hold`)

Dependencies an instance is expected to have: Graphify, and the Obsidian-adjacent host skills (defuddle, json-canvas, obsidian-*) if that vault uses them. This repo does not vendor them.

## Status

Framework source stood up 2026-09-01 as a copy from a working vault. Init and update are not built yet. A manual copy is the first install. Do not treat this tree as a finished distribution.
