---
type: system
signal: false
---

# Primers

The reusable context layer. A primer is prepared context you hand to an AI session so you do not re-explain foundational material every time.

This file is the manual: what the kinds are, how composition works, and where each convention is enforced. `forge-primer` is the engine that implements it. `primers/_index.md` in a vault is the catalog of what that vault actually has.

Install copies this file. It is framework doctrine and update rewrites it.

## Why a layer and not an index

The vault has two layers that serve different readers. `wiki/` stays browsable for a human. Primers give an AI high-signal material without a monolithic dump of the whole vault.

The design is **composition over monolithic indexes**. A primer is assembled from pieces that live where they are maintained, rather than being a second copy that goes stale. A single big index file is the thing this replaces.

## Kinds of primer

| Kind | Where | What it is |
|---|---|---|
| **Surface** | `primers/_system.md`, your adopted constitution | Hand-maintained entry points. Lean, and kept current by you. |
| **Static** | `primers/<name>.md` | Hand-crafted, self-contained, always kept. `signal: true`. |
| **Composition** | `primers/<name>.md` | Assembled by transclusion from wiki and other primers. Living: source edits flow through. |
| **Codex-enabled** | `primers/<name>.md` | Contains one or more `## Primer - Codex - Name` sections, which are instructions the composer follows. May also hold static content. |
| **Personal** | `primers/_me.md`, `primers/_<person>.md` | Your own context. Gitignore them if the vault is versioned. `signal: false`. |

A primer with `signal: true` is catalog-eligible: `forge-signal-check` lints those against `primers/_index.md`. Personal primers carry `signal: false` and stay out of the catalog on that basis alone, which is why the lint needs no assumption about version control.

`primers/_me.md` is the starting point. Most composition examples transclude from it, and until it has something in it the primer layer has nothing to build on.

## The qualified heading contract

Three headings are reserved. `forge-primer` discovers them by exact text, so the name is the contract.

| Heading | Lives on | Wrapper |
|---|---|---|
| `## Primer - Steering` | wiki pages | Required: a `[!ai-instructions]-` callout, so the page stays human-readable |
| `## Primer - Continuity` | raw and distill files | Plain heading preferred |
| `## Primer - Codex - Name` | primer files | Plain heading preferred |

Static content in a primer file needs no prefix. Use ordinary descriptive headings, and name them for how they will read once assembled, because they become context for the receiving AI. `## I am...` and `## my work` tell the AI what a block means; `## Section 2` does not.

Discovery and precedence rules are in `forge-primer`. Do not restate them here.

## Two ways to assemble

**Transclusion**, in Obsidian. Embed named sections with `![[file#Section]]`:

```
![[_me#I am...]]
![[_me#my work]]
![[project-alpha#Primer - Steering]]
```

In Reading view each embed expands inline and the file reads as one assembled prompt.

**The composer**, `forge-primer`. Give it a goal and let it read the sources and produce the block:

```
/forge-primer "continue the migration discussion" from wiki/project-alpha raw/202609/20260901-migration.md
```

### Which one, and the catch with transclusion

Transclusion is the better authoring model: the primer file records *what* goes into the prompt, and the content stays wherever it is maintained.

It is worse at the last step. **You cannot reliably copy a transcluded primer out of Obsidian.** Embeds only expand in Reading view, so selecting from the editor gives you `![[...]]` instead of the content, and selecting from Reading view drags in embed chrome and can silently miss parts of a long or nested embed. Neither gives you clean text to paste into a web AI.

So:

- **Composing for a web AI session**, use `forge-primer`. It reads the same sources and returns a clean, self-contained, attributed block that pastes as-is. This is the main reason the composer exists.
- **Composing for an agent working inside the vault**, transclusion is fine. The agent resolves links itself and never needs the rendered text.
- **A primer you paste often** is worth keeping static and self-contained, accepting the duplication in exchange for it being copyable.

A primer written to be pasted must have no `[[wikilinks]]` in its paste block. They do not resolve outside the vault and read as noise to the receiving AI.

## Rules for good composition

- Put the session's goal and questions at the top of the assembled prompt, above the standing context.
- `## Primer - Steering` on a wiki page is the curated hook. Keep it tight and explicit about intent, not a summary of the page.
- Codex sections hold the instructions for assembling a recurring pattern. They are hand-curated and versioned with the primer file that holds them.
- Continuity blocks are for resuming one specific conversation, not for general synthesis.
- A missing transclusion target renders as an unresolved link and the rest still renders. It fails quietly, so check a composed primer before you rely on it.

## The catalog

`primers/_index.md` is a slim, human-readable list of what this vault has. It is a catalog, not a second copy of the primers. `forge-signal-check` lints it against the vault's `signal: true` primers and proposes additions and removals rather than rewriting it.

## Related

- `_brain-forge/skills/forge-primer/SKILL.md` — the composer, and the canonical discovery rules.
- `_brain-forge/templates/primer.md` — stationery for hand-authoring a primer file.
- `_brain-forge/primers/_system.md` — shipped surface primer for working on the vault's own design.
- `_brain-forge/primers/distill.md` — the distill format, the other shipped primer.
