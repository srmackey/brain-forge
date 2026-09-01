---
name: vault-graph-refresh
description: Rebuild the Graphify knowledge graph over the vault. Graphify is a user install; this product does not ship it. Run manually when the graph is stale (>24h old).
argument-hint: "[optional: path to subfolder to scope the graph]"
---

> Product core (`skills/vault-graph-refresh/SKILL.md`). Install copies this file into an instance. Host exposure is the instance operator's job.

# /vault-graph-refresh

Rebuild the Graphify knowledge graph for this vault. **Graphify is a user install.** This product does not ship Graphify or Graphify's skills. If no Graphify skill is available on the host, say so and stop.

When Graphify is present, execute its skill logic inside the current AI session so the calling model supplies semantic extraction (no external key required). Run this manually. Never trigger it from ingest.

**Do not** default to the package CLI `extract` path; that is headless and needs its own LLM key.

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
2. Brain Forge expects the graph at `_graphify-out/graph.json`. If Graphify wrote somewhere else, say where and treat that path as the graph for this run. Do not assume a machine-local patch.
3. Record the rebuild time and confirm:
   ```
   Graph rebuilt: YYYY-MM-DD HH:MM
   Nodes: N | Edges: N
   Output: _graphify-out/graph.json
   ```
4. If Graphify fails or produces 0 nodes: report the error. Do not treat the previous graph as updated.

## Scoping for the current model (raw + wiki)

The graph is primarily a supporting tool for the **forge purview** working in `wiki/`.

- For normal work (ingest, wiki maintenance): prefer a focused scope, or rely on `.graphifyignore` at the vault root (this product ships a starting ignore).
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
- The output directory (`_graphify-out/`) is overwritten on each run — that is expected behavior.
- **Invocation path**: AI-driven runs must use the integrated skill execution path so the calling LLM performs semantic extraction via subagents. Direct use of the Graphify package CLI `extract` path is headless and needs an external LLM key. Avoid it for normal use.
- If Graphify is missing, stop. Do not pretend a graph exists.
- If the instance keeps an eval log for this skill, append a minimal entry after the rebuild: date, scope, node/edge counts.
