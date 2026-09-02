---
type: journal
signal: false
date: {{date:YYYY-MM-DD}}
---

# Daily Note: {{date:YYYY-MM-DD}}

> [[wiki/_index]] • [[raw/_log]]

## Morning Prime (5 min)

**Carrying forward from yesterday:**
-

**Top 3 Focus Areas Today:**
1.
2.
3.

## Captures Today

*(Paste AI session output or quick notes here — file lands in `raw/` via QuickAdd)*
-

## Evening Close (5 min)

**Key Decisions / Outcomes:**
-

**Parking Lot Updates:**
-

**What I Learned / Synthesized:**
-

**Raw/ processed?** Yes / No — items remaining: ___

## Recent Context (auto)

```dataview
LIST FROM "raw" OR "wiki"
WHERE file.mtime >= date(this.file.day) - dur(7 days)
SORT file.mtime DESC
LIMIT 10
```
