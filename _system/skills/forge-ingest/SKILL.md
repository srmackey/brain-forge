---
name: forge-ingest
description: "Forge-purview consumer skill that transforms raw/ captures into the living wiki/ synthesis layer. Delegates top-down classification + the learned-preferences model + the suggestion/feedback learning loop to the shared forge-synthesis-engine; owns the ingest hands — consulting raw/_log.md first, the capture-quality screen (flags flattering register, untagged AI-suggested claims, and other capture noise; neutralizes rather than propagating it into wiki/), the wiki write, the permitted raw/YYYYMM/ tidy, raw/_log.md logging, wiki/_index.md upkeep, and the performance eval-log at _system/eval-logs/forge-ingest-log.md. Adds lightweight provenance. Follows AGENTS.md Forge Purview Constitution; human direction overrides."
argument-hint: "[optional: single filename or path under raw/ to process]"
---

> **CANONICAL AGENT-AGNOSTIC CORE** (`_system/skills/` - the single editable source, per the Agent Canon in `_system/schema.md`). Per-agent copies under `.claude/skills/` and `.grok/skills/` are **generated** from this file + the agent profiles and are header-stamped - edit here, never there. Migrated 2026-07-06 (re-arch Phase 3).

# forge-ingest Skill

The forge purview's **raw→wiki ingest hands**: it brings material from the immutable `raw/` dumb drop zone into the LLM-maintained `wiki/` layer so the wiki compounds in **density and usefulness over time, not volume**. The `/forge-ingest` command is a thin, human-facing entry point.

**Brain vs. hands.** The *classification brain* — top-down classification, the page-type taxonomy, the structuring principle, the learned-preferences model (`preferences.md`), the suggestion/feedback learning loop, and the self-observation trace — lives in the shared **`forge-synthesis-engine`** skill (canonical core: `_system/skills/forge-synthesis-engine/SKILL.md`). This skill is the engine's **consumer #1**: it calls the engine for the routing decision and owns the *writes* (Steps 5–9). (Extraction per `_system/plans/20260628-forge-synthesis-engine-restructure-pass.md`, Phase 1.)

**Triage before synthesis (upstream router).** A raw capture is not always wiki-bound. This skill first calls the **`brain-routing-engine`** (canonical core: `_system/skills/brain-routing-engine/SKILL.md`) to **triage the destination(s)** — returning an ordered list of routes (`wiki` / `hold`, split or fan-out). Only `wiki`-bound material descends into `forge-synthesis-engine` for the page call (keeping that engine pure). `hold` routes are bundled into the human digest. This skill does **not** force non-wiki signal into a wiki page.

## Role & Purpose

Acting in the forge purview, transform raw material into a clean, evolving wiki. Be **conservative by default** and favor **integration over proliferation**. The strong default is to *update an existing page* (especially the relevant high-level hub) rather than create a new one. The routing judgment comes from the engine; this skill applies it faithfully and adds provenance.

## Non-Negotiables (from AGENTS.md Forge Purview Constitution)

- **`raw/` is immutable.** Never modify, move, or delete anything in `raw/` **except**: (a) appending to `raw/_log.md`, and (b) the narrow permitted move of a capture into its correct `raw/YYYYMM/` year-month subfolder based on the file's date. Never alter raw *content* (light frontmatter enrichment only if it clearly helps future processing; prefer leaving the capture untouched).
- **Always consult `raw/_log.md` first** to know what has already been processed; never auto-scan/auto-process the whole `raw/` tree on every session. Ingest is human-initiated.
- **Lightweight provenance is required** on every meaningful contribution to a wiki page: `Source: [[raw/YYYYMM/YYYYMMDD-filename.md]]` (or `#section` for precision).
- **Log raw processing only to `raw/_log.md`** (most recent first). Architecture/system notes go to `_system/system-log.md`; never here.
- **Maintain `wiki/_index.md`** for significant changes.
- **Respect protected pages** (`ai-behavior: append-only`, `historical-evolution`, `maintainer-mode: propose-only`, `[!ai-instructions]` callouts) — propose, never auto-append, where the page demands it.
- **Real-date discipline:** every stamp uses the real current date from the environment; never inferred from filenames or existing content.
- **Human direction overrides** any automation instinct. Surface; do not perform large autonomous refactors.

## Core Flow (normal ingest)

### Step 1 — Determine scope
- If a specific file/path is named, process only that (it may be at `raw/` root or already in a dated subfolder).
- Otherwise, list `raw/` and its `raw/YYYYMM/` subfolders and focus on files **without** a corresponding entry in the recent sections of `raw/_log.md`. Prioritize recent dates. Ignore `_log.md` itself.

### Step 2 — Read `raw/_log.md` first
Read the latest entries to avoid duplicate work. (Hard precondition; call it out in the run.)

### Step 3 — Read each file + detect date and steering hints
- Read full content + frontmatter.
- Extract the capture date: prefer `date:` frontmatter; fall back to a filename date (`20260604-...` or `2026-06-04-...`).
- Note inline hints (`#todo`, `#revisit`, `suggested-title:`, etc.).

### Step 3.4 — Screen capture quality (noise that must not compound)
Before triage, screen each capture — AI-session distills especially — for the **capture-noise patterns** (the detection-side counterpart of the capture-quality Core Rules in `primers/distill-ai-session.md`; distills predating that primer's 2026-07-10 upgrade are the likely carriers):

1. **Flattering / persona-affirming register** about the user ("deep expertise", "impressive system") — appraisal instead of plain fact.
2. **AI suggestions recorded as settled conclusions** — especially untagged numbers (prices, hours, estimates, timelines) with no evidence the user adopted them.
3. **Silent rosiness** — no visibility of what went unchallenged (nothing resembling a Risks / unexamined-assumptions signal in a session distill).
4. **Missing origin attribution** — no record of who originated significant ideas/direction-changes or how the user engaged.
5. **AI-voice narration / editorializing** — third-person framing of the user, advice-column tone, outside knowledge beyond the session.

Output a per-capture verdict — `capture-quality: clean` or `capture-quality: flagged (patterns N, …)` — that **travels with the capture** through routing and synthesis and **must appear** in the human digest and the Step 7 `raw/_log.md` entry. The screen never blocks ingest by itself; default handling is flag + neutralize (Step 5). **Severe case** (untagged AI-suggested conclusions dominate the capture, so a faithful wiki write would require guesswork): propose **`hold` + remediation** — a cleaned durable-record sibling in `raw/` per the superseded-sibling pattern (see `primers/raw-noise-cleanup-pass.md` while active) — instead of ingesting. Propose-only; the human decides.

### Step 3.5 — Triage the destination (delegated to `brain-routing-engine`)
Before any wiki classification, call the **`brain-routing-engine`** skill — module `route` (or `learn` in suggestion/feedback mode) — for each capture. Pass `content` (or a `raw/…#section` reference), `source`, the descriptive `hints` (distill `layers:`, detected phrases — never a class), `directedness` (`directed` if a specific file was named / user directed; `undirected` on a discovery sweep), and `mode`. The engine returns an ordered **list of routes** each `{ class, slice, action, confidence, provenance, rationale }`:
- **`wiki` routes** → proceed to Step 4 (classify the page) and Steps 5–9 (write). This is the normal ingest path.
- **`hold`** → leave in `raw/`, surface to the human. Do not write it into the wiki.
- Bundle all `propose` / `hold` routes into **one grouped digest** (Low-Signal Ownership default) rather than per-item prompts. **This skill does not re-derive the triage** — it consumes the engine's route list.

### Step 4 — Classify the wiki-bound route (delegated to `forge-synthesis-engine`)
For each `wiki` route from Step 3.5, call the **`forge-synthesis-engine`** skill — module `classify` (or `learn` in suggestion/feedback mode). The engine reads `preferences.md` + the recent trace and returns the **routing decision**: target page(s) each marked *update* or *new page*, the top-down rationale (citing the preference(s) that drove it), which high-level hub(s) get a pointer + short synthesis, any new-page / reference-surface recommendation + criterion, the provenance line(s), and a lifecycle-visibility note when relevant. **This skill does not re-derive the classification** — it consumes the engine's decision. (Full classification doctrine: the engine's `classify` module + `preferences.md`.)

### Step 5 — Integrate the signal (update existing > create new)
- **Default:** update the most appropriate *existing* page(s), and **always wire the relevant high-level hub** (pkm for the domain, craft for practice, etc.) with links + short synthesis so cross-cutting signal is not lost.
- **Create a new page** only when the topic is a distinct concept/domain with no natural home **and** it is substantial / likely to grow **or** it is recurring territory the human explicitly wants to track as a dedicated surface. New pages stay intentional and rare.
- **Project/idea lifecycle visibility:** ensure active, past, deferred, and unmanifested projects/ideas stay findable from a hub or [[wiki/projects]] with a status note — never let them disappear after they stop being the focus.
- **Preserve the user's voice.** Do not rewrite prose. (This protects the *user's* words — not the distilling AI's framing; see the next bullet.)
- **Never propagate capture noise (Step 3.4 flags).** When integrating from a flagged capture: write wiki contributions in neutral register (drop appraising language about the user), and carry epistemic status — claims that trace to AI suggestions the user never explicitly adopted (especially numbers) enter the wiki tagged `(AI-suggested, unvalidated)`, never as settled fact. Downgrade-only: never promote a suggestion toward decided; if origin is undeterminable, tag `(origin unclear — treat as unvalidated)`.
- **Messy / multi-topic captures:** extract and distribute the pieces across the best existing homes rather than forcing one new page.
- Add lightweight provenance on every contribution.

### Step 6 — Tidy the source file into its dated folder
After integration (or a decision to defer): if the file is at `raw/` root or in the wrong subfolder, **move it** into `raw/YYYYMM/` (derived from its date), keeping the filename. If already correct, leave it. This is the *only* permitted reorganization inside `raw/`.

### Step 7 — Log to `raw/_log.md`
Append a concise entry (most recent first): file reference (with subfolder), what happened, notable decisions / provenance added, and the capture-quality verdict when flagged (patterns found + how they were handled).

### Step 8 — Update `wiki/_index.md`
For significant changes, update Recent Activity + relevant page pointers.

### Step 9 — Emit the performance eval-log entry
Append a minimal compliant entry to `_system/eval-logs/forge-ingest-log.md` per the eval-log convention. This captures *tool-performance* signal only (flow adherence, raw/_log consultation, capture-quality screening, provenance discipline, preference-for-existing-pages, permitted-moves-only, logging discipline). Required elements: live `Step N: ...` call-outs and a `**Core log written at:** ...` timing marker after core work.

> **Strict separation of logging concerns:** `_system/eval-logs/forge-ingest-log.md` is for **tool performance / instruction adherence only** (consumed by `/brain-tool-eval`, never acted on for domain content). The *learning* content — proposals, feedback, preference deltas — goes to the engine's distinct trace at `_system/skill-logs/forge-synthesis-engine-tweaks-log.md` (forge-ingest entries are `source: forge-ingest`). Never mix learning content into the eval-log.

## Learning Mode (delegated to `forge-synthesis-engine`)

During the temporary learning/bootstrap period the default mode is the engine's **suggestion/feedback loop** (`learn` module): it loads `preferences.md` + the recent trace, generates a proposal, presents it, captures feedback, folds durable corrections into `preferences.md`, and writes a source-tagged trace entry. **This skill provides the *apply* step** — Steps 5–8 above — for accepted/corrected decisions; the engine never writes to `wiki/`. The intense feedback phase is temporary by design and tapers (engine's Tapering logic).

- **Engine preferences model:** `_system/skills/forge-synthesis-engine/preferences.md` (single-sourced at the engine's canonical core; read first on every run, via the engine).
- **Engine trace:** `_system/skill-logs/forge-synthesis-engine-tweaks-log.md` — forge-ingest's entries are tagged `source: forge-ingest`.
- For a quiet run, say "just ingest" / "apply directly": the engine may apply-and-announce trivially-unambiguous routings; full propose-then-confirm remains the default for non-trivial decisions.

## Graphify
- Consult recent Graphify output during normal ingest only when it adds clear value. **Do not** auto-refresh during ingest.
- If you skip Graphify because it is stale, **explicitly note this** in the run and in `raw/_log.md`.
- A fresh graph is mandatory only for full lint/health checks (not normal ingest).

## Invocation

Invocation pattern (this skill is exposed natively as `/forge-ingest` on every canon agent — `.claude/skills/` on Claude Code, via Claude compat on Cursor, `.grok/skills/` on Grok):

```
Use the forge-ingest skill.
Scope: [specific file/path | discover unprocessed in raw/]
Mode: suggestion/feedback (default during the temporary learning phase) | "just ingest" for a quiet run.
Consult raw/_log.md first; call the forge-synthesis-engine for classification; follow the Core Flow + Non-Negotiables.
```

Returns: per-file routing decisions (from the engine) + applied edits, the `raw/_log.md` entry, any tidy moves, the `wiki/_index.md` update, and the eval-log entry.

## Related
- `_system/skills/brain-routing-engine/SKILL.md` — the upstream triage decider this skill consumes *before* synthesis (destination routing: wiki / hold).
- `_system/skills/forge-synthesis-engine/SKILL.md` — the shared classification brain this skill consumes for `wiki`-bound routes (the engine).
- `AGENTS.md` — Forge Purview Constitution (principles; the classification heuristics the engine executes).
- `_system/plans/20260628-forge-synthesis-engine-restructure-pass.md` — the extraction plan (Phase 1).
- `_system/plans/20260626-forge-ingest-learning-skill.md` — the prior plan that built the learning brain now in the engine (archived).
- `raw/_log.md` — raw-processing memory.
- Eval-log convention: append a performance entry after core work. Do not mix learning content into the eval-log.

**Current version:** Consumer #1 of `forge-synthesis-engine` (Phase 1 extraction, 2026-06-28). The classification brain + learned-preferences model + suggestion/feedback loop + self-observation trace moved to the engine (behavior-preserving); this skill retains the ingest hands (Steps 1–9), the forge-purview non-negotiables, and provenance discipline. Built on the Phase 1–3 forge-ingest base. Single-sourced at the canonical core `_system/skills/forge-ingest/SKILL.md` since 2026-07-06 (re-arch Phase 3); per-agent copies are generated. Capture-quality screen added 2026-07-11 (Step 3.4 + the Step 5 no-propagation rule), the ingest-time counterpart of the distill primer's 2026-07-10 capture-quality rules and the one-time raw-noise cleanup pass.
