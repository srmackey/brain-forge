---
name: forge-distill
description: "In-system session distill (forge purview): writes a durable source capture to raw/ when the current agent session is itself the genesis of substantive information from outside the system (repo/tool reviews, web research, novel in-session brainstorms) — keeping wiki/ rebuildable from raw/ and the content portable. In-system producer of the format in primers/distill.md (web AIs are the other producer; forge-ingest consumes both). Trigger on /forge-distill or 'distill this session (to raw)'. Describes only — routing/synthesis decisions stay with the engines. Follows the vault constitution; human direction overrides."
argument-hint: "[optional: topic focus or target filename slug]"
---

> Product core (`_brain-forge/skills/forge-distill/SKILL.md`). Install copies the framework folder into an instance. Adopting a skill into a host is the vault owner's job.

# forge-distill Skill

The forge purview's **in-system source-capture hands**: when an agent session working *inside* the system is itself the genesis of information from *outside* the system, this skill persists a faithful distill of that session to the immutable `raw/` layer **before** (or alongside) any wiki synthesis — so `wiki/` remains what the system *creates from* `raw/` source files, rebuildable and portable, never the only home of externally-sourced content.

**One format, two producers, one consumer.** The distill format is **single-sourced in `primers/distill.md`**. This skill is the in-system producer of that format; a web AI pasting the same file is the other producer; `forge-ingest` is the consumer for both. Do not restate the format here — read the template and apply the in-system adaptations below. **Named coupling:** any format change must land in `primers/distill.md` and be honored here (and vice versa).

## When to run (and when not)

- **Run** when the session introduced **substantive external-genesis material**: reviews of external repos/tools/articles, web research, reference facts pulled from outside, or in-session brainstorms that produced novel content worth synthesizing — anything where the wiki write would otherwise be the *only* durable record of the source material.
- **Run on explicit signal**: `/forge-distill`, "distill this session", "save a source record of this".
- **Do not run** for small insights *derived from existing vault material* — those may be written to the wiki with session provenance (the vault constitution). Not for session-state snapshots (resumption notes). This skill is source distillation.
- When about to file back substantive external-genesis material without a raw source, **stop and run this first** (or propose it if the situation is borderline).

## Producer boundary (describe, never decide)

This is a **capture surface**. It describes the session faithfully; it never picks wiki homes. The `Routing Hints` / `layers:` block stays descriptive — `forge-ingest` and `forge-synthesis-engine` own the destination decisions at ingest time. Never copy classification logic here (canonical: `_brain-forge/schema.md` "Producer Boundary (Describe vs. Decide)").

## Core flow

### Step 1 — Scope
Identify the external-genesis material in the session (a single topic, or several distinct topics → the template's multi-topic form). If invoked with an argument, honor the given focus/slug.

### Step 2 — Compose (per `primers/distill.md`)
Apply `primers/distill.md` in full: user-perspective priority, faithfulness (no invented detail), neutral register on the user, epistemic tagging (`decided` vs. `discussed` vs. `(AI-suggested, unvalidated)`), ideation attribution, the **Thought Direction (Steering Trace)** section with a blunt steering read, and the never-omitted **Risks & Unexamined Assumptions**. Omit sections that would be empty or forced.

**In-system adaptations** (the only deltas from `primers/distill.md`):
1. **No code-block wrapper** — write the file directly; content starts with the `---` frontmatter.
2. **Destination:** `raw/YYYYMM/YYYYMMDD-<slug>-distill.md` (current year-month subfolder; create it if absent). This is a *new file* in `raw/` — never a modification of anything existing there.
3. **Real-date discipline:** `date:` and the filename date come from the environment's real current date, never inferred from content.
4. **Source field:** `source: "In-system <agent/surface> (<mode>) session — <human-readable date>"`.
5. **Reference payload:** when the genesis material is reference facts (a tool, a comparison, research findings), include a dedicated `## Reference — <topic>` section complete enough that the wiki entry could be **rebuilt from this file alone**, with the facts' origin and retrieval date noted. This is the point of the capture — don't thin it to a summary of the wiki entry.
6. **Continuity block:** offer per the template's smart-offer rules when real resumption signal exists.

### Step 3 — Hand off to ingest
The distill is source material like any other capture. Either (a) proceed directly into `/forge-ingest` for this file in the same session (typical when the user asked for wiki records), or (b) leave it for the next ingest pass — state which. If wiki entries were already written this session (retrofit case), fix their provenance to point at this file and record the ingest in `raw/_log.md` as usual.

### Step 4 — Eval log (if the instance keeps one)
If the instance keeps an eval log for this skill, append a performance entry after core work.

## Non-negotiables

- `raw/` immutability: this skill only ever *adds* a new capture file (and its `raw/_log.md` ingest record downstream).
- Faithfulness over polish: the distill records what happened, including AI-led turns and unresolved threads. Never neutralize the steering trace to look better.
- No self-routing: destination decisions belong to the engines at ingest.
- Human direction overrides everything here.

## Related
- `primers/distill.md` — the format (web producer and this skill share it).
- `_brain-forge/skills/forge-ingest/SKILL.md` — consumer.
- `_brain-forge/schema.md` — producer boundary.

**Provenance:** Created 2026-07-15 to persist a source file for in-system sessions whose material came from outside the vault.
