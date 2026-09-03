# Changelog

The version record for the Brain Forge framework. `brainforge-update` reads the
top entry to learn what a vault currently has, and reports every entry newer
than that after an update.

An entry says what changed and, where it matters, what an owner has to
reconcile in their own adopted copy. Framework-internal changes that touch no
adopted file say so, because that tells the owner they can skip the pass.

**A file the product stops shipping gets its own line, beginning `Removed:`,
naming the path relative to `_brain-forge/`.** That line is not decoration.
`brainforge-update` separates an orphan from owner state by looking for it, so a
removal recorded only in prose reads as a file the framework never shipped, and
a name merely mentioned in an entry is not a removal.

## 0.2.0 (2026-09-03)

**Four tools are renamed and every host copy of them is stale by name.** This is
the one entry so far that breaks something: your exposed skills answer to slash
commands that no longer exist in the framework. Run `brainforge-surfaces expose`
for the four new names, then delete the four old host copies by hand, since
nothing removes a copy the framework no longer knows about. Reconcile your
adopted constitution as well.

- **The third purview is `synapse`.** It holds the graph and link integrity,
  which is one thing seen twice: the graph draws the relationships between
  documents and link resolution validates them against the real file tree.
  `synapse` names the junction rather than the documents or a worker acting on
  them, which is the category `forge` and `brain` are already in. It was called
  `vault` until now, which was never a name so much as the absence of one.
- **The three purviews are siblings, not nested.** A synapse is anatomically
  inside a brain and the matrix is not, so an agent in `brain` is denied the
  `synapse` column like any other. Stated in the constitution and the schema,
  beside the note that `brain` used to mean governance before 2026-08-31.
- **Install and update are not a purview at all.** `brainforge-update` and
  `brainforge-surfaces` write the framework rather than the corpus, and the
  capability matrix answers exactly one question: may an agent write in this
  folder of the vault. That is what the `_brain-forge/` row has been saying all
  along in a column that contained the installer. Both tools now sit outside the
  matrix and carry the product's name.
- **The naming convention follows.** Every purview tool is `<purview>-<intent>`,
  and the product's own hands are named for the product. `system-update` was
  rejected, because `system-init` and `_system/` belong to a different family.

- Removed: `skills/vault-graph-refresh/SKILL.md`
- Removed: `skills/vault-link-check/SKILL.md`
- Removed: `skills/vault-update/SKILL.md`
- Removed: `skills/vault-surfaces/SKILL.md`

## 0.1.9 (2026-09-02)

One hardcoded pair of filenames becomes a rule. Reconcile your host copy of
`vault-update`. No behaviour changes for a vault installing today.

- **Install derives which primers belong in the seeded catalog** instead of
  naming `distill.md` and `_system.md` in the step text. Eligibility is read off
  `_brain-forge/primers/`, which step 1 has already copied: every file there
  whose own frontmatter carries `signal: true`. Ship a third such primer and the
  catalog picks it up; drop one and it stops appearing. The old wording was a
  second list of shipped files, and this product has now lost that bet twice,
  with step 5's owner-state list and with this.

  It also removes a forward reference. That step described files step 3 had not
  seeded yet, which was answerable because the names were written out, and is
  now answerable because their source is already on disk.

## 0.1.8 (2026-09-02)

Install tells you what it skipped. Reconcile your host copy of `vault-update`.
Nothing changes for an install into an empty tree.

- **Install reports every file it left alone, and what that leaves undone.**
  Seeding only where absent is correct and it is also how a vault that already
  had contents ends up half-configured in silence. Declining to write is not the
  same as nothing being needed, and the owner had no way to know what the
  framework's version of their file would have contributed.
- Three skips have consequences and the report names each: an existing
  `.graphifyignore` missing the framework's rules, most importantly
  `_brain-forge/`, without which a graph run indexes the entire framework; an
  existing `primers/_index.md` missing the `signal: true` primers install just
  seeded, which `forge-signal-check` lints and will flag on the first pass; and
  an existing `wiki/_index.md` without the **Pages** and **Recent activity**
  headings that `forge-ingest` step 8 writes to by name.

Found by installing into a vault that already had contents, which until now had
never been tried. Every absence guard in the skill fired for the first time in
that run, and nothing of the owner's was touched, which was the good half.

## 0.1.7 (2026-09-02)

Update stops reporting "nothing changed" on a run that overwrote your work.
Reconcile your adopted constitution; the host copy of `vault-update` is stale.

- **`vault-update` reports what changed on disk, separately from the version.**
  It was answering both questions with the changelog, so a vault whose owner
  had edited a framework file and then updated at the same version got a
  one-line "nothing changed" on the exact run that destroyed the edit. Step 2
  keeps the list of files that differed before it wrote them, and step 4 reports
  them as restored. Nothing about what gets written has changed: framework files
  are still overwritten, with no merge and no prompt.

  The report separates the two reasons a file differs. When the version did not
  move, every difference is yours. When it did, most are the release, and only
  the ones the new changelog entries do not account for are worth naming. A raw
  diff list buries the edit you lost among the files the update was supposed to
  change.
- **The constitution says not to edit a framework file**, and says it beside the
  file-categories table rather than in an adoption section nobody reads while
  they are in the middle of editing `schema.md`. That file is the tempting one,
  because it holds the frontmatter model and the capability matrix and is
  deliberately not adopted, so a forked copy is never consulted. Per-vault
  deviation belongs in your constitution.

`primers/_system.md` deliberately does not carry this. It is a design-thinking
primer, not the operating rulebook, so its marker stays at 0.1.6 and parity will
flag the gap for you to judge. That flag is the check working, not a defect.

## 0.1.6 (2026-09-02)

The constitution says what the graph is. Reconcile your adopted constitution and
take the new `primers/_system.md`, or at least its marker; both carry the same
addition and both markers moved.

- **The graph maps the corpus, not what the vault knows.** It spans `raw/` and
  `wiki/`, which is the point, so it indexes captures nobody has judged, ones
  held back at ingest, and claims the wiki would have tagged unvalidated, with
  nothing marking them apart. A graph hit is a pointer into the corpus, never a
  claim the vault holds, and an agent answering from it reads the wiki page
  before treating anything as true.

  This is doctrine rather than a mechanism on purpose. Excluding held captures
  would have fixed the one case you can see and left every unjudged capture in
  the graph exactly as before. The wiki is where epistemic status lives, and
  saying so is what makes the graph safe to answer from.

## 0.1.5 (2026-09-02)

Install stops seeding a vault that fails its own lint. Reconcile your host copies
of `vault-update` and `forge-ingest`. Existing vaults keep the catalogs they have;
this only changes what a first install writes.

- **Install seeds `primers/_index.md` with the primers it also seeds.** It placed
  `distill.md` and `_system.md`, both carrying `signal: true`, next to an empty
  catalog, and `forge-signal-check` lints that catalog against exactly those
  primers. Every new vault failed that lint on its first pass with nothing
  actually wrong. `_me.md` stays out, because it ships `signal: false`.
- **Both catalogs are seeded with frontmatter** (`type: reference`, `signal: true`,
  `status: active`, `created:`). They sit in folders the schema governs and the
  graph indexes, unlike the three logs, which still get a heading and nothing
  else because nothing reads them by structure.
- **`wiki/_index.md` is seeded with the two headings its writers expect**, Pages
  and Recent activity. `forge-ingest` step 8 has always written to those by name
  and install created the file empty, so the first agent to touch a fresh
  catalog invented a shape and the next one had to match the invention.
- **`forge-ingest` step 8 says when it is mandatory.** A run that creates a page
  or changes what a page is about updates the catalog. A stale catalog is the
  one kind of staleness nothing else in the vault contradicts.

## 0.1.4 (2026-09-02)

Three checks stop guessing. Reconcile your adopted constitution: it gains a
`framework:` line, and keeping it is what lets staleness be answered without a
timestamp. Take the new `primers/_system.md` too, or at least its marker line,
since update never overwrites a seeded file and parity needs both numbers to
say anything. Until both markers exist, parity reports that it cannot run.
Host copies of `vault-update` and `forge-ingest` are stale.

- **The constitution and the vault-design primer carry a `framework:` version
  line**, and `vault-surfaces` parity compares those instead of modification
  times. A timestamp says when a file was written, which a copy, a reformat or
  a checkout all change, and adoption writes the constitution copy, so the old
  rule flagged every vault on the day it was created. Copy the line along with
  the file and then leave it alone; it says which doctrine your copy reflects.
  A missing marker is reported as a check that cannot run, never guessed around.
- **`vault-update` derives owner state instead of listing it.** A file under
  `_brain-forge/` that an update did not write is an orphan when a changelog
  entry names it as removed, and yours when the changelog has never heard of it.
  The old hand-kept list of owner-state filenames lost `system-log.md` within a
  day of being written, and a literal run would have orphaned a file the layout
  table in the same file calls owner state.
- **The capture-quality screen has a verdict for material that is not an AI
  session.** All five of its patterns describe ways a session distill can
  mislead, so a saved article cannot fail any of them and `clean` would claim a
  screen that never ran. Those get `not-applicable (third-party material)`,
  which carries one requirement: the wiki write says whose material it is and
  summarizes rather than reproducing. The risk with someone else's document is
  not flattery, it is a page that reads years later as though you thought of it.

## 0.1.3 (2026-09-02)

Three fixes found by running the tools against a vault with real material in
it. Reconcile your host copy of `forge-ingest`; `vault-surfaces` will tell you.
If you copied `linkcheck.mjs` onto a path, take the new one.

- `linkcheck.mjs` skips host overlay (`.claude`, `.cursor`, `.grok`). Those hold
  copies of the skill cores it already skips under `_brain-forge/`, so it was
  reading the framework's own documentation examples and reporting them as your
  vault's dead links. The more skills you expose, the worse it got.
- `linkcheck.mjs` implements the frozen-surface suppression `vault-link-check`
  has always specified: `raw/` and `archive/` findings are counted rather than
  listed on a broad scan, and enumerated when you scope the run to one. The
  doctrine was written and the code did not do it.
- `linkcheck.mjs` takes an optional scope argument, which the skill also already
  described. `node linkcheck.mjs wiki/` scans wiki links only. The file
  inventory stays whole-vault either way, so a link out of the scope still
  resolves against a file outside it.
- `forge-ingest` tidies the capture into `raw/YYYYMM/` **before** integrating,
  not after. Provenance is written during integration and points at the dated
  path, so the old order wrote links to a file that had not moved yet. Same
  defect as the installer's in 0.1.1.
- A held capture is not tidied. It stays where you last saw it until you decide.
  The old wording moved a file "after integration or a decision to defer", and a
  hold is neither.

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
