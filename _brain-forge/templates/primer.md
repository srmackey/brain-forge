---
type: primer
signal: true
status: active
created: {{date:YYYY-MM-DD}}
last-updated: {{date:YYYY-MM-DD}}
---

<!--
  NEW PRIMER — stationery for hand-authoring one.

  This template is for writing a primer yourself. `/forge-primer static`
  authors one for you and follows the same shape.

  For what primers are, the kinds, how composition works, and the
  reserved headings, read `_brain-forge/primers.md`. That file is the
  manual; this one is just the blank page.

  FRONTMATTER
  `signal: true` for a primer you intend to keep and want in the graph.
  Set it to `false` for a personal primer (`_me.md`, `_<person>.md`),
  which also wants gitignoring if the vault is versioned.

  SECTION NAMES
  Headings travel with the content into an assembled prompt, so name them
  for what they tell the receiving AI. `## I am...`, `## current state`,
  `## house rules`. Not `## Section 2`.

  RESERVED HEADINGS
  Three heading names are a discovery contract and mean something specific
  to `/forge-primer`. Use them only for what they are:

      ## Codex - <Name>            an instruction. On a wiki page, or in
                                   this file when one heading is pulled by
                                   name. Plain. Not a callout.
      ## Primer - Steering         composition guidance, on a wiki page,
                                   wrapped in an [!ai-instructions]- callout
      ## Primer - Continuity       a resume-this-conversation snapshot,
                                   in a raw or distill file

  Ordinary static content needs no prefix. `## Primer - Codex - <Name>`
  does not match.

  IF THIS PRIMER IS MEANT TO BE PASTED
  Keep the paste block self-contained. No `[[wikilinks]]`. They do not
  resolve outside the vault. Compose with `/forge-primer` when you want
  assembled sources in pasteable form.

  Delete this comment when you are done.
-->

# [Primer title]

[One line on what this primer is for and when to reach for it.]

## When to use

[The situation that should make you paste this.]

## [Section name]



## [Section name]



## Provenance

[Where this came from, and anything it should be kept in sync with.]
