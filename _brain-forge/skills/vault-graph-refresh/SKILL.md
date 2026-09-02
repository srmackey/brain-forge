---
name: vault-graph-refresh
description: Rebuild the Graphify knowledge graph over the vault. Graphify is a user install; this product does not ship it. Run manually when the graph is stale (>24h old).
argument-hint: "[optional: path to subfolder to scope the graph]"
---

> Product core (`_brain-forge/skills/vault-graph-refresh/SKILL.md`). Install copies the framework folder into an instance. Adopting a skill into a host is the vault owner's job.

# /vault-graph-refresh

Rebuild the Graphify knowledge graph for this vault. **Graphify is a user install.** This product does not ship Graphify or Graphify's skills. Install steps are below. If no Graphify skill is available, say so and stop. Do not vendor Graphify into this tree.

When Graphify is present, execute its skill logic inside the current AI session so the calling model supplies semantic extraction (no external key required). Run this manually. Never trigger it from ingest.

**Do not** default to the package CLI `extract` path; that is headless and needs its own LLM key.

## Installing Graphify

Official project: [safishamsi/graphify](https://github.com/safishamsi/graphify). The PyPI package is `graphifyy` (double y). The command and skill are `graphify`. Other `graphify*` packages on PyPI are not this project.

```
uv tool install graphifyy
graphify install
```

`graphify install` registers the `/graphify` skill with your coding assistant. Name the host if it is not Claude Code (`graphify install --platform cursor`, and so on). Alternatives: `pipx install graphifyy` or `pip install graphifyy`.

Expected output is `_graphify-out/graph.json` with `GRAPH_REPORT.md` beside it. Graphify may write `graphify-out/` instead. Treat whichever exists. Install seeds a starting `.graphifyignore` at the vault root, which ignores both.

## Execution mode (critical — ensures the calling LLM does the work)

When this command is invoked from inside an AI session, **execute the Graphify skill logic directly using the current model's agentic capabilities**.

- Discover whatever Graphify skill surface this host has. Do not assume a path.
- Follow that skill's invoke procedure *inside this conversation*.
- For semantic extraction on documents/papers/images: use subagent dispatch so the host model performs the work when the skill supports a "host session is the LLM" path.
- Use terminal/python execution only for deterministic parts (detection, AST, build, clustering).
- **Do not** invoke the `graphify` package CLI binary with the `extract` (or equivalent full-build) subcommand.

Direct CLI use is only appropriate for fully unattended / CI scenarios where you intentionally provide a key or local backend.

## Steps

1. Invoke the Graphify skill on this vault **by following the integrated execution mode above** (or scoped to a subfolder if the caller named one). By default it respects `.graphifyignore` at the vault root.
2. Look for the graph at `_graphify-out/graph.json`, then `graphify-out/graph.json`. Use whichever exists. Report the path. Same for `GRAPH_REPORT.md` beside it.
3. Record the rebuild time and confirm:
   ```
   Graph rebuilt: YYYY-MM-DD HH:MM
   Nodes: N | Edges: N
   Output: <path actually written>
   ```
4. If Graphify fails or produces 0 nodes: report the error. Do not treat the previous graph as updated.

## Scoping for the current model (raw + wiki)

The graph is primarily a supporting tool for the **forge purview** working in `wiki/`.

- For normal work (ingest, wiki maintenance): prefer a focused scope, or rely on `.graphifyignore` at the vault root.
- For a full lint/health check: a broader or full run.
- Recommended focused invocations (passed to the Graphify skill; the AI executes the integrated skill path, not the CLI):
  - `graphify wiki raw`
  - `graphify wiki raw primers`

## When to run

- Before any full lint/health check on the wiki layer
- After a major batch of new raw material or significant wiki changes
- Anytime you want fresh wikilink suggestions or relationship discovery during synthesis work

## Non-negotiables

- Never invoke this from within `/forge-ingest` — graph refresh is always a separate, explicit step.
- The output directory (`_graphify-out/` or `graphify-out/`) is overwritten on each run. That is expected.
- **Invocation path**: AI-driven runs must use the integrated skill execution path so the calling LLM performs semantic extraction via subagents. Direct use of the Graphify package CLI `extract` path is headless and needs an external LLM key. Avoid it for normal use.
- If Graphify is missing, stop. Do not pretend a graph exists.
- Append a minimal entry to `_brain-forge/eval.md` after the rebuild: date, scope, node/edge counts. Unconditional; see `_brain-forge/schema.md`.
