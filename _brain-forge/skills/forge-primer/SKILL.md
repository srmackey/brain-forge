---
name: forge-primer
description: "The Context Composer + static primer authoring skill. Compose mode (default): assembles high-signal, intent-specific primers on demand by discovering and following ## Primer - Steering (wiki pages), ## Primer - Continuity (raw/distill files), and ## Primer - Codex - Name (inside primer files); when a codex is referenced, reads and executes its instructions for dynamic assembly. Static mode (`static` arg): authors a new hand-crafted static primer file in primers/ (type: primer + signal: true). Produces clean, dense, attributed output with lightweight provenance. The Codex / Context Composer lives in this skill. Follows the vault constitution: human direction overrides, provenance on contributions, conservative defaults, no wiki pollution, preserve human agency."
argument-hint: "[goal [using codex \"Name\"] [from wiki/page raw/path ...]]  |  static <description>"
---

> Product core (`_brain-forge/skills/forge-primer/SKILL.md`). Install copies the framework folder into an instance. Adopting a skill into a host is the vault owner's job.

# forge-primer Skill

The primer layer manual is `_brain-forge/primers.md`: what the kinds are, how composition works, and why a transcluded primer does not copy cleanly out of Obsidian. This skill is the engine that implements it, and the canonical home for the discovery rules below. Read the manual for the model, read here for the mechanics.

Reusable engine for **dynamic primer composition** (default) **and static primer authoring** (`static` mode). This is the single general-purpose "Context Composer" for Brain Forge. In compose mode it replaces the need for per-pattern custom skills by using human-curated `## Primer - Codex - Name` instruction sets (plus Steering and Continuity blocks) to assemble the right context for a given goal. In static mode it authors a new hand-crafted primer file in `primers/` (see **Static Authoring Mode** at the end).

## Role & Purpose

Your job is to transform a user goal + optional references into a ready-to-paste, high-signal primer block without forcing the user (or calling agent) to re-explain foundational material.

You do this by:
- Locating and interpreting the special `## Primer - ` qualified headings (the reliable discovery contract).
- When a codex is supplied or relevant, following its explicit instructions for how to compose.
- Preferring Continuity snapshots for exact conversation resumption.
- Falling back gracefully to static content or synthesis from sources.
- Always emitting clean, dense, attributed output with provenance.

This supports both web AI paste sessions and agentic work while keeping the human layer (wiki, primers) readable and maintainable.

## Terminology

- **Codex** (`## Primer - Codex - Specific Name`): A set of instructions (inside a primer file) that tells you exactly how to dynamically assemble a primer for a recurring pattern or use case. Human-curated.
- **Primer file**: Any `.md` in `primers/` that may contain static context, one or more codex sections, or both.
- **Steering** (`## Primer - Steering` on wiki pages): Topic-specific composition guidance. On wiki, wrapped in `[!ai-instructions]-` callout (for AI directives while keeping the page human-browsable).
- **Continuity** (`## Primer - Continuity` in raw/distill files): High-signal snapshot (decisions, state, constraints, open questions, signals) intended primarily to "continue this exact conversation." Usually plain heading.
- **Static content**: Normal descriptive headings/blocks in primer files (no special `## Primer - Static` prefix needed).

The qualified heading text (e.g. `## Primer - Codex - Harbor Movies`) is the key the composer looks for. Callout wrappers are required only for wiki Steering; plain qualified headings are preferred in primers/ and raw for clean transclusion and readability.

## How to Accept & Process Caller Input

The caller (user or another agent) will typically provide:
- A clear **goal** or description of the desired primer (e.g. "movie recommendations for this weekend respecting house rules").
- Optional explicit references: "using codex Harbor Movies", "from wiki/harbor-movies and the latest raw movie log", "continue from raw/202606/20260604-foo.md", or direct section headers/content.
- Any additional static primer sections or full files they want included.

**Your process**:
1. Parse the goal and any explicit codex / file / header references.
2. Read the referenced content (use available file tools / Obsidian-aware reading).
3. Discover all relevant `## Primer - ` headings in the provided or related material.
4. Apply the rules below (especially any codex instructions).
5. Compose and return the primer.

You may need to read multiple sources (a primer file for its codex + a wiki page for its Steering + a raw file for its Continuity).

## Core Composition Rules (mandatory)

When assembling a primer, follow these rules in order:

1. **Explicit codex reference** (by name e.g. "use codex Harbor Movies", or by the full `## Primer - Codex - Name` header): Locate the matching section and **follow its instructions exactly**. The codex is the authoritative "how to build for this pattern." Example codex instructions might say: "Start with the static Harbor profile, prefer any Continuity block for watched titles and signals, apply the house-rules filter, keep the primer brief."

2. **Relevant wiki page**: If a wiki page is in scope for the goal, check for a `## Primer - Steering` section and apply its guidance (including any guardrails, gravitates, cross-refs to protected logs, etc.).

3. **Raw file reference or Continuity**: When the goal or a codex references a raw/distill file, first look for a `## Primer - Continuity` section. Prefer it if present (it is the high-fidelity resume snapshot). If absent, synthesize the most relevant high-signal context from the full raw file (user perspective, decisions, constraints, open questions). The Continuity block's primary purpose is "continue this exact conversation."

4. **Static primer content**: Use normal static blocks from primer files when no codex section applies to the request, or when the caller explicitly wants the stable/hand-crafted version.

5. **Output quality**: Produce a **clean, dense, attributed primer block** ready to paste. Include lightweight provenance (e.g. "Sources: [[primers/harbor.md#Primer - Codex - Harbor Movies]], [[wiki/harbor-movies#Primer - Steering]], Continuity from [[raw/202606/...]]"). Attribute key guardrails and facts back to their origins.

6. **Respect non-goals and constitution**: Do not pollute wiki pages. Preserve human agency (user decides stable vs. dynamic). Keep the system general — many patterns via codex sections inside existing primer files. Always follow the vault constitution (provenance, prefer existing pages for any synthesis side-effects, human direction overrides, raw immutability, etc.).

If multiple codex or sources conflict, prefer the most specific explicit codex, then the most recent Continuity, then Steering, then static. Surface the choice briefly in provenance when helpful.

## Output Format

Return the composed primer as a single, clearly delineated, copy-paste-ready block (usually starting with frontmatter or role framing if the sources supply it, followed by the dense context).

At the end (or in a small Provenance section), list the key sources and headers used.

Example skeleton the caller can expect:
```
[optional role framing from sources]

[composed high-signal context drawn from Steering / Continuity / codex-driven assembly]

**Provenance (composed via /forge-primer)**  
- Codex: [[primers/harbor.md#Primer - Codex - Harbor Movies]]
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

- Do not pollute wiki pages with dense context blocks — keep them human-readable. Steering lives in the callout on wiki; the qualified name is what matters for discovery.
- Avoid creating large numbers of new files or parallel maintenance surfaces. Codex sections belong inside existing primer files.
- Preserve human agency: the user (or caller) remains in control of what becomes stable vs. dynamically composed. Offer Continuity; do not force it.
- Keep the system general — one composer (this skill) handles many patterns via codex sections rather than custom per-pattern skills.
- Lightweight provenance on every meaningful contribution.
- Raw immutability (except the narrow documented tidy move to `raw/YYYYMM/`); log raw processing only to `raw/_log.md`.
- Human direction always takes precedence.
- Follow the exact qualified header names (`## Primer - Steering`, `## Primer - Continuity`, `## Primer - Codex - Name`) as the discovery contract.

## Examples

**Harbor Movies (matches spec example)**

Caller: "Use codex Harbor Movies for recommendations this weekend."

Composer behavior:
- Locate `## Primer - Codex - Harbor Movies` in the relevant primer file.
- Follow its instructions (start with static profile/guardrails from harbor, prefer Continuity for watched titles + signals, apply values filter, keep brief).
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

Codex and Context Composer: qualified headers (`## Primer - Steering`, `Continuity`, `Codex - Name`), caller input handling, and static authoring mode. Callouts required only on wiki Steering.

Update this file whenever the composition rules or header conventions evolve.

This skill is the living embodiment of the "Context Composer" — keep it general, conservative, and high-leverage.
