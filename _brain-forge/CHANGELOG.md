# Changelog

The version record for the Brain Forge framework. `vault-update` reads the top
entry to learn what a vault currently has, and reports every entry newer than
that after an update.

An entry says what changed and, where it matters, what an owner has to
reconcile in their own adopted copy. Framework-internal changes that touch no
adopted file say so, because that tells the owner they can skip the pass.

## 0.1.0 (2026-09-01)

First framework release. Nothing to reconcile; there is no earlier version.

- Framework payload lives in one folder, `_brain-forge/`, which is overwritten
  wholly on update. Everything outside it belongs to the vault owner.
- Vault constitution at `_brain-forge/constitution.md`. Adopt it as the file
  your host loads.
- `schema.md` holds frontmatter, the capability matrix, the producer boundary,
  and the tool structure convention. Read by the skills at its framework path,
  so it is the one file that is not adopted.
- Eight skill cores: `forge-distill`, `forge-ingest`, `forge-primer`,
  `forge-signal-check`, `forge-synthesis-engine`, `vault-graph-refresh`,
  `vault-link-check`, `vault-update`.
- The web distill format ships as a primer. Install seeds a copy at
  `primers/distill.md` beside your own.
- Obsidian stationery in `templates/`, helper scripts in `scripts/`.
- Optional synthesis steering lives at the vault root as `preferences.md`, with
  `tweaks-log.md` beside it, rather than next to the engine skill. The framework
  folder is overwritten wholly, and those two files are yours.
- Install seeds `.graphifyignore` at the vault root, where Graphify reads it.
  Update never overwrites it.
- Graphify is a user install and is not vendored. `vault-graph-refresh` carries
  the steps.
