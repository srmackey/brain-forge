---
type: system
signal: false
---

# Distill format

The capture format for AI-session distills. Two producers, one consumer: a web AI pastes this file and emits `raw/` notes; `forge-distill` is the in-system producer of the same format; `forge-ingest` consumes both.

> **Framework file.** Install placed this copy here so you would find it beside your own primers. It is yours now: edit it freely, and nothing will overwrite it. The framework source is `_brain-forge/primers/distill.md`, and `vault-update` tells you when that source moves ahead of this copy so you can decide what to take.

When pasting into a web AI, the rules below are the whole instruction.

## Core Rules

- **Use the full conversation** as source material.
- **Prioritize the user's perspective**: what *the user* asked, stated, preferred, rejected, or decided. Down-weight AI suggestions unless the user engaged with or built on them.
- **Stay faithful**: quote or closely paraphrase only what was actually said. Never invent details or add outside knowledge. If something is unclear, note it briefly or omit it.
- **Neutral register on the user**: describe, never appraise. No competence or persona framing ("deep expertise", "impressive system") — this note feeds later AI context, and flattering frames compound downstream. The user's role and skills appear only as plain facts when they bear on the content.
- **Tag epistemic status**: distinguish what the user *decided* from what was merely *discussed*. Mark AI-originated recommendations the user did not explicitly adopt as `(AI-suggested, unvalidated)` — especially numbers: prices, hours, estimates, timelines. A distill must never promote a suggestion into a conclusion; when in doubt, it stays a suggestion.
- **Attribute ideation**: for every significant idea, question, or direction-change, note its origin — the user introduced it, the AI proposed it and the user adopted or extended it, or the AI proposed it and the user let it pass. Record *how* the user engaged, not just that they did ("embraced and extended", "accepted without pushback", "redirected it toward X"). This is the raw data for auditing whether the user is steering the session or being steered.
- **Concise but complete**: capture the essence, skip filler.
- **Preserve voice, don't sterilize**: keep a few high-signal lines in the user's own words (verbatim) rather than flattening everything into neutral paraphrase. Lean is not sterile — keep the texture that makes the note feel alive; cut only filler, not character.
- **Output (web producer)**: wrap everything in one triple-backtick markdown code block. No text before or after it. The content starts with `---`. The in-system producer (`forge-distill`) writes a file instead and skips the wrapper.

## Output Format (Default Structure)

For a single-topic conversation, produce **one note** following this structure. The structure serves the signal, not the reverse: **omit any section that would be empty or forced** — a real, lean note beats a complete-looking skeleton. (One deliberate exception: **Risks & Unexamined Assumptions** is never omitted — "empty" is itself the finding.) Keep the headers you actually use, in this order:

```markdown
---
type: raw
date: YYYY-MM-DD
source: "[AI tool] conversation — [full date, e.g. June 7, 2026]"
---
# [Descriptive title — 40-70 chars, noun-phrase style, works as a filename]

## One-Line Summary
One crisp sentence capturing the core purpose or outcome from the user's point of view.

## Core Topic & Context
1-2 sentences: why this conversation happened and what the user was working on or deciding.

## My Key Questions
- The significant questions the user explicitly asked. Concise paraphrases that preserve intent and specifics.

## Thought Direction (Steering Trace)
A short chronological trace of the session's turning points — 3–7 turns, no more:
- **[user | AI→adopted | AI→passed]** what changed direction and why it mattered.
Open with what the user walked in asking or believing. End with a one-line steering read: "This session was predominantly user-led / AI-led / mixed" — grounded in the turns listed, not vibes.

## Options / Ideas Discussed
- **Option/Idea**: what was proposed, with key pros, cons, trade-offs, or the user's reaction. Omit if nothing was really weighed.

## My Preferences & Feedback
- What the user liked, disliked, pushed back on, decided, or committed to ("I will...").

## Key Insights & Takeaways
- The most valuable realizations or principles that emerged, especially ones the user restated or valued.

## Risks & Unexamined Assumptions
- What the conversation took on faith: assumptions never stress-tested, counterarguments never raised, costs or risks never priced. If the session contained no challenge or dissent at all, say so in one line ("No assumptions were challenged in this session.") — the absence must be visible signal, not silent rosiness.

## Action Items / Next Steps
- [ ] Concrete next steps, experiments, or follow-ups the user committed to. Real checkboxes, no fabrication.

## Suggested Connections
- [[Related Note or Topic]] — only genuinely relevant notes or concepts the user referenced. Omit if none fit. Never force a connection.

## Routing Hints
suggested-title: [a tighter, synthesis-ready title for the maintainer]
layers: [one or more of: durable-reasoning, reference, system-intent — the signal type(s) this topic carries; see Signal Layers below]
[Add `#todo` on its own line if Action Items exist; `#revisit` if anything was left unresolved.]
```

## Signal Layers (Routing Hint)

The `layers:` field in Routing Hints **describes** what kind(s) of signal a topic carries. It is a *descriptive tag, not a routing instruction*: faithfully name the signal type(s); the vault's synthesis engine — which alone sees the live vault — **decides** the actual destination page. Never try to pick the wiki home yourself.

Tag each topic with one or more of (high-level guidance, not a rigid checklist):

- **`durable-reasoning`** — the evolution of the user's *thinking or approach*: decisions, reasoning, direction-changes, and principles worth preserving even after the specifics age out.
- **`reference`** — topical or tool reference: facts, how-tos, comparisons, catalog-style material useful for later lookup.
- **`system-intent`** — a capability, change, or outcome the user liked and wants in the vault system itself. Capture it faithfully like any other topic and tag the layer.

A topic often carries more than one layer (e.g. `layers: durable-reasoning, system-intent`). Omit the field only if no layer genuinely applies.

## Multi-Topic Conversations

When the conversation contains **2 or more distinct, self-contained topics**:

1. Identify the topic boundaries.
2. Produce a **separate, complete note** per topic, each in the format above, with a specific descriptive title.
3. In **each note's Suggested Connections**, link the sibling notes from this same distillation.
4. For **3 or more topics**, optionally lead with a short **Hub Note** (same format) listing each topic note with a one-line summary and `[[ ]]` link.

Place all notes in the **same single markdown code block** (web producer), separated by `---` dividers, so the whole set copies in one action. The in-system producer writes one file per topic instead.

If any of the topics warrant a Continuity block, offer the `## Primer - Continuity` section(s) at the end of the relevant note(s) or as a clearly separated final block.

## Continuity Block (Smart Offer)

In addition to the standard raw capture note(s) above, consider whether the conversation contains high-value, reusable signals worth preserving for future resumption. These include:

- Key decisions or commitments the user made.
- Current state, constraints, open questions, or active threads the user will want to continue.
- Strong preferences, like/dislike signals, or guardrails that emerged.
- Tone, priorities, or context that would be expensive to re-explain.

**If such signals are clearly present**, after (or alongside) the normal raw note(s), offer a `## Primer - Continuity` block.

Format for the offer (plain heading, easy for the user to keep or delete):

```
## Primer - Continuity
[Concise, user's-voice summary of the key state, decisions, constraints, open questions, and signals that would let someone (or another AI) quickly resume *this exact conversation*.]

User: include this block when pasting the raw note if you want to support easy resumption of this thread. Delete it if not needed.
```

The Continuity block's **primary purpose** is to support "continue this exact conversation later." It is not a full synthesis. It is a high-signal **snapshot** for primer composition and for the user.

Where the raw note above is a *distillation* (the durable residue, neutral in tone), the Continuity block is a *freeze-frame*: it may keep the live momentum, open tension, and the user's voice — exactly the texture resumption needs and that distillation deliberately boils off. Web distill and `forge-distill` both use `## Primer - Continuity` so either can feed primer composition.

## Quality Notes

- **Title**: evocative yet precise (e.g. "Frictionless Capture Design Principles", "Compare Two Note-Taking Tools").
- **Tags**: use `#todo` / `#revisit` only when genuinely warranted, placed in Routing Hints.
- **Date**: session start date for `date:`; for `source:`, a quoted string with the AI tool and human-readable date.
- **Tone**: faithful to the user's viewpoint — records what happened, not advice or outside summary. Faithful is not the same as sterile: preserve the user's wording and the texture of the thinking where it carries signal; just never editorialize or add outside knowledge.
- **Confidence**: the decided / discussed / AI-suggested distinction is load-bearing — downstream synthesis will treat untagged claims as settled. Numbers without a tag read as decisions.
- **Steering honesty**: the steering read must be blunt. A session where the AI originated the core model and the user nodded along should say exactly that — that is the most valuable line the note can contain. Never soften it to protect the record.
- **Short chats**: still produce a minimal valid note.
- **Continuity**: only offer when there is real reusable signal; keep it terse and resumption-focused. The block lives under the plain `## Primer - Continuity` heading.
