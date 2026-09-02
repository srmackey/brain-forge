# Changelog

The version record for the Brain Forge framework. `vault-update` reads the top
entry to learn what a vault currently has, and reports every entry newer than
that after an update.

An entry says what changed and, where it matters, what an owner has to
reconcile in their own adopted copy. Framework-internal changes that touch no
adopted file say so, because that tells the owner they can skip the pass.

## 0.1.2 (2026-09-02)

First adoption gets a tool, and the staleness check stops stranding the copies
it was built to maintain. Reconcile your adopted constitution: the skills
paragraph changed. Host copies need nothing from you; the next `vault-surfaces`
run adopts the ones that still match their core.

- `vault-surfaces` grows an **expose** mode. Name the skills you want your agent
  to see and it writes them into the host directory, stamped. Exposing was the
  one real operation in this framework with no tool behind it, and the hand
  copies it produced were exactly the files the staleness check refused to
  touch.
- The stamp check is three steps now, and content decides. An unstamped copy
  that is byte-identical to its core is **claimed**: the stamp is written and
  the file is maintained from then on. Nothing is lost, because a file
  identical to its core holds nothing of yours.
- What is protected is now stated precisely: unstamped **and different from its
  core**. That is your own variant of a framework skill, and it stays
  untouchable. The old rule protected every unstamped file, which sounded safer
  and meant a by-the-book adoption could never be maintained.
- Adoption instructions in `vault-update` and the constitution point at expose
  instead of telling you to copy files by hand.
- Expose reports a named copy that is unstamped and differs from its core, and
  asks rather than replacing it. A hand copy that fell behind before this skill
  ever ran looks exactly like your own variant, and only you know which it is.
  That case is the reason to expose through the tool the first time.

## 0.1.1 (2026-09-02)

Two defects in `vault-update`'s own instructions, found by running the install
for the first time. Text only; no behavior the product performs has changed.
Reconcile the host copy of `vault-update` if you adopted one.

- Install's step order was impossible as written. Seeding placed files in
  `primers/`, which the next step created. Layout creation is step 2 now and
  seeding is step 3.
- The layout section claimed install "leaves exactly one visible thing at the
  vault root." It leaves four: the framework folder plus the vault's own
  `raw/`, `wiki/`, and `primers/`. The claim was about framework files not
  scattering, and it now says that instead.
- Said outright that the scaffolding headings are the installer's wording and
  the owner's file thereafter. The old phrasing left an agent inventing a
  convention and unsure whether a later run would judge it.

## 0.1.0 (2026-09-01)

First framework release. Nothing to reconcile; there is no earlier version.

- Framework payload lives in one folder, `_brain-forge/`. Update rewrites the
  files the product ships and deletes nothing. Everything else, inside that
  folder or out of it, belongs to the vault owner.
- Vault constitution at `_brain-forge/constitution.md`. Adopt it as the file
  your host loads.
- `schema.md` holds frontmatter, the capability matrix, the producer boundary,
  and the tool structure convention. Read by the skills at its framework path,
  so it is the one file that is not adopted.
- Nine skill cores: `forge-distill`, `forge-ingest`, `forge-primer`,
  `forge-signal-check`, `forge-synthesis-engine`, `vault-graph-refresh`,
  `vault-link-check`, `vault-surfaces`, `vault-update`.
- The web distill format ships as a primer. Install seeds a copy at
  `primers/distill.md` beside your own.
- `primers.md` is the manual for the primer layer: kinds, reserved headings,
  composition, and the catch that a transcluded primer does not copy cleanly
  out of Obsidian, which is the reason `forge-primer` exists.
- Two more shipped primers, seeded beside your own on first install:
  `_system.md` for working on your vault's design, and `_me.md`, which arrives
  empty and is the seed the rest of the primer layer composes from.
- Obsidian stationery in `templates/`, plugin macros in `obsidian/`, and
  agent-run scripts in `tools/`. `vault-link-check` calls `tools/linkcheck.mjs`
  rather than re-deriving link resolution each run.
- Optional synthesis steering lives beside the engine core as `preferences.md`,
  with `tweaks-log.md` beside it. Update writes only the files the product ships
  and deletes nothing, so those two survive in place.
- Install seeds `.graphifyignore` at the vault root, where Graphify reads it.
  Update never overwrites it.
- Graphify is a user install and is not vendored. `vault-graph-refresh` carries
  the steps.
- Shipped text no longer names one vault's wiki hubs as if they were product
  taxonomy, carries `forge-primer`'s authoring history, or references a frontmatter
  migration that only the original vault had. `evolution` joins the schema type
  list, where two skills already assumed it was.
- The eval log is a defined part of the product now, at `_brain-forge/eval.md`,
  with its convention in `schema.md`. Six skills already instructed agents to
  write one and nothing said what it was. Writing is unconditional: a clean run
  is the baseline that makes a bad one legible.
- `vault-surfaces` keeps derived surfaces aligned with their sources: host
  skill copies via header stamps, the constitution against the system primer,
  and rule text duplicated out of the schema. Check is the default and writes
  nothing; regenerate only touches stamped copies whose source moved. An
  unstamped file is never overwritten, which is what makes the rest safe.
- Four records, kept apart: `raw/_log.md` for captures, `_brain-forge/eval.md`
  for how skills behaved, `_brain-forge/system-log.md` for shape changes, and a
  `wiki/` evolution page for why the thinking moved. Install seeds the two
  framework-folder ones empty and never writes them again.
- Frontmatter agrees with itself now. `source` is documented where it was
  already used, `status: captured` is gone from the raw template (a raw file has
  no lifecycle and the schema requires every key to have a consumer), the
  `maintainer-mode` alias is dropped in favour of `ai-behavior: propose-only`,
  and the raw template date placeholder is lowercase like the journal one, so
  it will actually expand.
- The starting graph ignore excludes the seeded framework primers and any
  personal `_me.md` / `_<person>.md`. Doctrine is read at its path, and indexing
  it makes a dominant hub that distorts the graph over your actual material.
- Obsidian is assumed by the human layer only: wikilinks, transclusion, Reading
  view, and callouts. The skills are host-agnostic and run without it. Optional
  plugins named in the README: Templates or Templater, QuickAdd, Dataview.
- No skill requires git. The primer-catalog lint uses `signal: true` frontmatter
  rather than tracked-file status, so it works in an unversioned vault. The
  README recommends version control anyway, for provenance over your own
  material, and says what to ignore.
