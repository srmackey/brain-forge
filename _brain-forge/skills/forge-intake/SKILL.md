---
name: forge-intake
description: "Files links and saved notes as working cards in cards/. Checks the working pile and cards/_removed.md once per run, files the new ones, reports an exact repeat, and waits on a strong similarity. Does not walk raw/ and does not write the wiki. Use for /forge-intake, a URL list, or a markdown file of saved things the owner wants as cards. Follows the vault constitution; human direction overrides."
argument-hint: "[urls, or a path to one markdown file]"
---

> Product core (`_brain-forge/skills/forge-intake/SKILL.md`). Install copies the framework folder into an instance. Adopting a skill into a host is the vault owner's job.

# forge-intake Skill

The forge purview's hands for the working pile. A card is not a capture and not a wiki page. This skill writes `cards/`. It does not call `forge-ingest` and it does not write `wiki/`.

The match rule is `_brain-forge/schema.md` Working cards, section Match. Apply that section. Do not restate it.

## When to run

- **Run** on `/forge-intake`, "file these links", "make cards from this", or when the owner hands a URL list or one markdown file of saved things.
- **Do not run** for material that belongs in the vault as knowledge. That is distill, then ingest. A card they already decided to keep on the pile stays a card.
- A URL the owner told you to leave out is skipped. Leave its source file in place.

## Core flow

### Step 1 — Gather candidates

One invocation is one batch.

- Arguments that are URLs are candidates. Words the owner said with a URL are that candidate's words.
- One markdown file with `url:` in frontmatter is one candidate. The body is the words. A frontmatter `title` is the fallback title. `tags` and `kind` are tag hints.
- Otherwise each URL in the file is a candidate. The line or bullet that holds the URL is the words, with the URL taken out.

Do not invent an opinion. Empty words stay empty.

### Step 2 — Load the comparison set once

Read every working card in `cards/`. Skip `cards/_removed.md` and everything under `cards/_images/`. Read `cards/_removed.md` if it exists. A missing list means nothing has been removed. Do not walk `raw/`. Do not rebuild the list on an ordinary run.

### Step 3 — Match, then fetch

For each candidate, apply schema Match against the set loaded in Step 2.

- **Exact.** Do not fetch. Do not write a card. Report the title, the state, and the path. When the match is a removed card, open that one file and include the reason.
- **Strong.** Do not fetch further and do not write a card. Report the title, the url, the state, what overlapped, and the reason from that one file. This candidate waits.
- **None.** Fetch the URL. Write a title, a one or two sentence summary, and save one image under `cards/_images/` when the page offers an icon or a preview. A failed fetch still gets a card: use the owner's title when there is one, otherwise the URL, leave `summary` and `image` empty, and say the fetch failed.

Also compare a fetched title against the loaded set before writing. A title that schema calls strong waits, and that card is not written.

### Step 4 — Write the card

One markdown file in `cards/`, from `_brain-forge/templates/card.md`.

- `type: card`, `signal: false`, `state: open`.
- `title` from the page, or the fallback. The filename is a slug of the title. If that file already exists and Step 3 did not match it, append `-2`.
- `url` when there is one. `summary` from the fetch. `saved` is the real date of this run.
- `image` is the path under `cards/_images/`, or empty.
- `tags` start from the file's hints. Add a suggestion from the page only when it is obvious, and name it as a suggestion in the report.
- `direction` stays empty unless the owner's words name one.
- The body is the owner's words and nothing else.

Create `cards/` and `cards/_images/` when the first file needs them.

### Step 5 — The intake file

Delete an intake file only when every candidate from it was filed or was an exact match. A waiting candidate leaves the file in place. Do not write that deletion into `raw/_log.md`. Do not delete a file the owner did not hand to this run.

### Step 6 — Report

Three groups, in this order: waiting, exact, filed. Each waiting or exact line names the earlier card. Each filed line names the new path and whether the fetch failed. Tag suggestions are marked as suggestions.

### Step 7 — Eval log

Append one entry to `_brain-forge/eval.md`. Shape and charter are in `_brain-forge/schema.md`, Eval log. Counts only. Do not copy titles, URLs, or the owner's words into the log.

## Non-negotiables

- Schema Match is the rule. A same host, or one shared ordinary word, is not reported.
- Load the comparison set once. Open a single removed file only to show a match. Never walk `raw/` on an ordinary run.
- A failed fetch still files a card.
- Do not synthesize, and do not turn a card into a capture.
- Human direction overrides everything here. A second card after an exact match requires the owner to say so.

## Related

- `_brain-forge/schema.md` — Working cards, the file, and Match.
- `_brain-forge/templates/card.md` — the file this skill writes.
- `_brain-forge/skills/forge-ingest/SKILL.md` — not this path. A removed card is already logged there so it is not synthesized.

**Provenance:** Added 2026-11-04 so a link can become a card without a pass over `raw/`.
