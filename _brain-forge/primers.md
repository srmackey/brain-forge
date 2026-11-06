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
| **Codex** | a wiki page, or a primer file | One or more `## Codex - Name` headings. Instructions the composer follows. The rest of the page stays human prose. |
| **Personal** | `primers/_me.md`, `primers/_<person>.md` | Your own context. Gitignore them if the vault is versioned. `signal: false`. |

A primer with `signal: true` is catalog-eligible: `forge-signal-check` lints those against `primers/_index.md`. Personal primers carry `signal: false` and stay out of the catalog on that basis alone, which is why the lint needs no assumption about version control.

`primers/_me.md` is the starting point. `/forge-primer` reads the headings you name. Until that file has something in it, the primer layer has nothing to build on.

## The qualified heading contract

Three headings are reserved. `forge-primer` discovers them by exact text, so the name is the contract.

| Heading | Lives on | Wrapper |
|---|---|---|
| `## Primer - Steering` | wiki pages | Required: a `[!ai-instructions]-` callout, so the page stays human-readable |
| `## Primer - Continuity` | raw and distill files | Plain heading |
| `## Codex - Name` | a wiki page, or a primer file | Plain heading. Not a callout. |

On a wiki page the `Codex - ` mark is required, because the page mixes human sections and instructions. A primer file uses the mark when one heading should be pulled by name. `## Primer - Codex - Name` does not match until it is retitled.

A path with a heading includes that section: from the heading through the line before the next heading with the same number of hashes or fewer. A deeper heading stays inside the section. The heading text is the words after the hashes. The same read is in `_brain-forge/schema.md` for a brief that includes one.

A missing heading stops the run. The skill does not write the compiled block back into the heading. It does not follow a transclusion. It does not read `cards/`.

Static content in a primer file needs no prefix. Use ordinary descriptive headings, and name them for how they will read once assembled, because they become context for the receiving AI. `## I am...` and `## my work` tell the AI what a block means. `## Section 2` does not.

Discovery and precedence rules are in `forge-primer`. Do not restate them here.

## How a primer is assembled

`forge-primer` reads the Codex heading the caller names, plus the Steering and Continuity those instructions point at, and returns one block.

```
/forge-primer "continue the migration discussion" from wiki/project-alpha raw/202609/20260901-migration.md
```

A card brief may include the same Codex heading. That include is instruction text. It does not add the wiki page, and it does not add cards. `forge-card-primer` is that path. The query and the fields stay on the brief.

A primer written to be pasted has no `[[wikilinks]]` in its paste block. They do not resolve outside the vault.

## Rules for good composition

- Put the session's goal and questions at the top of the assembled prompt, above the standing context.
- `## Primer - Steering` on a wiki page is the curated hook. Keep it tight and explicit about intent, not a summary of the page.
- A Codex heading is an instruction. It is not page prose, and it is not a saved primer.
- Continuity blocks are for resuming one specific conversation, not for general synthesis.
- A missing heading stops the run.

## The catalog

`primers/_index.md` is a slim, human-readable list of what this vault has. It is a catalog, not a second copy of the primers. `forge-signal-check` lints it against the vault's `signal: true` primers and proposes additions and removals rather than rewriting it.

## Related

- `_brain-forge/skills/forge-primer/SKILL.md` — the composer, and the canonical discovery rules.
- `_brain-forge/templates/primer.md` — stationery for hand-authoring a primer file.
- `_brain-forge/primers/_system.md` — shipped surface primer for working on the vault's own design.
- `_brain-forge/primers/distill.md` — the distill format, the other shipped primer.
