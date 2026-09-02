---
type: primer
signal: true
status: active
---

# Vault design primer

framework: 0.1.6

> Paste this into a web AI when you want to think about your own vault's design: its structure, conventions, operating model, primers, and workflows. It describes how a Brain Forge vault works so you do not have to explain it first.

Lead with your own context from `primers/_me.md`, then this file, then your question. `/forge-primer` will assemble all three into one clean block if you would rather not paste by hand.

---

## Stance for this session

Treat the vault's design as living architecture, open to critique, extension, and first-principles rework. There is no special mode to switch on.

- Reason from fundamentals first. Derive the goals and constraints rather than reaching for a familiar pattern.
- Then consult the wider field. Surface relevant approaches from other PKM and second-brain systems, and steelman the useful ones. If something valuable comes from there, give options and tradeoffs informed by it. Otherwise stay on the first-principles work.
- Keep the scopes apart: general second-brain ideas, this particular vault, and the history of how it got here are three different conversations.

I drive direction. You accelerate thinking and surface possibilities. I decide what changes.

## The model

Two layers. `raw/` is an immutable capture layer, a low-friction drop zone where material lands with almost no processing and is never edited afterward. `wiki/` is the synthesis layer an AI maintains, with a strong preference for updating an existing page over creating a new one.

Because `wiki/` is built from `raw/`, it stays rebuildable. Externally sourced material goes to `raw/` first so the wiki is never the only record of it.

A knowledge graph is built over both layers, and it maps the corpus rather than what the vault knows. It indexes captures nobody has judged and claims the wiki would have marked unvalidated, with nothing separating them from settled synthesis. A graph result is a pointer into the corpus, not a claim the vault holds; the wiki page is where a contribution says whose idea it was and whether anyone agreed with it.

Three purviews divide responsibility. **forge** turns arrivals into a corpus: ingest, synthesis, the wiki. **vault** keeps the substrate honest: graph rebuilds, link integrity, structural plumbing. **brain** is the interaction layer where retrieval, query, and analysis happen, and it is the boundary an outside agent operates in, denied the other two.

A capability matrix governs what each purview may write in each folder. It lives in the vault and is deliberately not in this primer, which stays lean.

`primers/` is the reusable context layer, and one of the highest-leverage parts of the system. Composition beats monolithic indexes.

## Principles that shape design decisions

- Frictionless capture is the highest priority. Anything that adds friction to getting material in is suspect.
- Human direction always overrides autonomous behavior.
- Provenance on every contribution. A wiki claim should trace to its source.
- Preserve the user's voice. Integrate, quote, or summarize with attribution, never rewrite their prose.
- Real dates only. Never infer a date from a filename or from surrounding content.
- Integration over proliferation. Prefer a broad page with sections, and break a section out only once it has earned its own page.
- Every rule consulted by more than one tool lives in exactly one canonical home. Everything else carries a pointer.
- The system is meant to improve itself, including its own instructions.

## Working in this session

- Think at the level of the operating model, the conventions, primer design, and long-term leverage. Not individual notes.
- Surface tensions, alternatives, and first-principles options rather than settling early.
- When we land on something worth keeping, a principle, a design option, a convention change, present it cleanly with enough context that it can be integrated later without reconstructing this conversation.
- **Dates.** You do not know today's date in a web session, and vault content will mislead you: filenames and frontmatter are historical, and inferring from them drifts forward. Ask me for the date, or leave a placeholder. Never guess.
