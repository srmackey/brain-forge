---
name: forge-primer
description: "Assemble context for a goal so nobody re-explains. Trigger on 'compose a primer', 'take this vault with me', 'I don't want to re-explain', or /forge-primer. Compose mode (default) follows ## Primer - Steering, ## Primer - Continuity, and ## Codex - Name. Static mode authors a new primers/ file. Not the capture pipe. Follows the vault constitution; human direction overrides."
argument-hint: "[goal [using codex \"Name\"] [from wiki/page raw/path ...]]  |  static <description>"
---

> Product core (`_brain-forge/skills/forge-primer/SKILL.md`). Install copies the framework folder into an instance. Adopting a skill into a host is the vault owner's job.

# forge-primer Skill

The primer layer manual is `_brain-forge/primers.md`: the kinds, the reserved headings, and the heading read. This skill is the engine, and the canonical home for the discovery rules below. Read the manual for the model, read here for the mechanics.

Reusable engine for **dynamic primer composition** (default) **and static primer authoring** (`static` mode). In compose mode it compiles a block from a `## Codex - Name` instruction, plus Steering and Continuity. The instruction is for the agent. The rest of a wiki page stays human prose. In static mode it authors a new hand-crafted primer file in `primers/` (see **Static Authoring Mode** at the end). This skill does not read cards. That path is `forge-card-primer`.

## When to run

Run when the owner wants assembled context for a goal: "compose a primer", "take this vault with me", "I don't want to re-explain". That is the constitution Use path. This is not the capture pipe (that is distill then ingest).

## Role & Purpose

Your job is to transform a user goal + optional references into a ready-to-paste, high-signal primer block without forcing the user (or calling agent) to re-explain foundational material.

You do this by:
- Locating `## Codex - Name`, `## Primer - Steering`, and `## Primer - Continuity`. The old heading `## Primer - Codex - Name` does not match.
- When a codex is supplied or relevant, following that heading's instructions.
- Preferring Continuity snapshots for exact conversation resumption.
- Falling back gracefully to static content or synthesis from sources.
- Always emitting clean, dense, attributed output with provenance.

The wiki page stays human. A Codex heading is an instruction, not page prose. Do not write the compiled block back into the heading.

## Terminology

- **Codex** (`## Codex - Name`): An instruction. It lives on a wiki page, or in a primer file when that file holds a heading to pull by name. Plain heading. Not a callout. The composer reads it and does not write the block back. The heading text starts with `Codex - `.
- **Primer file**: Any `.md` in `primers/` that may contain static context, one or more Codex headings, or both.
- **Steering** (`## Primer - Steering` on wiki pages): Topic-specific composition guidance. On wiki, wrapped in an `[!ai-instructions]-` callout, so the page stays human-browsable.
- **Continuity** (`## Primer - Continuity` in raw/distill files): High-signal snapshot (decisions, state, constraints, open questions, signals) intended primarily to continue this exact conversation. Plain heading.
- **Static content**: Normal descriptive headings in primer files. No special prefix.

Take the section the way `_brain-forge/primers.md` defines it. A missing heading stops the run. Callout wrappers are required only for wiki Steering. A Codex heading is plain. Do not follow a transclusion. Do not read `cards/`.

## How to Accept & Process Caller Input

The caller (user or another agent) will typically provide:
- A clear **goal** or description of the desired primer (e.g. "movie recommendations for this weekend respecting house rules").
- Optional explicit references: "using codex Harbor Movies", "from wiki/harbor-movies and the latest raw movie log", "continue from raw/202606/20260604-foo.md", or direct section headers/content.
- Any additional static primer sections or full files they want included.

**Your process**:
1. Parse the goal and any explicit codex / file / header references.
2. Read the referenced files.
3. Discover `## Codex - Name`, `## Primer - Steering`, and `## Primer - Continuity` in that material. Do not follow a transclusion. Do not read `cards/`.
4. Apply the rules below (especially any codex instructions).
5. Compose and return the primer. Do not write it back into the heading.

You may need to read multiple sources (a wiki page or primer file for its Codex, a wiki page for its Steering, a raw file for its Continuity).

## Core Composition Rules (mandatory)

When assembling a primer, follow these rules in order:

1. **Explicit codex reference** (by name, for example "use codex Harbor Movies", or by the full `## Codex - Name` header): Locate that heading on a wiki page or in a primer file and follow its instructions. A missing heading stops the run. Do not write the result back into the heading. Example instructions might say: "Start with the Harbor profile, prefer any Continuity block for watched titles and signals, apply the house-rules filter, keep the primer brief."

2. **Relevant wiki page**: If a wiki page is in scope for the goal, check for a `## Primer - Steering` section and apply its guidance (including any guardrails, gravitates, cross-refs to protected logs, etc.).

3. **Raw file reference or Continuity**: When the goal or a codex references a raw/distill file, first look for a `## Primer - Continuity` section. Prefer it if present (it is the high-fidelity resume snapshot). If absent, synthesize the most relevant high-signal context from the full raw file (user perspective, decisions, constraints, open questions). The Continuity block's primary purpose is "continue this exact conversation."

4. **Static primer content**: Use normal static blocks from primer files when no codex section applies to the request, or when the caller explicitly wants the stable/hand-crafted version.

5. **Output quality**: Produce a clean, dense, attributed primer block ready to paste. Include lightweight provenance (for example "Sources: [[wiki/harbor#Codex - Harbor Movies]], [[wiki/harbor-movies#Primer - Steering]], Continuity from [[raw/202606/...]]"). Attribute key guardrails and facts back to their origins. A paste block has no wikilinks.

6. **Respect non-goals and constitution**: Do not write the composed block onto a wiki page. A Codex heading may live there. The rest of that page stays human prose. Do not put a card query, a field list, or a rating on the wiki. Preserve human agency (the caller decides stable vs. dynamic). One composer handles many patterns via Codex headings. Always follow the vault constitution (provenance, prefer existing pages for any synthesis side-effects, human direction overrides, raw immutability).

If multiple codex or sources conflict, prefer the most specific explicit codex, then the most recent Continuity, then Steering, then static. Surface the choice briefly in provenance when helpful.

## Output Format

Return the composed primer as a single, clearly delineated, copy-paste-ready block (usually starting with frontmatter or role framing if the sources supply it, followed by the dense context).

At the end (or in a small Provenance section), list the key sources and headers used.

Example skeleton the caller can expect:
```
[optional role framing from sources]

[composed high-signal context drawn from Steering / Continuity / codex-driven assembly]

**Provenance (composed via /forge-primer)**  
- Codex: [[wiki/harbor.md#Codex - Harbor Movies]]
- Steering: [[wiki/harbor-movies#Primer - Steering]]
- Continuity (preferred): [[raw/202606/20260604-...]]
```

Keep the result concise yet complete for the stated goal.

## Invocation Patterns (User-Facing)

- `/forge-primer "movie recommendations respecting house rules" using codex "Harbor Movies"`
- `/forge-primer goal="continue our prior discussion on AI training paths" from wiki/ai-training raw/2026...`
- `Compose a primer for [goal] using the Harbor Movies codex`
- "Continue from [specific raw file that has a Continuity block]"

The skill/command should be easy to invoke directly with natural language goals plus references.

## Non-Negotiables (from the vault constitution)

- Do not write a composed primer onto a wiki page. Steering stays in the callout. A Codex heading is plain, and the mark is what makes it an instruction rather than page prose.
- Do not read `cards/`. Do not follow a transclusion. Do not write the block back into the heading.
- A missing `## Codex - Name`, when the caller named one, stops the run. `## Primer - Codex - Name` does not match.
- Preserve human agency: the caller remains in control of what becomes stable vs. dynamically composed. Offer Continuity. Do not force it.
- One composer handles many patterns via Codex headings. Do not add a skill per pattern.
- Lightweight provenance on every meaningful contribution.
- Raw immutability (except the dated-subfolder move in `_brain-forge/schema.md` Raw Items); log raw processing only to `raw/_log.md`.
- Human direction always takes precedence.
- Follow the exact heading names (`## Primer - Steering`, `## Primer - Continuity`, `## Codex - Name`) as the discovery contract.

## Examples

**Harbor Movies (matches spec example)**

Caller: "Use codex Harbor Movies for recommendations this weekend."

Composer behavior:
- Locate `## Codex - Harbor Movies` on the wiki page or in the primer file that holds it.
- Follow its instructions (start with the Harbor profile, prefer Continuity for watched titles and signals, apply the values filter, keep it brief). Do not write the block back.
- Pull Steering from `wiki/harbor-movies#Primer - Steering` (or `## Primer - Steering`).
- If a recent raw with Continuity for movie discussion is referenced, prefer it.
- Output a tight, attributed primer.

**Simple static fallback**

Caller provides goal + a wiki page with no codex ref and no raw. Use the `## Primer - Steering` content plus any directly supplied static sections. Attribute the sources.

## Composition & Extensibility

- This skill is intended to be invoked directly (`/forge-primer`) or composed into larger workflows (e.g. inside vault sittings, web prompt generation, or other skills).
- Authors new static primers directly in its `static` mode (see **Static Authoring Mode** below), and pairs with `/forge-ingest` (Continuity blocks arrive via distill-this + raw ingest).
- The detailed composer logic lives here (the skill) so it can be reliably loaded and evolved without duplicating rules across surfaces.

## Static Authoring Mode (`static`)

When the caller invokes with the `static` keyword (`/forge-primer static <description>`), author a *new* hand-crafted primer file instead of composing one.

1. **Determine intent** — extract from the current conversation, author from a description, or adapt external pasted content (Grok/ChatGPT custom instructions, etc.).
2. **Elicit identifying info (filename only; ask only if not derivable):** AI tool (`claude | grok | cursor | any`), purpose (`coaching | code-review | brainstorm | system-prompt | …`), display title (the H1), slug `<tool>-<purpose>`. Tool + purpose live in the slug, not in frontmatter.
3. **Draft** `primers/<slug>.md` — frontmatter `type: primer`, `signal: true`, `status: active`, `created:`/`last-updated:` (real current date; never inferred). Body per `_brain-forge/templates/primer.md` (When to Use, Role / Framing, Paste Block, Provenance). The **Paste Block must be fully self-contained** — no `[[wikilinks]]` or Obsidian syntax (the receiving AI lives outside this vault).
4. **Propose before saving** — slug, H1, When-to-Use preview, Paste-Block preview (~150 chars), word count. Wait for approval.
5. **On approval** — write the file; suggest 1–2 existing primers to cross-link.

**Authoring non-negotiables:** `type: primer` + `signal: true` always; no `title:`/`tags:`/`ai-tool:`/`purpose:`/`domain:`; self-contained Paste Block; kebab-case `<tool>-<purpose>` slug; never silently overwrite (propose `<slug>-v2.md` or ask); always propose before writing.

## Version & Provenance

Codex is `## Codex - Name`, plain, on a wiki page or in a primer file. Callouts are required only on wiki Steering. This skill does not read cards and does not follow a transclusion.

Update this file whenever the composition rules or header conventions evolve.

This skill is the living embodiment of the "Context Composer" — keep it general, conservative, and high-leverage.
