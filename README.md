# Brain Forge

A vault framework: capture, catalog, link, graph, synthesize.

This repository is the **product**. A vault that installed it is an **instance**. The value of a second brain is its contents, and contents do not ship. What ships is the engine, the conventions, and the contract.

## Model

`raw/` is an immutable capture layer. `wiki/` is an LLM-maintained synthesis layer. The **forge** purview turns arrivals into a corpus. The **vault** purview keeps graph and links honest. **brain** is the interaction layer (retrieval, query, analysis); its write tools are not built yet.

Install copies `skills/` and `templates/` into a vault as ordinary files. It does not write host skill directories or the vault's `AGENTS.md`. Exposing a skill to a coding agent is the vault owner's choice. User-owned files are never overwritten.

## This repo

| Path | Role |
|---|---|
| `skills/` | Skill cores |
| `templates/` | journal, primer, raw, schema, vault ops, distill format |
| `scripts/` | Helper scripts |
| `.graphifyignore` | Starting ignore for a new vault graph |
| `AGENTS.md` | Product-development constitution. Does not travel. |
| `README.md` | This file. Does not travel. |

## Skills

**Forge:** `forge-distill`, `forge-ingest`, `forge-primer`, `forge-signal-check`, `forge-synthesis-engine`

**Vault:** `vault-graph-refresh`, `vault-link-check`

`forge-ingest` decides wiki vs hold. Hold when directed, or when the capture is not vault material.

`vault-graph-refresh` needs Graphify. This product does not ship Graphify or Graphify's skills. The vault owner installs those separately. How that install is documented is still open.

## Synthesis steering

`forge-synthesis-engine` can learn how you like wiki homes chosen. That is a shipping feature, and it is optional.

- **On.** Create `skills/forge-synthesis-engine/preferences.md` in the instance. Ingest and signal-check will propose wiki homes, take accept / modify / reject, and fold durable corrections into that file. A `tweaks-log.md` beside it is the trace.
- **Adjust.** Edit the file (standing rules, how often to ask) or keep giving feedback. That is the dial for how autonomously agents synthesize.
- **Off.** Do not create the file, delete it, or set its autonomy to `off`. The engine classifies from its standing rules and applies with full discretion. Vault non-negotiables still hold.

Install does not create the file. Update never overwrites it. The instruction for the feature lives in the engine skill.

## Status

Framework source stood up 2026-09-01. Init and update are not built yet. A manual copy is the first install. Do not treat this tree as a finished distribution.
