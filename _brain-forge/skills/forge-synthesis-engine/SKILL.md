---
name: forge-synthesis-engine
description: Shared forge-purview classification engine (the synthesis 'brain'). Owns top-down classification, the page-type taxonomy, the umbrella-with-sections structuring principle, and optional synthesis steering via instance preferences.md (learn from feedback, adjust the file, or leave off for full discretion). Source-tagged self-observation trace at tweaks-log.md when steering is on. Charter is brain, not hands. Consumers (forge-ingest, forge-signal-check) own the writes. Not directly user-invocable. Follows the vault constitution; human direction overrides.
---

> Product core (`_brain-forge/skills/forge-synthesis-engine/SKILL.md`). Install copies the framework folder into an instance. Adopting a skill into a host is the vault owner's job.

# forge-synthesis-engine Skill

The shared **classification brain** for the **forge purview's** synthesis work. It holds the routing heuristics as executable instruction: top-down classification, the page-type taxonomy, the structuring principle. **Synthesis steering** is an optional product feature on top of that: an instance `preferences.md` the user can turn on, edit, or leave off.

**Charter — brain, not hands.** Given a piece of material (a raw capture, or an existing wiki page under review) this engine produces a **routing/structuring decision**. When steering is on, it also **learns from the user's feedback**. It does **not** perform the writes. Each consumer owns its own write path:

- **`forge-ingest`** (consumer #1) — applies the decision by integrating a `raw/` capture into `wiki/` (its Steps 5–9: integrate, tidy, `raw/_log`, `wiki/_index`, eval-log).
- **`forge-signal-check`** (consumer #2) — applies the model to *existing* wiki content, emitting restructure / de-duplication / canonical-home / re-scope **proposals** (propose-only), then applying approved edits through its own gated path.

This is the `-engine` of the **Tool Structure Convention** (`_brain-forge/schema.md`): shared logic consumed by 2+ commands, not itself a user invocation.

## Non-Negotiables (from the vault constitution)

- **Integration over proliferation.** Strong default: update an existing page (especially the relevant high-level hub) rather than create a new one. New pages stay intentional and rare.
- **Lightweight provenance is required** on every contribution the consumer applies: `Source: [[raw/YYYYMM/YYYYMMDD-filename.md]]` (or `#section`). The engine includes the provenance line(s) in its decision.
- **Preserve the user's voice.** Decisions integrate, quote, or summarize with attribution; never rewrite the user's prose.
- **Respect protected pages** (`ai-behavior: append-only`, `historical-evolution`, `maintainer-mode: propose-only`, `[!ai-instructions]` callouts) — the engine marks these *propose-only* in its decision; the consumer never auto-appends where the page demands a proposal.
- **Real-date discipline:** every stamp uses the real current date from the environment; never inferred from filenames or existing content.
- **Human direction overrides** any automation instinct. Surface; do not perform large autonomous refactors.

## Module: classify (the heart)

Top-down classification. Do **not** start from "what's narrowly in this material and where could it just fit?" Instead reason top-down (if steering is on, consult `preferences.md` for learned biases):

1. **What is this *really about*** at the highest useful level?
2. **What broad category / life domain** does it belong to? (craft, learning, skills, personal practices, relationships, health, PKM, privacy/security, AI tooling, etc.)
3. **Is there — or should there be — a high-level page** for that domain? Prefer high-level pages as homes, especially while volume is low.
4. **Only then:** is the content substantial enough (or likely to grow enough) that a focused sub-page is warranted *now*?

**Page-type taxonomy** (pick the right home):
- **High-level synthesis hubs** — e.g. [[wiki/pkm]] (personal knowledge), [[wiki/ai-tooling]] (tools and agents), [[wiki/craft]] (practice). Always wire new signal here with links + short synthesis.
- **Broad domain pages** — craft, skills, learning, privacy-and-security, etc.
- **Project / implementation pages** — current state of a specific effort ([[wiki/harbor]], [[wiki/river-ledger]]).
- **Evolution pages** — history + "why" (e.g. [[wiki/harbor-evolution]], protected `historical-evolution` — propose only).
- **Dedicated reference / catalog / log pages** — justified when content is for repeated lookup (catalogs, append-only logs like [[wiki/tools-log]], [[wiki/movie-log]], [[wiki/book-log]]). Specificity is a feature; these are tools, not synthesis. Use `type: reference` / protected append-only frontmatter as appropriate.
- **Narrow concept pages** — only when volume + focus clearly warrant splitting from a hub.

**Structuring principle — umbrella-with-sections, grow-then-break-out:** Prefer broad umbrella pages whose topics live as internal sections; break a section out into its own page only once it accumulates enough substance/focus. Broad-when-content-is-low, narrow-later. This applies across the board — opening a new domain (a broad page with sections), folding a pattern under a hub section, and update-vs-create calls — and is the concrete expression of "integration over proliferation."

**Output of a classify call** — a routing decision: target page(s) each marked *update* or *new page*; the top-down rationale (citing the preference(s) that drove it); which high-level hub(s) get a pointer + short synthesis; any new-page / reference-surface recommendation + the specific criterion met; the provenance line(s); and a lifecycle-visibility note (where a deferred/past/unmanifested item stays findable) when relevant.

### Producer boundary (capture surfaces ↔ this engine)

**Canonical home:** `_brain-forge/schema.md` — "Producer Boundary (Describe vs. Decide)". Capture surfaces (`forge-distill`, a web distill primer) **describe** the session; this engine **decides** the wiki home. Never import classify logic onto a capture surface (the slow-vs-fast heuristic lives in schema.md — do not duplicate it here).

**Advisory `layers:` hint.** A raw capture may carry a one-line `layers:` Routing Hint with one or more of `durable-reasoning` / `reference` / `system-intent`. Treat it as a **non-binding hint** — one input to `classify`, never the decision; the engine always owns the final classification call. The `system-intent` layer is **flagged-only**: deciding what happens to a `system-intent` signal at ingest is a separate brain-purview question (parked), not this engine's job.

## Module: preferences (synthesis steering)

This is a **shipping product feature**. It is optional. The user sets the dial: use it so agents learn how they like synthesis routed, edit it to steer, or leave it off and give the engine full discretion.

The learned model, when used, lives at the vault root as **`preferences.md`**, with `tweaks-log.md` beside it. They sit at the root rather than next to this skill because the framework folder is overwritten wholly on update and these are the vault owner's. That file does not ship. Install does not create it. Update never overwrites it. There is exactly one copy. It is a model, not a changelog (the trace is the changelog). Keep it concise and human-readable.

| State | How the user gets there | What the engine does |
|---|---|---|
| **Off** | No `preferences.md`, or the file's `## Autonomy` is `off` | Classify from the standing rules in this skill only. Apply with full discretion. Do not propose-then-wait to capture preferences. Do not create the file. Do not write `tweaks-log.md`. Vault non-negotiables still apply. |
| **On** | User creates `preferences.md` (or sets `## Autonomy` to `learn`) | Read the file at the start of every classify/learn call. Bias the decision. Run the learn loop: propose, take feedback, fold durable deltas, append the trace. |
| **Adjust** | User edits the file, or gives accept/modify/reject during learn | Standing rules in the file are the dial (hub-vs-subpage, voice, recognized hubs, how much to ask). Feedback becomes Learned Deltas. |

Turning it on is creating the file. Turning it off is deleting the file or setting autonomy to `off`. Saying "full discretion" / "leave preferences off" / "just ingest" is Off for that run, and does not create the file.

If the user asks to turn steering on and the file is missing, create it with this skeleton, then run On:

```markdown
# Synthesis preferences

Optional steering for forge-synthesis-engine. Delete this file, or set autonomy to off, for full discretion.

## Autonomy
learn

## Standing rules
- Prefer updating an existing hub over creating a new page.

## Learned Deltas
```

`## Autonomy` values: `learn` (propose and capture feedback) or `off` (full discretion). The user may add standing rules at any time.

## Module: learn (suggestion/feedback loop — consumer-agnostic)

Runs only when steering is **On**. Purpose: learn the user's preferences by proposing before applying and capturing corrections. The intense feedback phase tapers (see Tapering).

Per item (a capture being ingested, or a restructure candidate under review):

1. **Load context.** Read `preferences.md` (seed model + learned deltas) **and** the recent self-observation trace (default last 10 entries of `tweaks-log.md`, or all if fewer) so prior accept/modify/reject patterns inform this decision (the compounding-improvement loop).
2. **Generate a Proposal** via `classify` — do **not** silently apply. (Targets, classification rationale, hub wiring, new-page/reference recommendation, provenance, lifecycle visibility.)
3. **Present** the proposal(s). Single item → inline; several → batch so the user can respond by number.
4. **Capture feedback** — one of:
   - **Accept** → hand off to the consumer to apply as proposed.
   - **Modify** (user adjusts target / rationale / wiring) → hand off the corrected version; extract the correction as a candidate **preference delta**.
   - **Reject** → do not apply; capture the reason as a candidate delta (what *not* to do).
5. **Apply — the consumer's hands, not the engine's.** The accepted/corrected decision is applied through the **consumer's** write path: `forge-ingest` via its Core Flow Steps 5–8; `forge-signal-check` via its gated restructure-edit path. The engine never writes to `wiki/`.
6. **Fold accepted corrections** into `preferences.md` → "Learned Deltas": a short durable rule + real date + a pointer to the trace entry that produced it. Only **durable, generalizable** corrections become deltas; one-off judgment calls do not.
7. **Write a trace entry** (see below) recording proposal → feedback → action → delta, **source-tagged** with the calling consumer.

**Confidence / escalation:** when `preferences.md` already covers the case with high confidence *and* the user has signalled tapering, the engine may let the consumer apply-and-announce instead of full propose-then-wait (see Tapering). Until then, default to propose-then-confirm for any non-trivial decision; trivially-unambiguous cases may be applied-and-announced even early, noting the choice.

## Module: trace (self-observation, source-tagged)

Only when steering is On. The engine records each learning-mode transformation to `tweaks-log.md` and **reads recent entries back** for compounding improvement. This is the engine's "evolution record of itself," kept **strictly out of** `wiki/`, `raw/`, and the eval-logs (the per-consumer eval-logs stay pure for tool-performance analysis). The file header carries the authoritative convention + strict AI instructions; this section is the skill-side contract.

**One trace, two feedback streams.** Both consumers feed this single trace — `forge-ingest` ("did this capture route to the right home?") and `forge-signal-check` ("was this restructure/dedup/canonical-home proposal accepted or rejected?"). Entries are **source-tagged** so either stream can be analyzed alone.

**Write** — one entry per processed item in suggestion/feedback mode; append at end, oldest-first (eval-logs family). Quiet runs may skip the full entry (optional one-liner). **Locked entry format:**

```
## YYYY-MM-DD — <item-id> — <short-slug>
- **source:** forge-ingest | forge-signal-check
- **mode:** suggestion | quiet
- **outcome:** accept | modify | reject
- **delta:** yes | no

### Proposal
- **Target(s):** [[wiki/page]] (update|create|merge|re-scope) [, …]
- **Classification:** top-down rationale; preference(s) cited
- **Hub wiring:** hub(s) + short synthesis | none
- **New-page / reference surface:** recommendation + criterion | none
- **Provenance:** `Source: [[raw/YYYYMM/YYYYMMDD-file.md]]` [, …] | n/a (restructure)
- **Lifecycle visibility:** where deferred/past/unmanifested stays findable | n/a

### Feedback
- **Outcome:** accept | modify | reject
- **User reasoning:** verbatim/close paraphrase (or "—")

### Action / Deltas
- **Applied:** what the consumer landed where
- **Preference delta:** durable rule added to `preferences.md` Learned Deltas | none
```

**Read-back (initial policy)** — in suggestion/feedback mode, load the most recent **10** entries (or all if fewer) alongside `preferences.md` at step 1. A compact-summary view for very long traces is deferred.

## Tapering

When steering is On: reduce feedback-prompt density and trace verbosity as the model matures (for example after 5 consecutive runs with high acceptance and no explicit corrections, halve both), plus honor explicit "ease off" signals. Tapering never turns the feature Off by itself. Off is the user's call.

## Consumers

- **`forge-ingest`** — calls `classify` (and `learn` when steering is On) to route a `raw/` capture, then applies via its own Steps 5–9. forge-ingest owns the wiki write, the `raw/YYYYMM/` tidy, `raw/_log.md`, `wiki/_index.md`, and its performance eval-log if the instance keeps one.
- **`forge-signal-check`** — calls `classify` against *existing* wiki pages to drive restructure / de-duplication / canonical-home / re-scope **proposals** (propose-only v1). Minimum proposal shape: name a canonical home, cite concrete merge/cross-link/re-scope edits, carry provenance, be reversible. When steering is On, proposal quality is learned from feedback through the shared trace.

## Related
- The vault constitution — vault operations (principles this engine executes).
- `_brain-forge/schema.md` — Tool Structure Convention and producer boundary.
- Instance `preferences.md` — the learned model, if the user turned steering on.
- Instance `tweaks-log.md` — source-tagged self-observation trace, if steering is on.
- `forge-ingest` / `forge-signal-check` — the consumers.

**Current version:** Extracted from `forge-ingest` 2026-06-28. Synthesis steering is a shipping feature: on, adjustable, or off.
