---
name: brain-routing-engine
description: "Shared destination decider for a Brain Forge vault. Routes a captured signal to wiki or hold (split, fan-out, or any mix). Owns the destination-class vocabulary, the class × directedness × confidence dispatch model, the producers-describe-only boundary, the seeded phrase-heuristic priors plus learned model (preferences.md, instance overlay, not this core), the suggestion/feedback learning loop, and the source-tagged self-observation trace at _system/skill-logs/brain-routing-engine-tweaks-log.md. Charter is decide, not write: it decides the path; forge-ingest does the writing. Not directly user-invocable."
---

> **CANONICAL CORE** (`_system/skills/` — the single editable source). Per-agent copies under `.claude/skills/` and `.grok/skills/` are generated from this file and header-stamped. Edit here, never there.

# brain-routing-engine Skill

The **destination decider** for a vault: given a captured signal, it decides which surface that signal belongs to, `wiki` or `hold`, and hands off to whoever owns the write. Routing is deciding the path. Forwarding is the write. The `brain-` prefix is historical. This engine is capture triage, not the interaction layer.

**Charter — decide, never write.** This engine owns the decision and the learning. It never writes to any destination.

- **`forge-ingest`** calls this engine to triage each `raw/` capture. It executes `wiki` routes by descending into `forge-synthesis-engine`, then its own write steps. It bundles `hold` routes into the human digest.

This engine sits **upstream** of `forge-synthesis-engine`. Only `wiki`-bound material descends there, which keeps that engine pure.

Product destination classes are `wiki` and `hold` only. `wiki:evolution`, `brain:*`, and `user:*` are not product classes. Signals that are not wiki material `hold`.

## Non-negotiables

- **Decide, never write.** The engine returns routes; consumers write. `raw/` stays immutable. A "slice" is a conceptual span pointing back at the source, never an edit.
- **Matrix-precedence-honest.** Autonomy obeys matrix, then explicit human direction. See `_system/schema.md`.
- **Producers describe, the engine decides.** Producers emit descriptive hints only, never a `class`. Canonical home: `_system/schema.md` "Producer Boundary (Describe vs. Decide)".
- **Real-date discipline.** Every stamp uses the real current date from the environment.
- **Lightweight provenance** on every route: source, date, informing tags, one-line rationale.
- **Human direction overrides** any automation instinct.

## Module: route

A pure decision function. It returns an ordered list of routes. Multi-destination is list length greater than 1. Routes may partition the capture, fan out, or mix.

```
route(content, source, hints, directedness, mode) → [ { class, slice, action, confidence, provenance, rationale } … ]
```

**Inputs:**
- `content` — text, or a reference (`raw/…#section`, distill id).
- `source` — provenance origin.
- `hints` — descriptive tags and detected phrases. Never a class.
- `directedness` — `directed` (the user named a destination) or `undirected` (a raw ingest sweep, batch distill).

**Output:** an ordered list of routes, each `{ class, slice, action, confidence, provenance, rationale }`, plus a top-level `disposition` when the whole capture is `hold`.

### Destination classes

- `wiki` → `forge-synthesis-engine` picks the page (forge hands).
- `hold` → no clear home, or not this vault's material; leave in `raw/`, surface to the human.

No other live classes.

### Split, fan-out, and anti-duplication

Routes are unconstrained: partition, fan-out, or any mix.

- **Within `wiki`:** a single `wiki` route is enough. `forge-synthesis-engine` already fans one insight across pages (canonical detail on the specific page, pointer plus short synthesis on the relevant hub), cross-linked, never verbatim-duplicated.
- **`hold` with `wiki`:** a capture can split: wiki-bound material routes `wiki`, the rest `hold`.

**Anti-duplication:** each home gets destination-appropriate content. Full synthesis at the canonical home, a pointer plus one-line synthesis elsewhere.

## Module: dispatch

`action ∈ { auto, propose, hold }`:

- **Directed capture** (the user said where it goes): explicit direction overrides the matrix → **auto-write** for `wiki`.
- **Undirected capture** (raw ingest sweep, batch distill): plain `wiki` → **auto** within forge's normal confidence gate.
- **Personal or out-of-vault signals** → **`hold`**.
- **Low confidence anywhere** → surface / propose. **No home** → `hold`.

### Confidence bands

Three bands: **high** (explicit phrase or strong content match), **medium** (plausible but ambiguous), **low** (weak guess).

- **Auto** requires the destination be auto-eligible **and** confidence = **high**.
- Below high on an auto-eligible destination → **surface**. No class above a floor → `hold`.

### Surfacing = one grouped digest

On a raw sweep the engine lets the consumer auto-handle clear-cut high-confidence `wiki` routes and surfaces only the genuinely ambiguous ones as one digest. Never a stream of individual prompts.

## Module: producer boundary

Producers emit descriptive hints only. This engine alone maps describe → class.

- distill `layers:` — `durable-reasoning` / `topical-reference` / `system-intent`.
- capture frontmatter.
- raw phrase heuristics.

**Canonical home:** `_system/schema.md` "Producer Boundary (Describe vs. Decide)".

## Module: preferences (the learned model)

- The learned model lives in **`_system/skills/brain-routing-engine/preferences.md`** on the **instance**. It is user-owned overlay, not this core. This product does not ship it.
- **If that file exists, read it** at the start of any engine call and let it bias the decision. Content dominates phrase priors.
- Keep it concise and human-readable. It is a model, not a changelog.

## Module: learn

Default during bootstrap. Tapers. Propose before writing, capture corrections.

Per capture:

1. **Load context.** Read `preferences.md` if present, and the recent trace (default last 10 entries of `_system/skill-logs/brain-routing-engine-tweaks-log.md`).
2. **Generate the route list** via `route`. Do not silently write.
3. **Present.** Clear-cut high-confidence `wiki` autos may be applied-and-announced. Everything ambiguous goes into one grouped digest.
4. **Capture feedback.** Accept → hand to the consumer. Modify → hand off corrected and extract a candidate delta. Reject → do not write; capture the reason.
5. **Write — the consumer's hands.** `wiki` → `forge-synthesis-engine` + `forge-ingest`. `hold` → leave in `raw/`.
6. **Fold accepted corrections** into instance `preferences.md` as Learned Deltas, only when they are durable and generalizable.
7. **Write a trace entry** recording proposal → feedback → action → delta, source-tagged with the calling consumer.

## Module: trace

Records each learning-mode routing to `_system/skill-logs/brain-routing-engine-tweaks-log.md` on the instance. Kept out of `wiki/`, `raw/`, and eval-logs.

```
## YYYY-MM-DD — <item-id> — <short-slug>
- **source:** forge-ingest
- **mode:** suggestion | quiet
- **directedness:** directed | undirected
- **outcome:** accept | modify | reject
- **delta:** yes | no

### Route proposal
- **Routes:** [ class → destination (action, confidence) ; … ]
- **Slicing:** whole | split | fan-out | mix
- **Rationale:** which hint(s)/content drove each class
- **Provenance:** source + date + informing tags

### Feedback
- **Outcome:** accept | modify | reject
- **User reasoning:** verbatim / close paraphrase (or "—")

### Action / Deltas
- **Applied:** what the consumer wrote where (or "proposed, awaiting" / "held")
- **Preference delta:** durable rule added to instance preferences.md | none
```

## Observability

No separate performance eval-log. Execution is observed through the consumer's eval-log (`_system/eval-logs/forge-ingest-log.md`). Domain learning lives in the tweaks-log and instance `preferences.md`.

## Consumers

- **`forge-ingest`** — calls `route` per raw capture before synthesis; descends `wiki` routes into `forge-synthesis-engine`; bundles `hold` into the human digest.

## Related

- `AGENTS.md` — vault constitution.
- `_system/schema.md` — Producer Boundary, Capability Matrix, Tool Structure Convention.
- `_system/skills/forge-synthesis-engine/SKILL.md` — the downstream fine-classifier for `wiki` routes.

**Current version:** Product cut 2026-09-01. Live classes are `wiki` and `hold`. The `brain-` prefix is historical.
