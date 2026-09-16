---
type: system
signal: false
status: active
last-updated: 2026-09-01
---

# Schema

Frontmatter, AI steering, capability matrix, raw-item rules, and the producer boundary for a Brain Forge vault. Canonical home for those rules. Tools reference this file and never duplicate it.

This file is framework-owned and updates in place. Unlike the constitution, it is not adopted: the skills read it at this path, so a forked copy would not be consulted. Per-vault deviation belongs in your constitution, which the host loads and which wins under the precedence rule below.

---

## Principles

- Frontmatter is lightweight and purposeful.
- Every property must have at least one clear consumer.
- Use frontmatter for systemic, machine-readable flags. Use AI Steering sections for richer per-page guidance.
- Maintain consistency on pages that carry `signal: true`.
- `raw/` is a dumb drop zone. `wiki/` favors updating existing pages.

---

## Single-Source / Canonical-Home Convention

Any rule that more than one purview, surface, or tool must consult lives in exactly **one canonical home**. Every other surface carries a short principle plus a pointer. Tools reference the home at run time and never duplicate the detail.

| Rule category | Canonical home |
| --- | --- |
| Tool autonomy / permissions | this file — Capability Matrix |
| Tool structure (skill / engine) | this file — Tool Structure Convention |
| Frontmatter / AI-steering / raw-item rules | this file |
| Where a new capture lands | this file — Raw Items |
| Capture destination (wiki / hold) | `forge-ingest` |
| Wiki-page classification (which page, once wiki-bound) | `forge-synthesis-engine` (optional instance `preferences.md` when steering is on) |
| Authoring templates | `_brain-forge/templates/` |
| Vault operations | the vault constitution |
| Capture-describe vs classify-decide | this file — Producer Boundary |
| Tool-performance logging | this file — Eval log |
| Derived surfaces, stamps, staleness | `brainforge-surfaces` |

---

## Producer Boundary (Describe vs. Decide)

A capture surface **describes** a session. `forge-ingest` decides wiki vs hold. `forge-synthesis-engine` decides which wiki page, and only for wiki-bound material.

A capture surface never picks the wiki home. Classification logic is never copied onto a capture surface.

**Test:** does the guidance track slow-moving structure, or the fast-moving learned model? Structure may be described on a capture surface. The learned model stays in the engine.

A `layers:` tag on a distill (`durable-reasoning` / `reference` / `system-intent`) is a non-binding hint. The engine always owns the final call. Producers never emit a destination class.

---

## Core Frontmatter Properties

| Property | Use | Notes |
|---|---|---|
| `type` | `raw`, `primer`, `journal`, `system`, `project`, `person`, `concept`, `topic`, `reference`, `log`, `evolution`, `idea` | Primary nature of the item. |
| `signal` | `true` or `false` | Active knowledge graph and AI attention. Graphify inclusion is `.graphifyignore`, not this flag. |
| `ai-behavior` | `append-only`, `historical-evolution`, `propose-only` | Page-level constraint. Always paired with an AI Instructions callout immediately after frontmatter. Absence = default behavior. Do not write `ai-behavior: full`. |
| `status` | `active`, `draft`, `archived`, `completed`, `review` | Lightweight filter. |
| `created` | `YYYY-MM-DD` | Original capture or creation. |
| `last-updated` | `YYYY-MM-DD` | Last substantive update. |
| `date` | `YYYY-MM-DD` | When the item's identity is the date (journal, dated capture). |

| `source` | free text | Where a capture came from. `manual`, `voice`, `web`, `screenshot`, or a quoted description such as `"Claude conversation, 2026-09-02"`. Read as provenance by `forge-ingest`. |

**`title:` is deprecated.** The H1 and filename are authoritative. Remove on sight during hygiene on unprotected pages.

**Date discipline.** Every stamp is the real current date. Never infer a future date.

### Idea captures

A capture with `type: idea` is a durable source for a line of thinking: what was being aimed at, in the owner's voice. It is not session resumption (Continuity), not a wiki page per idea, and not a chair `_system/evolution.md` entry.

Ingest does not dump it onto a hub. It adds a row to a finder index (default `wiki/ideas.md` if that page exists; otherwise recommend creating it) and wires the relevant domain hub with a pointer. The finder is rows: date, gist, about, pointer to raw, pointer to whatever it produced. One line of gist. Not the paper.

Association is wikilinks, so the graph has edges. Optional routing-hint keys on the capture, descriptive not deciding:

- `about:` hub or topic pages this idea is for
- `precedes:` / `supersedes:` a prior `type: idea` capture when there is a trail
- `produced:` a spec, paper, or wiki page that came out of it (a path is fine when the artifact lives outside the vault)

"Capture this as an idea" is a distill signal. Distill writes `type: idea` instead of `type: raw`. Wiki home stays the engine's call.

### Canonical block (`signal: true`)

```markdown
---
ai-behavior: append-only | historical-evolution | propose-only   # only when constrained
type: concept | topic | project | person | log | primer | ...
signal: true
status: active
created: YYYY-MM-DD
last-updated: YYYY-MM-DD
---
```

If `ai-behavior` is set, the next lines after `---` are:

```markdown
> [!ai-instructions]- AI Instructions (Strict)
> - ...
```

### Canonical block (`signal: false`)

```markdown
---
type: system | raw | journal | idea | ...
signal: false
status: active
last-updated: YYYY-MM-DD
---
```

---

## Capability Matrix (Folder × Purview → Permission)

Canonical autonomy table. Tools never duplicate it.

**Purviews:** **forge** (synthesis) · **synapse** (the graph and link integrity) · **brain** (interaction: retrieval, query, analysis). Brain's write tools are not designed. The column still exists: an outside agent operates in brain and is denied forge and synapse.

**The three are siblings, not nested.** A synapse is anatomically inside a brain and this table is not: an agent operating in **brain** is denied the **synapse** column like any other. What synapse holds is one thing seen twice, since the graph draws the relationships between documents and link resolution validates them against the real file tree.

**Two tools are not in this table.** `brainforge-update` and `brainforge-surfaces` write the framework rather than the corpus, and this matrix answers one question: may an agent write in this folder of the vault. That is what the `_brain-forge/` row has always been saying in a column that used to contain the installer.

**Permission legend:**
- **auto** — write directly.
- **propose** — surface for approval before writing.
- **log** — append-only to this purview's execution log.
- **flag-only** — read and report; never write.
- **never** — out of purview.
- **\*** — auto on unprotected files, propose on `ai-behavior`-protected files.

| Folder | brain | forge | synapse |
| --- | --- | --- | --- |
| The vault constitution / shims | flag-only | never | flag-only |
| `_brain-forge/` | flag-only | never | flag-only |
| `raw/` | flag-only | flag-only *(+ the Raw Items dated-subfolder move)* | flag-only |
| `wiki/` | flag-only | auto | auto\* (links) |
| `primers/` | flag-only | auto | auto\* |
| `journal/` | never | never | propose |
| `archive/` | flag-only | flag-only | flag-only |

**Governance:**
1. Folder is the default permission per purview.
2. `ai-behavior` can only make a file more restrictive than its folder default.
3. Confidence operates inside what the matrix permits. Matrix answers "may I write here?" Confidence answers "auto or surface?"
4. Explicit human direction overrides the matrix.
5. Link repair in the synapse column is `synapse-link-check`. `forge-signal-check` delegates its wiki link step there.

---

## Tool Structure Convention

Every Brain Forge tool is a skill with a single canonical core at `_brain-forge/skills/<name>/SKILL.md`. Install copies the framework folder; exposing a skill to a host is the vault owner's step.

- **Every purview tool is `<purview>-<intent>`.** `forge-ingest`, `synapse-link-check`. The prefix says which column of the matrix the tool answers to.
- **The product's own hands are named for the product.** `brainforge-update` and `brainforge-surfaces` write the framework rather than the vault, so they carry no purview prefix and sit outside the matrix. This is the one place naming the product is right, because the product is these two tools' subject where every other tool's subject is the vault.
- **User-invocable skill.** The human invokes `/<name>` after the instance operator exposes the skill to a host.
- **`*-engine` skill.** Shared logic consumed by two or more skills, not itself user-invoked (`forge-synthesis-engine`).
- **Tie-breaker.** A skill that is itself user-invocable keeps its natural name even when shared (`synapse-link-check`).

`forge-synthesis-engine` may keep a `preferences.md` for optional synthesis steering. That file is user-owned, lives outside the framework folder, and is never overwritten. Absence means the feature is off.

Imported third-party skills are external artifacts, not authored cores.

---

## Eval log

The skills in this framework make judgment calls: what to ingest, where it goes, what to repair, what to propose. The eval log is how you find out whether they actually followed their own instructions. A system that claims to improve itself needs somewhere the evidence lands.

**The file is `_brain-forge/eval.md`.** It is not on the framework manifest, so an update never writes it. Newest entry at the top, matching `raw/_log.md`.

**Write unconditionally.** A governing skill appends after its core work and before waiting on the human. Do not skip an entry because the run went fine: a clean run is the baseline that makes a bad one legible. Do not batch entries across runs.

**The charter is behavior, not findings.** This log records how the tool ran. It never records what the tool found, and reading it is never a way to act on the run's content. A skill that writes its proposals here has broken the split, and so has a later pass that implements what it reads here.

Entry shape:

```markdown
## YYYY-MM-DD — <skill> — <short slug>

- **Scope:** what the run was asked to cover
- **Steps observed:** the numbered steps the skill actually executed, named
- **Deviations:** steps skipped, done out of order, or performed without the
  gate the skill requires. "None" is an answer.
- **Invented policy:** any rule the skill applied that its own core does not
  state. This is the highest-signal line in the entry.
- **Outcome:** what landed, in one line
```

**Keep it separate from the other two logs.** `raw/_log.md` records what happened to captures. `skills/forge-synthesis-engine/tweaks-log.md` records what the synthesis engine learned. Neither is a performance record, and mixing them costs you all three.

If the vault also runs an external eval convention, that one covers the tools it governs and this one covers the framework's skills. They are separate scopes. Do not try to detect one from the other.

## Low-Signal Ownership Default

In execution, landing, cleanup, and other routine contexts, the agent defaults to owning low-signal details. It bundles formatting, normalization, and trivia into the higher-level unit, and surfaces only material outcomes. High-signal work (constitution, protected surfaces, architecture) stays gated. Human direction overrides.

---

## AI Steering

Frontmatter handles systemic flags. Richer steering lives in explicit sections.

Place page-specific AI rules in a collapsed callout immediately after frontmatter:

```markdown
> [!ai-instructions]- AI Instructions (Strict)
> - Rule or guidance...
```

- **Frontmatter:** queryable flags (`signal`, `ai-behavior`, `type`, `status`).
- **AI Steering sections:** nuanced per-page guidance. Exception, not default, on raw captures.

---

## Raw Items

`raw/` is a dumb drop zone. New material lands with minimal overhead.

**Unprocessed captures land at the root of `raw/`.** A new file is never placed in a dated monthly folder. `forge-ingest` is the one mechanism that moves a file from the root into `raw/YYYYMM/` (derived from the capture's date), and only after that capture has been processed: logged in `raw/_log.md`, and if wiki-bound, synthesized and linked. A held capture is not moved.

Light steering hints in the raw template are acceptable. Strong steering (named destination pages) belongs in an AI Steering section at the top of that one capture. The primary record of what happened to a raw item lives in `raw/_log.md`.
