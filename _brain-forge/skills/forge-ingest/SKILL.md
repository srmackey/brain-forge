---
name: forge-ingest
description: "Forge-purview consumer skill that transforms raw/ captures into the living wiki/ synthesis layer. Delegates top-down classification (and optional synthesis steering) to forge-synthesis-engine; owns the ingest hands — consulting raw/_log.md first, the capture-quality screen (flags flattering register, untagged AI-suggested claims, and other capture noise; neutralizes rather than propagating it into wiki/), the wiki write, the permitted raw/YYYYMM/ tidy, raw/_log.md logging, wiki/_index.md upkeep, and the eval log. Adds lightweight provenance. Follows the vault constitution; human direction overrides."
argument-hint: "[optional: single filename or path under raw/ to process]"
---

> Product core (`_brain-forge/skills/forge-ingest/SKILL.md`). Install copies the framework folder into an instance. Adopting a skill into a host is the vault owner's job.

# forge-ingest Skill

The forge purview's **raw→wiki ingest hands**: it brings material from the immutable `raw/` dumb drop zone into the LLM-maintained `wiki/` layer so the wiki compounds in **density and usefulness over time, not volume**. The `/forge-ingest` command is a thin, human-facing entry point.

**Brain vs. hands.** The *classification brain* — top-down classification, the page-type taxonomy, the structuring principle, the learned-preferences model (`preferences.md`), the suggestion/feedback learning loop, and the self-observation trace — lives in the shared **`forge-synthesis-engine`** skill (`_brain-forge/skills/forge-synthesis-engine/SKILL.md`). This skill is the engine's **consumer #1**: it calls the engine for the page decision and owns the *writes* (Steps 5–9).

**Wiki or hold.** A raw capture is not always wiki-bound. This skill makes that call before synthesis. Default is wiki. Hold when the user directed hold, the capture is not this vault's material, or Step 3.4's severe case applies. Only wiki-bound material descends into `forge-synthesis-engine`. Hold routes stay in `raw/` and are bundled into the human digest. This skill does **not** force non-wiki signal into a wiki page.

## Role & Purpose

Acting in the forge purview, transform raw material into a clean, evolving wiki. Be **conservative by default** and favor **integration over proliferation**. The strong default is to *update an existing page* (especially the relevant high-level hub) rather than create a new one. Wiki vs hold is this skill's call. Page classification comes from the engine. This skill applies both faithfully and adds provenance.

## Non-Negotiables (from the vault constitution)

- **`raw/` is immutable.** Never modify, move, or delete anything in `raw/` **except**: (a) appending to `raw/_log.md`, and (b) the narrow permitted move of a capture into its correct `raw/YYYYMM/` year-month subfolder based on the file's date. Never alter raw *content* (light frontmatter enrichment only if it clearly helps future processing; prefer leaving the capture untouched).
- **Always consult `raw/_log.md` first** to know what has already been processed; never auto-scan/auto-process the whole `raw/` tree on every session. Ingest is human-initiated.
- **Lightweight provenance is required** on every meaningful contribution to a wiki page: `Source: [[raw/YYYYMM/YYYYMMDD-filename.md]]` (or `#section` for precision).
- **Log raw processing only to `raw/_log.md`** (most recent first). Do not mix architecture notes into that log.
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
Before triage, screen each capture — AI-session distills especially — for the **capture-noise patterns** (the detection-side counterpart of the capture-quality Core Rules in `primers/distill.md`):

1. **Flattering / persona-affirming register** about the user ("deep expertise", "impressive system") — appraisal instead of plain fact.
2. **AI suggestions recorded as settled conclusions** — especially untagged numbers (prices, hours, estimates, timelines) with no evidence the user adopted them.
3. **Silent rosiness** — no visibility of what went unchallenged (nothing resembling a Risks / unexamined-assumptions signal in a session distill).
4. **Missing origin attribution** — no record of who originated significant ideas/direction-changes or how the user engaged.
5. **AI-voice narration / editorializing** — third-person framing of the user, advice-column tone, outside knowledge beyond the session.

Output a per-capture verdict — `capture-quality: clean` or `capture-quality: flagged (patterns N, …)` — that **travels with the capture** through routing and synthesis and **must appear** in the human digest and the Step 7 `raw/_log.md` entry. The screen never blocks ingest by itself; default handling is flag + neutralize (Step 5). **Severe case** (untagged AI-suggested conclusions dominate the capture, so a faithful wiki write would require guesswork): propose **`hold`** and a cleaned sibling capture in `raw/` (same date, marked as a replacement). Do not ingest until the user decides.

### Step 3.5 — Wiki or hold
Before any wiki classification, decide destination for each capture:
- **Hold** when the user directed hold, the capture is not this vault's material, or Step 3.4's severe case proposes hold + remediation. Leave in `raw/`, surface to the human. Do not write it into the wiki.
- **Wiki** otherwise. Proceed to Step 4.
Bundle all hold / propose cases into **one grouped digest** rather than per-item prompts.

### Step 4 — Classify the wiki-bound capture (delegated to `forge-synthesis-engine`)
For each wiki-bound capture, call the **`forge-synthesis-engine`** skill — module `classify` (or `learn` when synthesis steering is on). The engine returns the **page decision**: target page(s) each marked *update* or *new page*, the top-down rationale, which high-level hub(s) get a pointer + short synthesis, any new-page / reference-surface recommendation + criterion, the provenance line(s), and a lifecycle-visibility note when relevant. **This skill does not re-derive the classification** — it consumes the engine's decision. (Full classification doctrine: the engine's `classify` module, plus `preferences.md` when steering is on.)

### Step 5 — Integrate the signal (update existing > create new)
- **Default:** update the most appropriate *existing* page(s), and **always wire the relevant high-level hub** (the relevant domain hub, the practice hub, and so on) with links + short synthesis so cross-cutting signal is not lost.
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

### Step 9 — Eval log
Append a performance entry to `_brain-forge/eval.md` after core work (unconditional; format and charter in `_brain-forge/schema.md`): flow adherence, `raw/_log.md` consultation, capture-quality screening, provenance, preference for existing pages, permitted moves only. Do not mix learning content (proposals, preference deltas) into that log. Those belong with the engine's trace next to `_brain-forge/skills/forge-synthesis-engine/`.

## Synthesis steering (delegated to `forge-synthesis-engine`)

The engine owns this feature. This skill applies the page decision (Steps 5–8). The engine never writes to `wiki/`.

- **Off** (no `preferences.md`, or the user said full discretion / just ingest / leave preferences off): classify and apply. Do not create the file. Do not run the learn loop.
- **On** (`preferences.md` present with autonomy `learn`): the engine proposes, takes feedback, folds durable deltas, and writes a `source: forge-ingest` trace entry. This skill applies accepted/corrected decisions.
- **Adjust:** the user edits `preferences.md`, or their accept/modify/reject during learn becomes a Learned Delta.

Trace file, when On: `_brain-forge/skills/forge-synthesis-engine/tweaks-log.md`.

## Graphify
- Consult recent Graphify output during normal ingest only when it adds clear value. **Do not** auto-refresh during ingest.
- If you skip Graphify because it is stale, **explicitly note this** in the run and in `raw/_log.md`.
- A fresh graph is mandatory only for full lint/health checks (not normal ingest).

## Invocation

Invocation pattern (once the instance operator has exposed this skill to a host):

```
Use the forge-ingest skill.
Scope: [specific file/path | discover unprocessed in raw/]
Mode: follow synthesis steering (off = full discretion; on = propose/learn). "just ingest" / "full discretion" forces off for this run.
Consult raw/_log.md first; call the forge-synthesis-engine for classification; follow the Core Flow + Non-Negotiables.
```

Returns: per-file routing decisions (from the engine) + applied edits, the `raw/_log.md` entry, any tidy moves, the `wiki/_index.md` update, and the `_brain-forge/eval.md` entry.

## Related
- `_brain-forge/skills/forge-synthesis-engine/SKILL.md` — the shared classification brain this skill consumes for wiki-bound captures.
- The vault constitution — vault operations.
- `_brain-forge/schema.md` — producer boundary and capability matrix.
- `primers/distill.md` — distill format (capture-quality rules).
- `raw/_log.md` — raw-processing memory.

**Current version:** Consumer #1 of `forge-synthesis-engine`. Wiki vs hold is this skill's call (2026-09-01). Capture-quality screen added 2026-07-11.
