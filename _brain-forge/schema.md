---
type: system
signal: false
status: active
last-updated: 2026-11-04
---

# Schema

Frontmatter, AI steering, capability matrix, raw-item rules, working cards, and the producer boundary for a Brain Forge vault. Canonical home for those rules. Tools reference this file and never duplicate it.

This file is framework-owned and updates in place. Unlike the constitution, it is not adopted: the skills read it at this path, so a forked copy would not be consulted. Per-vault deviation belongs in your constitution, which the host loads and which wins under the precedence rule below.

---

## Principles

- Frontmatter is lightweight and purposeful.
- Every property must have at least one clear consumer.
- Use frontmatter for systemic, machine-readable flags. Use AI Steering sections for richer per-page guidance.
- Maintain consistency on pages that carry `signal: true`.
- `raw/` is a dumb drop zone. `wiki/` favors updating existing pages. `cards/` is a working pile and is not synthesized.

---

## Single-Source / Canonical-Home Convention

Any rule that more than one purview, surface, or tool must consult lives in exactly **one canonical home**. Every other surface carries a short principle plus a pointer. Tools reference the home at run time and never duplicate the detail.

| Rule category | Canonical home |
| --- | --- |
| Tool autonomy / permissions | this file — Capability Matrix |
| Tool structure (skill / engine) | this file — Tool Structure Convention |
| Frontmatter / AI-steering / raw-item rules | this file |
| Where a new capture lands | this file — Raw Items |
| Working cards (shape, states, the remove mark) | this file — Working cards |
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

A working card is not a capture. It does not enter this boundary. Working cards says what it is.

---

## Core Frontmatter Properties

| Property | Use | Notes |
|---|---|---|
| `type` | `raw`, `primer`, `journal`, `system`, `project`, `person`, `concept`, `topic`, `reference`, `log`, `evolution`, `idea`, `card` | Primary nature of the item. |
| `signal` | `true` or `false` | Active knowledge graph and AI attention. Graphify inclusion is `.graphifyignore`, not this flag. |
| `ai-behavior` | `append-only`, `historical-evolution`, `propose-only` | Page-level constraint. Always paired with an AI Instructions callout immediately after frontmatter. Absence = default behavior. Do not write `ai-behavior: full`. |
| `status` | `active`, `draft`, `archived`, `completed`, `review` | Lightweight filter. |
| `created` | `YYYY-MM-DD` | Original capture or creation. |
| `last-updated` | `YYYY-MM-DD` | Last substantive update. |
| `date` | `YYYY-MM-DD` | When the item's identity is the date (journal, dated capture). |

| `source` | free text | Where a capture came from. `manual`, `voice`, `web`, `screenshot`, or a quoted description such as `"Claude conversation, 2026-09-02"`. Read as provenance by `forge-ingest`. |

**`title:` is deprecated.** The H1 and filename are authoritative. Remove on sight during hygiene on unprotected pages. A card is the exception: Working cards says why `title` stays.

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
| `cards/` | flag-only | auto | flag-only |
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

`forge-synthesis-engine` may keep a `preferences.md` for optional synthesis steering. That file is user-owned, lives beside the engine at `_brain-forge/skills/forge-synthesis-engine/preferences.md`, and is never overwritten. Absence means the feature is off.

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

**Unprocessed captures land at the root of `raw/`.** A new file is never placed in a dated monthly folder. `forge-ingest` is the one mechanism that moves a file from the root into `raw/YYYYMM/` (derived from the capture's date), and only after that capture has been processed: logged in `raw/_log.md`, and if wiki-bound, synthesized and linked. A held capture is not moved. A removed card is not a capture. Working cards says where that file is written, and ingest does not move it.

Light steering hints in the raw template are acceptable. Strong steering (named destination pages) belongs in an AI Steering section at the top of that one capture. The primary record of what happened to a raw item lives in `raw/_log.md`.

---

## Working cards

`cards/` sits beside `raw/` and `wiki/`. It is a working pile: a site, a course, a product, a person, a talk, a movie, a book. Kind is a tag on the card. A list is a definition applied to cards, not a folder of its own. The pile is not a third knowledge layer. A claim worth synthesizing still goes through distill into `raw/`. Keeping a card does not copy it into `raw/`.

The folder is created when the first card is filed. It is user-owned. The graph does not index it: `cards/` is listed in the seeded `.graphifyignore`, and the synapse column of the matrix is flag-only here. A removed card that has been filed into `raw/` is corpus, and the graph may point at it. That hit is a pointer to the record, not a wiki page.

### File

One markdown file in `cards/`. The template is `_brain-forge/templates/card.md`.

| Property | Use |
|---|---|
| `type` | `card` |
| `signal` | `false` |
| `title` | The name a list shows. Required. The filename is a slug, so the deprecation of `title` does not apply to a card. |
| `url` | When there is one. A card with no URL is still a card. |
| `summary` | One or two sentences. A fetch may write this. A failed fetch still leaves a card. |
| `tags` | Kind and whatever else groups it. A suggestion can be corrected. |
| `state` | `open`, `kept`, or `dropped`. |
| `direction` | The owner's words: research, buy, take, follow, watch, or whatever they meant. |
| `saved` | `YYYY-MM-DD`. When it was saved. |
| `image` | Local path under `cards/_images/`, when a fetch saved one. |

The body is the owner's opinion and the reason. A dropped card keeps why it was turned down, in the body, and stays on the pile.

There is no parked state. Nothing on the pile sits off a list. A hold-off is a `direction`, or a list definition that selects on it. It is not a state, and it does not hide the card.

`open` is still live. `kept` means the owner wants it around, and an agent does not remove it. `dropped` means decided against for now. It stays on the list with the reason.

### Remove

Remove means the owner does not expect to want the card again. Move the file out of `cards/` and write it straight into `raw/YYYYMM/`, using the month of the remove. Set `date` to that day. Set `synthesize: false`. Leave `state` as the last working state, so the earlier decision is still in the file. Do not edit the file after that. Append a row to `cards/_removed.md` in the same action. That list is how a later intake finds the card.

`synthesize: false` is the mark. `forge-ingest` does not synthesize a file that carries it, and it does not synthesize `type: card`. It does not tidy the file and does not change it. It logs the file in `raw/_log.md` so a later run does not treat it as waiting.

Literal delete is not part of this convention. There is no delete state and no delete step. Deleting a named card takes an explicit direction each time.

### Match

Intake compares a candidate with the working files in `cards/` and with `cards/_removed.md`. It loads that set once per run. It does not walk `raw/`. It opens a filed card only when a row is being shown. `cards/_removed.md` and `cards/_images/` are not cards.

`cards/_removed.md` is a table. The filed card remains the record. The reason stays in that file.

```markdown
# Removed cards

| removed | title | url | summary | state | file |
|---|---|---|---|---|---|
```

`removed` is the day the card was filed. `file` is the path under `raw/`. A missing list means nothing has been removed. Intake does not repair. When the owner asks for a repair, that walk reads `raw/` once for `type: card` and rebuilds the list.

Compare URLs after this normalization. Lowercase the scheme and the host. Drop a leading `www.` on the host. Drop the fragment. Drop one trailing slash on the path, except for a path that is only `/`. Drop query keys named `fbclid`, `gclid`, `ref`, `mc_cid`, or `mc_eid`, and any key that starts with `utm_`. Sort the remaining query keys.

Exact means the same card.

- Both have a URL, and the normalized URLs are equal.
- The candidate has no URL, and a card has the same title after trimming and ignoring case.

An exact match shows the earlier decision and does not open a second card unless the owner says so. Show the state. For a removed card, open that one file and show the reason.

A strong similarity is not exact, and a person would still call it the same thing. Show the earlier card's title, url, state, what overlapped, and the reason, and wait. That candidate is not filed until the owner decides.

- The normalized host and path are equal, and the query is not.
- The titles are equal after trimming and ignoring case, the candidate has a URL, and the URLs are not an exact match.
- The titles are the same name with words added or dropped. Ignore case. Drop the words a, an, the, of, and, for, to, in, on, with, and from. The shorter remaining list has at least two words, and every one of them appears in the longer list.

A weak resemblance is not shown. The same host with a different path, or a single shared word, is weak.

Check exact before strong. A URL match is decided on the URL. Title is the exact test only when the candidate has no URL. The same title on two different URLs is strong, not exact.

A later change of mind opens a new file in `cards/`. The filed card stays, and its row stays on the list.

A working card is not a wiki page.

---

## List definitions

A list is a definition applied to cards, not a folder. One markdown file. The query is structured so a Base, or a later dashboard, can run it without a model. The body is one line a person can read. It is not the query.

```yaml
---
type: list
name: Working
cards: cards
where:
  type: card
fields:
  - title
  - state
  - direction
  - url
  - summary
  - saved
order:
  field: saved
  direction: desc
shape: table
group: state
---
```

`cards` is the folder. `where` selects which of those files. `where.tags` means the card has every named tag. `where.exclude_tags` drops a card that has any named tag. `fields` is the column order. `order` sorts the rows. `shape` is the view. `group` clusters them and does not hide any.

The shipped list is `_brain-forge/lists/working.md`. The Base that renders it is `_brain-forge/lists/working.base`. The Base names the same cards and the same fields. It does not add a filter the definition does not have.

An owner's own list lives in `lists/` at the vault root. That folder is user-owned. Update does not write it. The shipped pair stays in the framework so an update can revise the example.

---

## Primer definitions

A brief is `type: brief`. It selects cards with the same `where` a list uses. `fields` names what the prose may read. `body` is allowed there and means the markdown after the card's frontmatter. A list leaves `body` off, because a Base column is a property.

```yaml
---
type: brief
where:
  type: card
fields:
  - title
  - state
  - direction
  - summary
  - body
include:
  - _brain-forge/briefs/house.md#Codex - What to weigh
---
```

That is the whole frontmatter. `name`, `cards`, `order`, and `shape` belong to a list. A brief does not carry them. The skill reads `cards/` and does not sort.

The body of the file is the writing instruction. It is not the primer. The skill returns the primer and does not write it back into the definition. A saved copy is a file the owner names.

A brief lives in `briefs/` at the vault root. That folder is user-owned. Update does not write it. A list stays in `lists/`, and a list is the browse table. The query is written on the brief, so the brief stands on its own.

`include` is optional. Each entry is a path from the vault root, or that path, a `#`, and a heading.

A path with no heading includes the markdown after that file's frontmatter. That form is a brief. A path with a heading includes that section: from the heading through the line before the next heading with the same number of hashes or fewer. A deeper heading stays inside the section. The heading text is the words after the hashes. The same read is in `_brain-forge/primers.md`.

A wiki path is only a heading, and the heading text starts with `Codex - `. The skill reads that heading and does not take the rest of the page. A local brief may be a whole file or any heading.

An include is another instruction. A saved primer is not one. A path under `primers/`, or a file whose `type` is `primer`, is refused. A wiki path with no heading, or a heading that does not start with `Codex - `, is refused. An include does not add that file's cards, and it does not add the wiki page's prose. The brief being run is the query. The skill does not write the primer back into the heading.

Includes are one level. An `include` key on an included file is not followed. The brief names every section it wants.

A file with no `where` is an instruction for other briefs to include. The skill does not run it on its own.

The shipped brief is `_brain-forge/briefs/working.md`. It includes one heading of `_brain-forge/briefs/house.md`.
