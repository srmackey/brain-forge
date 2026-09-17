---
id: methodology/capture-types
title: Brain Forge capture types
description: Types a sending chair may stamp on a raw capture, and what to put in the file. Not ingest. Not the door.
tags: [methodology, brain-forge]
---

# Brain Forge capture types

Types a chair may stamp when handing a durable artifact to a Brain Forge vault, and what to put in the file. Not the ingest rules. Not where the file is written.

The door (which path, when to write it, when to go through a post office instead) is a composition article on the chair that holds the vault. This article is the sending half of the stamp.

## Stamp

One file, named `YYYYMMDD-slug.md`. Frontmatter:

```
type: <from the table>
signal: false
date: YYYY-MM-DD
source: "<this chair's map name> handoff, YYYY-MM-DD"
```

`source` is free text and is read as provenance. Write the descriptive form rather than a bare keyword.

Then the body the row names. Write it for a reader who does not have this chair's context. Not a dump of the chair, and not a bare path the vault cannot follow.

You do not choose where it lands in the corpus, how it is synthesized, or what it links to. Those are ingest's calls. A destination named inside the artifact is a request. Optional association wikilinks (`about`, `precedes`, `supersedes`, `produced`) are requests too.

Pick `type` from the table before you write. Match what they meant. The more specific row wins. If nothing matches, `raw`. Do not invent a type that is not a row.

## Table

| They meant | type | Sender writes |
|---|---|---|
| A durable artifact, no more specific type named. Keep this, put this in the vault, a paper, a source. | `raw` | The artifact: what it is, why it is worth keeping, a pointer home. |
| Capture this as an idea. Idea capture. | `idea` | What they were going for, in their voice. Optional `about` / `precedes` / `supersedes` / `produced` as wikilinks or paths that survive outside this chair. Do not write a wiki page. Do not ingest from this chair. |

The vault's schema is the home of what a type means at ingest. This table is the sending half. When the product ships a type that other chairs will drop, add a row here in that same sitting, or in the first sitting that needs to send it. Do not copy ingest, finder, or wiki rules into this table. A type that only exists for work inside the vault does not get a row.

Reason: a sending chair does not load the vault constitution. It needs a stamp and a body shape. Ingest still has one home, so the two stay in sync by adding a sender row when a sendable type ships, not by duplicating the schema.

**Class: single-system.** Groups with Brain Forge.

Relation to the door article: that article says where a capture is written and when a post office hop is required. This one says what the file contains. Never both copies of the table.
