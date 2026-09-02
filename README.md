# Brain Forge

A vault framework: capture, catalog, link, graph, synthesize.

This repository is the **product**. A vault that installed it is an **instance**. The value of a second brain is its contents, and contents do not ship. What ships is the engine, the conventions, and the contract.

## Model

`raw/` is an immutable capture layer. `wiki/` is an LLM-maintained synthesis layer. The **forge** purview turns arrivals into a corpus. The **vault** purview keeps graph and links honest and owns framework install and update. **brain** is the interaction layer (retrieval, query, analysis); its write tools are not built yet.

## What ships

Everything under `_brain-forge/`, and nothing else.

| Path | Role |
|---|---|
| `constitution.md` | The vault constitution. You adopt this. |
| `schema.md` | Frontmatter, capability matrix, producer boundary, tool conventions |
| `skills/` | The eight skill cores |
| `primers/distill.md` | The web distill format |
| `templates/` | Obsidian stationery: journal, primer, raw |
| `scripts/` | Helper scripts |
| `.graphifyignore` | Seed for the vault-root graph ignore |
| `CHANGELOG.md` | Version record |

## Install and update

Install copies `_brain-forge/` to your vault root, seeds two files that only work outside that folder (`.graphifyignore` at the root and `primers/distill.md` beside your own primers), and creates the starting layout: `raw/`, `wiki/`, `primers/`, plus `raw/_log.md`, `wiki/_index.md`, and `primers/_index.md`.

Update overwrites `_brain-forge/` wholly and writes nothing else. Anything you have adopted or edited outside that folder is untouched, which also means it goes stale silently. `vault-update` reports which of your copies are behind after each update. It does not apply them.

Adopting is your step, not install's, because the destination is your choice:

- Copy `_brain-forge/constitution.md` to wherever your host loads a constitution, and adapt it.
- Copy or map `_brain-forge/skills/<name>/SKILL.md` into your host's discovery path (`.claude/skills/`, `.grok/skills/`, `.cursor/skills/`).
- Point your Obsidian template plugin at `_brain-forge/templates/`, or copy those files where you like. Same for `scripts/`.

`schema.md` is the exception. The skills read it at its framework path, so a forked copy would not be consulted. Per-vault deviation belongs in your constitution, which wins under the stated precedence.

Full contract: `_brain-forge/skills/vault-update/SKILL.md`.

## Skills

**Forge:** `forge-distill`, `forge-ingest`, `forge-primer`, `forge-signal-check`, `forge-synthesis-engine`

**Vault:** `vault-graph-refresh`, `vault-link-check`, `vault-update`

`forge-ingest` decides wiki vs hold. Hold when directed, or when the capture is not vault material.

## Graphify (user install)

Brain Forge does not ship Graphify or Graphify's skills. `vault-graph-refresh` and a full `forge-signal-check` need them. Ingest still runs without a graph.

```
uv tool install graphifyy
graphify install
```

Official project: [safishamsi/graphify](https://github.com/safishamsi/graphify). The PyPI package is `graphifyy` (double y); other `graphify*` packages are not this project. `graphify install` registers the `/graphify` skill with your coding assistant. Detail, including the output paths, lives in `vault-graph-refresh`.

## Synthesis steering

`forge-synthesis-engine` can learn how you like wiki homes chosen. That is a shipping feature, and it is optional.

- **On.** Create `preferences.md` at your vault root. Ingest and signal-check will propose wiki homes, take accept / modify / reject, and fold durable corrections into that file. A `tweaks-log.md` beside it is the trace.
- **Adjust.** Edit the file, or keep giving feedback.
- **Off.** Do not create the file, delete it, or set its autonomy to `off`.

Install does not create it. Update never overwrites it. The instruction lives in the engine skill.

## Status

Framework source stood up 2026-09-01, reshaped into `_brain-forge/` the same day. `vault-update` is authored but has never been run end to end, and no instance has installed from this tree yet. Treat 0.1.0 as a first cut, not a finished distribution.
