---
type: primer
signal: false
status: active
generated: YYYY-MM-DD
last-updated: YYYY-MM-DD
---

<!--
  PRIMER FILE — AI session primer.

  KINDS
  Surface primers  → AGENTS.md, primers/_system.md (lean System Ideation Primer for web system ideation) (hand-maintained)
  Static primers   → primers/<name>.md (hand-crafted, always kept)
  Domain primers   → ephemeral by default; saved here only when user explicitly requests it
                     (add `domain: <slug>` to frontmatter when saved)

  COMPOSITION
  Pull named sections from other primers using Obsidian transclusion:

      ![[_me#I am...]]
      ![[_me#my work]]
      ![[_person#about [name]]]

  In Reading View, each embed expands inline. The full file becomes
  one assembled prompt to copy into any web AI session.

  SECTION NAMING
  Use natural-language headings — they appear in the assembled output
  and give the AI context about what each block means:

      ## I am...            personal identity
      ## my work            professional context
      ## about [name]       person-specific context
      ## current focus      session goal or active thread
      ## current state      snapshot of a domain or project

  Sections can be anything. Name them for how they'll read when assembled.

  CODEX SYSTEM (qualified headers for the Context Composer /forge-primer)
  The Codex system (see grok_report.pdf and _system/primers.md) standardizes a few
  special qualified headings so the composer can discover and act on them reliably:

      ## Primer - Steering           (on wiki pages — usually inside a
                                     [!ai-instructions]- callout so the page
                                     stays human-readable while the AI gets
                                     the directive guidance)
      ## Primer - Continuity         (in raw/distill files — plain heading
                                     preferred; high-signal snapshot whose
                                     primary purpose is "continue this exact
                                     conversation")
      ## Primer - Codex - Name       (inside primer files — plain heading
                                     preferred for easy transclusion. Contains
                                     instructions the composer follows for
                                     dynamic assembly of that pattern.
                                     Multiple codex sections can coexist with
                                     static content in one file.)

  The qualified name (the text after `## Primer - `) is the important contract.
  Callout wrappers are required for wiki Steering (to protect the human layer);
  elsewhere plain qualified headings are preferred for clean Obsidian transclusion
  (`![[file#Primer - Codex - Harbor Movies]]`) and readability.

  Static content continues to use ordinary descriptive headings (no special
  `## Primer - Static` prefix is needed).

  SIGNAL FIELD
  Active saved primers (surface, static, domain) get `signal: true`.
  Personal primers (_me.md, _[person].md) and superseded primers get `signal: false`.
  Ephemeral primers are not persisted.

  WIKILINKS
  Avoid [[wikilinks]] in the body — they don't resolve outside Obsidian.
  Use plain file paths or plain text when this primer will be pasted into
  a web AI session.
-->

# [Primer Title]

[Optional: one-line description of what this primer is for]

---

## [Section name]



## [Section name]



## [Section name]


