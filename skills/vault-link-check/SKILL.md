---
name: vault-link-check
description: "Vault-wide link integrity engine (vault purview). Resolves every wikilink and markdown link against the real file tree — a filesystem check, not a graph check (Graphify cannot see dangling links). Auto-repairs unambiguous rename/move drift (exactly one clear target: raw/YYYYMM/ relocation, YYYY-MM-DD→YYYYMMDD, separator changes); surfaces dead links (no target) and ambiguous ones (multiple candidates) for human decision. Never auto-creates or auto-deletes files. Scope defaults to the whole vault; accepts a folder or path scope (e.g. wiki/). Write permission is governed by the folder × purview capability matrix in templates/schema.md + the confidence gate. forge-signal-check delegates its wiki/ link step here. Invoke for /vault-link-check or any 'check/repair broken links' request."
argument-hint: "[optional: scope — 'all' (whole vault, default) | a folder like wiki/ | a specific page path]"
---

> Product core (`skills/vault-link-check/SKILL.md`). Install copies this file into an instance. Host exposure is the instance operator's job.

# vault-link-check Skill

The **vault purview's** link-integrity engine. This is the single, canonical home for link resolution and drift repair across Brain Forge. Other tools delegate here rather than duplicating the logic (notably `/forge-signal-check`, which calls this scoped to `wiki/`).

## Why this is a filesystem check, not a graph check

Graphify only draws edges between nodes that **already exist**, so a wikilink to a missing file is *invisible* in the graph. Link integrity must therefore be resolved against the **actual file tree**, never inferred from graph output. A broken link is not cosmetic: the instant a human clicks it in Obsidian, an empty **phantom file** is created at that path — silently corrupting the vault. Catching these is high-value.

## Scope

- **Default:** the whole vault (all link-bearing `.md` files).
- **Scoped:** a folder or path passed by the caller — e.g. `wiki/` (how `/forge-signal-check` invokes this), `primers/`, or a single page. Resolve only links *on* the in-scope pages, but resolve them against the **entire** file tree (a target may live anywhere).

## Algorithm

1. **Inventory the real file tree.** Build the set of actual files (paths + basenames) so targets can be resolved. Obsidian resolves `[[basename]]` to a unique file by basename, and `[[path/to/file]]` / `[[folder/file#section]]` by path. Account for both. **The trailing `.md` extension is optional in a link:** `[[foo.md]]`, `[[foo.md#sec]]`, and `[[folder/foo.md]]` resolve identically to their extension-less forms — strip a trailing `.md` from the target before matching so an explicitly-extensioned link is not misreported as dead (a real false-positive source: an implementation that keys the basename index without the extension will fail to match `[[_me.md]]` against `_me`).
2. **Extract links from in-scope pages.** Wikilinks `[[...]]` (including `[[target|alias]]` and `[[target#section]]`) and markdown links `[text](path)` to vault files. **Ignore links inside inline code / fenced code blocks** — backticked text like `` `domains/x` `` is inert plain text by design and must not be "repaired."
3. **Resolve each link** against the inventory.
4. **Classify** every unresolved link (next section) and act per the **write-permission rules** below. On broad scans, unresolved links in **frozen surfaces** (see "Frozen surfaces" below) are tallied but **not enumerated**.

## Classification

- **Auto-repair (low-risk):** exactly **one** existing file is the clear target after normalizing known drift:
  - relocation into a `raw/YYYYMM/` dated subfolder (the most common breakage — older captures linked under flat `raw/YYYY-MM-DD--name.md` paths),
  - `YYYY-MM-DD` → `YYYYMMDD` filename date format,
  - separator changes (`--` → `-`),
  - a file/skill/command rename where exactly one new file clearly supersedes the old basename.
  Repoint the link to the resolved target. Stamp `last-updated:` on regular pages when a link is changed.
- **Surface only (judgment — never write):**
  - **Dead:** no existing target (e.g. a deliberately deleted legacy page — `domains/*`, `synthesis/*`, `matrix/*`). Report it with a best-guess action (repoint / un-link to plain text / leave); the human decides.
  - **Ambiguous:** multiple candidate targets. Report all candidates; the human chooses.
- **Never auto-create or auto-delete files.** Phantom-file prevention is the whole point — do not create a target to satisfy a link.

## Write-permission rules (capability matrix + confidence gate)

Whether a repair is **applied** vs **proposed** vs **report-only** is governed by the **folder × purview capability matrix** in `templates/schema.md` (the **vault** column) for the *target page's* folder, ratcheted tighter by any `ai-behavior` protection on the file. The confidence gate operates **inside** what the matrix permits (matrix = "may I write here?"; confidence = "auto or surface?" — auto only on an unambiguous single target).

In practice, for the vault purview:
- **wiki/ · primers/ · _system/ · focus/** — `auto*`: auto-repair unambiguous drift on **unprotected** files; **propose** on `ai-behavior`-protected files (append-only logs, historical-evolution, park, etc.).
- **journal/** — `propose`: never auto-write; propose repairs.
- **raw/ · archive/** — `flag-only`: **report only, never write** (raw is immutable except the documented dated-subfolder move, which belongs to forge ingest, not here).
- **AGENTS.md / config / `.cursor/`** — `flag-only`: report only.

Human direction always overrides these defaults.

## Frozen surfaces (suppressed from broad scans)

Distinct from `flag-only`. `flag-only` is a *write-permission* rule (never auto-write, but **still report**). **Frozen surfaces** are areas the operator has made a deliberate, standing decision to never act on — so their unresolved links are **suppressed from the report** on broad scans, collapsed to a single tally line instead of being enumerated. This removes recurring, un-actionable noise without going blind: the count is still computed and shown.

**Frozen list (standing decision, 2026-06-17):**
- `raw/**` — immutable capture layer (constitutionally never edited; legacy PARA/v1 links are frozen by definition).
- `archive/**` — completed / deprecated content (includes `archive/historical/`).
- `_system/system-log.md` — append-only changelog; its links are *historical records* of prior structure, and repointing them would falsify history.

**Behavior:**
- On a **broad scan** (whole-vault, or any scope that merely *contains* a frozen surface), unresolved links inside frozen surfaces are **not enumerated**. Emit one tally line, e.g.:
  `Suppressed (frozen surfaces, by policy): N unresolved links in raw/, archive/, _system/system-log.md — not enumerated (scope a frozen path directly to audit).`
- **Explicit scope un-suppresses.** If the caller scopes the run *to* a frozen path (e.g. `/vault-link-check raw/`, `/vault-link-check archive/historical/`, `/vault-link-check _system/system-log.md`), that explicit intent overrides suppression and those links are fully reported. No separate flag is needed — the scope argument *is* the opt-in.
- Frozen ⊃ flag-only: frozen surfaces are also never written (`raw/` and `archive/` are already `flag-only`; `system-log.md` is append-only/protected). **Suppression changes only *reporting*, never write permission.**

This keeps broad scans focused on live, actionable surfaces (`wiki/`, `primers/`, `focus/`, active `_system/` notes, config). Note that other `flag-only` surfaces that are **not** frozen (e.g. `AGENTS.md`, `.cursor/`, config) are still reported normally — they are live and a dead link there may be real.

## Output

Present a compact, scannable report:

```
── /vault-link-check run: YYYY-MM-DD ── scope: <whole vault | wiki/ | path>

Auto-repaired (unambiguous drift):
  wiki/foo.md — [[raw/2026-06-04--bar]] → [[raw/202606/20260604-bar]]  (raw/YYYYMM relocation)

Surface — dead (no target, human decides):
  wiki/baz.md — [[domains/old-thing]] — deleted legacy page; suggest un-link to plain text

Surface — ambiguous (multiple candidates):
  wiki/qux.md — [[setup]] → setup.md? | templates/setup.md? — choose target

Report-only (flag-only but live — not written):
  AGENTS.md — [[some/ref]] dead — noted for human cleanup

Suppressed (frozen surfaces, by policy):
  N unresolved links in raw/, archive/, _system/system-log.md — not enumerated (scope a frozen path directly to audit).

Clean: <N pages with all links resolving>
```

If everything resolves, say so concisely.

## Eval log

If the instance keeps an eval log for this skill, append a minimal entry after presenting the report: date, scope, counts of auto-repaired / dead / ambiguous, and a summary excerpt. Do not write link-check activity to `raw/_log.md`.

## Non-negotiables

- **Filesystem resolution only** — never trust Graphify for dangling-link detection.
- **Ignore links inside inline code / code fences** — they are inert by design.
- **Auto-repair only an unambiguous single target**; surface dead and ambiguous links for human decision.
- **Never auto-create or auto-delete files.**
- **Honor the capability matrix + `ai-behavior` ratchet** for write permission per target folder/file; report-only in `raw/`, `archive/`, and config/constitution surfaces.
- **Suppress frozen surfaces** (`raw/`, `archive/`, `_system/system-log.md`) from broad-scan reports — collapse to a one-line tally per the standing 2026-06-17 decision; enumerate them only when the run is explicitly scoped to a frozen path. Suppression affects **reporting only, never write permission**.
- **Provenance / `last-updated:`** stamp on regular pages whose links you repair.
- **Human direction overrides** all of the above.

## Relationship to other tools

- `/forge-signal-check` **delegates** its `wiki/` link step to this skill (it does not duplicate link logic). The forge pass calls `vault-link-check` scoped to `wiki/` and folds the result into its summary.
- Other tools that notice link issues on system surfaces defer actual resolution and repair to this engine.
- `graphify` / `/vault-graph-refresh` are complementary (relationship discovery), not a substitute — they cannot see dangling links.

This skill is the canonical link-integrity doctrine for the vault; keep it general, conservative, and high-leverage. Update it (and the thin command descriptor) when the resolution or drift rules evolve. Single-sourced at the canonical core `skills/vault-link-check/SKILL.md` since 2026-07-06 (re-arch Phase 3); per-agent copies are generated.
