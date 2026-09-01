---
name: vault-graph-refresh
description: Rebuild the Graphify knowledge graph over the vault. Run manually before /forge-ingest when the graph is stale (>24h old).
argument-hint: "[optional: path to subfolder to scope the graph]"
---

> **CANONICAL AGENT-AGNOSTIC CORE** (`_system/skills/` - the single editable source, per the Agent Canon in `_system/schema.md`). Per-agent copies under `.claude/skills/` and `.grok/skills/` are **generated** from this file + the agent profiles and are header-stamped - edit here, never there. Migrated 2026-07-06 (re-arch Phase 3 slice 4 — logic moved out of the command per the centralization charter).

# /vault-graph-refresh

Rebuild the Graphify knowledge graph for this vault by executing the graphify *skill* logic inside the current AI session. This lets the calling LLM supply the agentic/semantic extraction work (no external key required). `/forge-ingest` queries this graph to find related nodes without re-reading every file. Run this manually — never triggered automatically.

**Do not** default to the package CLI `extract` path; that is headless and needs its own LLM key.

## Execution mode (critical — ensures the calling LLM does the work)

When this command is invoked from inside an AI session, **execute the graphify skill logic directly using the current model's agentic capabilities**. The goal is for the *calling LLM* (this session) to supply the intelligence for semantic extraction.

- Read the active graphify skill definition (typically the user-global `~/.claude/skills/graphify/SKILL.md`; use whatever graphify skill surface the current agent discovers).
- Follow the skill's "What You Must Do When Invoked" procedure *inside this conversation*.
- For semantic extraction on documents/papers/images (Step B): use subagent dispatch so the host model performs the work (the skill explicitly supports the "host session itself is the LLM" path when no external key is set; dispatch general-purpose subagents with the exact prompt template from the skill).
- Use terminal/python execution only for deterministic parts (detection, AST, build, clustering).
- **Do not** invoke the `graphify` package CLI binary with the `extract` (or equivalent full-build) subcommand. That is the headless path — the package will require its own external LLM provider key (Gemini, Anthropic, etc.).

Direct CLI use is only appropriate for fully unattended / CI scenarios where you intentionally provide a key or local backend.

## Steps

1. Invoke the `graphify` skill on this vault **by following the integrated execution mode above** (or scoped to `$ARGUMENTS` if a subfolder is specified). By default it respects `.graphifyignore` (see below).
2. (Local patch applied on this machine) The graphify skill now always outputs to `_graphify-out/`. The graph JSON is at `_graphify-out/graph.json`.
3. Record the rebuild time and confirm:
   ```
   Graph rebuilt: YYYY-MM-DD HH:MM
   Nodes: N | Edges: N
   Output: _graphify-out/graph.json
   ```
4. If Graphify fails or produces 0 nodes: report the error. Do not treat the previous graph as updated.

## Scoping for the current model (raw + wiki)

The graph is primarily a supporting tool for the **forge purview** working in `wiki/`.

- For normal work (ingest from raw/, Query → File Back, /forge-signal-check on wiki pages): prefer a focused scope or rely on the tightened `.graphifyignore`.
- For full lint/health checks or migration review (porting from legacy domains/archive): use a broader or full run.
- Recommended focused invocations (these are passed to the graphify skill; the AI executes the integrated skill path, not the CLI):
  - `graphify wiki raw AGENTS.md`
  - `graphify wiki raw AGENTS.md primers focus _system/ARCHITECTURE.md _system/system-log.md`
- The `.graphifyignore` (at root) now aggressively excludes archive/, journal/, domains/ (legacy), old constitution drafts, etc., while carving back the key active `_system/` files. This keeps communities and god nodes high-signal around the living `raw/` + `wiki/` layer.

See also the active Graphify guidance in `AGENTS.md`.

## When to run

- Before any full lint/health check on the wiki layer (mandatory per AGENTS.md)
- After a major batch of new raw material or significant wiki changes
- Anytime you want fresh wikilink suggestions or relationship discovery during synthesis work

## Non-negotiables

- Never invoke this from within `/forge-ingest` — graph refresh is always a separate, explicit step.
- The output directory (`_graphify-out/`) is overwritten on each run — that is expected behavior.
- **Invocation path**: AI-driven runs (the normal case when you type `/vault-graph-refresh` inside an AI session) must use the integrated skill execution path so the calling LLM performs semantic extraction via subagents. Direct use of the `graphify` package CLI `extract` path is the headless mode and will require an external LLM key — avoid it for normal use inside this system.
- A local patch was applied to the graphify skill on this machine so AI-driven runs (including /vault-graph-refresh) consistently use the vault's preferred `_graphify-out/` location (hidden, matching other system folders). Direct CLI usage of the package may still default to `graphify-out/` (the env var GRAPHIFY_OUT=_graphify-out in your profile can keep CLI aligned too). .gitignore and .graphifyignore ignore the other variants defensively.
- After completing the rebuild and recording (core work), append a minimal compliant entry to `_system/eval-logs/vault-graph-refresh-log.md` (create if needed) per the Eval Logs Convention. Supports analyzer review of graph freshness handling, scoping, and output recording.
