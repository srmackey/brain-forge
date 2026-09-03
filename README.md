# Brain Forge

A vault framework: capture, catalog, link, graph, synthesize.

This repository is the **product**. A vault that installed it is an **instance**. The value of a second brain is its contents, and contents do not ship. What ships is the engine, the conventions, and the contract.

## Model

`raw/` is an immutable capture layer. `wiki/` is an LLM-maintained synthesis layer. The **forge** purview turns arrivals into a corpus. The **synapse** purview keeps the graph and links honest. **brain** is the interaction layer (retrieval, query, analysis); its write tools are not built yet. The three are siblings, not nested. Framework install and update are not a purview and sit outside the capability matrix.

## What ships

Everything under `_brain-forge/`, and nothing else.

| Path | Role |
|---|---|
| `constitution.md` | The vault constitution. You adopt this. |
| `schema.md` | Frontmatter, capability matrix, producer boundary, tool conventions |
| `skills/` | The nine skill cores |
| `primers.md` | How the primer layer works. The manual. |
| `primers/distill.md` | The web distill format |
| `primers/_system.md` | Surface primer for working on your vault's design |
| `primers/_me.md` | Empty personal primer. Fill this in first. |
| `templates/` | Obsidian stationery: journal, primer, raw |
| `obsidian/` | Obsidian plugin macros |
| `tools/` | Scripts an agent runs |
| `.graphifyignore` | Seed for the vault-root graph ignore |
| `CHANGELOG.md` | Version record |

## Install and update

Install copies `_brain-forge/` to your vault root, seeds the files that only work outside that folder (`.graphifyignore` at the root, and `distill.md`, `_system.md`, and `_me.md` beside your own primers), and creates the starting layout: `raw/`, `wiki/`, `primers/`, plus `raw/_log.md`, `wiki/_index.md`, and `primers/_index.md`.

Update rewrites the files the product ships and deletes nothing, so your own state can live inside the framework folder too: the learned synthesis model sits beside the engine core and survives. Anything you have adopted or edited elsewhere is untouched, which also means it goes stale silently. `brainforge-update` reports which of your copies are behind after each update. It does not apply them.

Adopting is your step, not install's, because the destination is your choice:

- Copy `_brain-forge/constitution.md` to wherever your host loads a constitution, and adapt it.
- Copy or map `_brain-forge/skills/<name>/SKILL.md` into your host's discovery path (`.claude/skills/`, `.grok/skills/`, `.cursor/skills/`).
- Point your Obsidian template plugin at `_brain-forge/templates/` and QuickAdd at `_brain-forge/obsidian/`, or copy those files where you like.
- Run `_brain-forge/tools/` scripts from there, or put them on a path. `synapse-link-check` calls `tools/linkcheck.mjs`, so Node is needed for a full link pass.

`schema.md` is the exception. The skills read it at its framework path, so a forked copy would not be consulted. Per-vault deviation belongs in your constitution, which wins under the stated precedence.

## Start with `primers/_me.md`

It arrives empty. It is the block you would otherwise retype at the start of every AI session, and the primer layer composes from it, so most examples in `_brain-forge/primers.md` pull sections out of it. Fill it in before anything else. If your vault is versioned, gitignore it and any `_<person>.md` beside it.

Full contract: `_brain-forge/skills/brainforge-update/SKILL.md`.

## Skills

**Forge:** `forge-distill`, `forge-ingest`, `forge-primer`, `forge-signal-check`, `forge-synthesis-engine`

**Synapse:** `synapse-graph-refresh`, `synapse-link-check`

**Product (not purview tools):** `brainforge-surfaces`, `brainforge-update`

`forge-ingest` decides wiki vs hold. Hold when directed, or when the capture is not vault material.

## Obsidian

The human layer assumes Obsidian. Wikilinks, `![[file#Section]]` transclusion, Reading view, and `[!ai-instructions]` callouts are all Obsidian mechanics, and `synapse-link-check` exists because clicking a broken link in Obsidian silently creates an empty file at that path.

The agent layer does not assume it. Everything on disk is plain markdown, and the skills run from any coding agent whether or not Obsidian is installed. Open the vault in something else and you keep capture, ingest, synthesis, and link integrity. You lose composition by transclusion and callout rendering.

Plugins, all optional:

- **Templater**, pointed at `_brain-forge/templates/`.
- **QuickAdd**, for the macro in `_brain-forge/obsidian/`, which creates a dated file in `raw/` ready to paste into.
- **Dataview**, for the one query block in the journal template. Without it that block renders as inert text and nothing else changes.

## Version control

Not required. No skill assumes the vault is a git repository.

Worth doing anyway, for your own provenance over everything you keep here. `raw/` is immutable by doctrine, and history is what makes that checkable rather than merely asserted. `wiki/` is rewritten continuously by agents, so a diff is the only practical way to see what a synthesis pass actually changed, and the only way to undo one that went wrong.

If you do version it:

- Ignore `_brain-forge/`. It is the framework and it reinstalls.
- Un-ignore `_brain-forge/skills/forge-synthesis-engine/preferences.md` if you turn synthesis steering on. It lives inside the framework folder but it is yours, and it is the one thing in there that cannot be reinstalled.
- Ignore `primers/_me.md` and any `_<person>.md` beside it. Personal context, not vault knowledge.

## Graphify (user install)

Brain Forge does not ship Graphify or Graphify's skills. `synapse-graph-refresh` and a full `forge-signal-check` need them. Ingest still runs without a graph.

```
uv tool install graphifyy
graphify install
```

Official project: [safishamsi/graphify](https://github.com/safishamsi/graphify). The PyPI package is `graphifyy` (double y); other `graphify*` packages are not this project. `graphify install` registers the `/graphify` skill with your coding assistant. Detail, including the output paths, lives in `synapse-graph-refresh`.

## Synthesis steering

`forge-synthesis-engine` can learn how you like wiki homes chosen. That is a shipping feature, and it is optional.

- **On.** Create `preferences.md` at your vault root. Ingest and signal-check will propose wiki homes, take accept / modify / reject, and fold durable corrections into that file. A `tweaks-log.md` beside it is the trace.
- **Adjust.** Edit the file, or keep giving feedback.
- **Off.** Do not create the file, delete it, or set its autonomy to `off`.

Install does not create it. Update never overwrites it. The instruction lives in the engine skill.

## Status

Framework source stood up 2026-09-01, reshaped into `_brain-forge/` the same day. Install and update are exercised end to end as of 2026-09-02, against an empty vault and a vault that already had contents, including the update path over a hand-edited framework file and the orphan report. `forge-distill` and `forge-primer` have never been run, the Obsidian templates and the QuickAdd macro have never been loaded by a real plugin, and no vault outside this author's has installed from this tree. Treat 0.2.0 as working and young, not as a finished distribution.
