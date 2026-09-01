---
type: system
signal: false
status: active
last-updated: 2026-09-01
---

# Schema

Frontmatter, AI steering, capability matrix, raw-item rules, and the producer boundary for a Brain Forge vault. Canonical home for those rules. `AGENTS.md` states the principle and points here. Tools reference this file and never duplicate it.

This is the instance copy, written by install from the product template. Do not hand-edit a generated copy.

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
| Capture destination (wiki / hold) | `brain-routing-engine` (+ instance `preferences.md`) |
| Wiki-page classification (which page, once wiki-bound) | `forge-synthesis-engine` (+ instance `preferences.md`) |
| Authoring templates | `_templates/` |
| Operating model | `AGENTS.md` |
| Capture-describe vs classify-decide | this file — Producer Boundary |

---

## Producer Boundary (Describe vs. Decide)

A capture surface **describes** a session. The engines **decide** destination.

- `brain-routing-engine` makes the coarse call: `wiki` or `hold`.
- `forge-synthesis-engine` makes the fine call: which wiki page, and only for `wiki`-bound material.

A capture surface never picks the wiki home. Classification logic is never copied onto a capture surface.

**Test:** does the guidance track slow-moving structure, or the fast-moving learned model? Structure may be described on a capture surface. The learned model stays in the engine.

A `layers:` tag on a distill (`durable-reasoning` / `reference` / `system-intent`) is a non-binding hint. The engine always owns the final call. Producers never emit a destination class.

---

## Core Frontmatter Properties

| Property | Use | Notes |
|---|---|---|
| `type` | `raw`, `primer`, `journal`, `system`, `project`, `person`, `concept`, `topic`, `reference`, `log` | Primary nature of the item. |
| `signal` | `true` or `false` | Active knowledge graph and AI attention. Graphify inclusion is `.graphifyignore`, not this flag. |
| `ai-behavior` | `append-only`, `historical-evolution`, `propose-only` | Page-level constraint. Always paired with an AI Instructions callout immediately after frontmatter. Absence = default behavior. Do not write `ai-behavior: full`. |
| `status` | `active`, `draft`, `archived`, `completed`, `review` | Lightweight filter. |
| `created` | `YYYY-MM-DD` | Original capture or creation. |
| `last-updated` | `YYYY-MM-DD` | Last substantive update. |
| `date` | `YYYY-MM-DD` | When the item's identity is the date (journal, dated capture). |

**`title:` is deprecated.** The H1 and filename are authoritative. Remove on sight during hygiene on unprotected pages.

**Date discipline.** Every stamp is the real current date. Never infer a future date.

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
type: system | raw | journal | ...
signal: false
status: active
last-updated: YYYY-MM-DD
---
```

---

## Capability Matrix (Folder × Purview → Permission)

Canonical autonomy table. `AGENTS.md` points here. Tools never duplicate it.

**Purviews:** **forge** (synthesis) · **vault** (mechanics; name pending) · **brain** (interaction: retrieval, query, analysis). Brain's write tools are not designed. The column still exists: an outside agent operates in brain and is denied forge and vault.

**Permission legend:**
- **auto** — write directly.
- **propose** — surface for approval before writing.
- **log** — append-only to this purview's execution log.
- **flag-only** — read and report; never write.
- **never** — out of purview.
- **\*** — auto on unprotected files, propose on `ai-behavior`-protected files.

| Folder | brain | forge | vault |
| --- | --- | --- | --- |
| `AGENTS.md` / shims | flag-only | never | flag-only |
| `_system/` | flag-only | log | auto\* (links) |
| `raw/` | flag-only | flag-only | flag-only *(+ the one documented dated-subfolder move)* |
| `wiki/` | flag-only | auto | auto\* (links) |
| `primers/` | flag-only | auto | auto\* |
| `journal/` | never | never | propose |
| `archive/` | flag-only | flag-only | flag-only |

**Governance:**
1. Folder is the default permission per purview.
2. `ai-behavior` can only make a file more restrictive than its folder default.
3. Confidence operates inside what the matrix permits. Matrix answers "may I write here?" Confidence answers "auto or surface?"
4. Every maintainer tool logs to `_system/eval-logs/`. Forge holds `log` on `_system/` so it can record runs without otherwise writing there.
5. Explicit human direction overrides the matrix.
6. Link repair in the vault column is `vault-link-check`. `forge-signal-check` delegates its wiki link step there.

---

## Tool Structure Convention

Every Brain Forge tool is a skill with a single canonical core at `_system/skills/<name>/SKILL.md`.

- **User-invocable skill.** The human invokes `/<name>`. Generated copies live under host skill paths.
- **`*-engine` skill.** Shared logic consumed by two or more skills, not itself user-invoked (`forge-synthesis-engine`, `brain-routing-engine`).
- **Tie-breaker.** A skill that is itself user-invocable keeps its natural name even when shared (`vault-link-check`).

Cores are edited in the product. Instance copies are generated and stamped. Learned `preferences.md` is instance overlay, co-located with the copy, never overwritten by update.

Imported third-party skills are external artifacts, not authored cores.

---

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

Light steering hints in the raw template are acceptable. Strong steering (named destination pages) belongs in an AI Steering section at the top of that one capture. The primary record of what happened to a raw item lives in `raw/_log.md`.
