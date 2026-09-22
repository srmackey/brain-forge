# Security

## Reporting

Report a vulnerability privately with a GitHub Security Advisory on this repository. Do not open a public issue for a bug that would write outside a vault root, overwrite an owner's notes, or delete a file the framework did not ship.

## What a run can touch

Brain Forge is files and instructions an agent runs inside a vault. It is not a server you launch.

- Install copies `_brain-forge/` into the vault root. It also seeds `.graphifyignore` at that root, and three primer files beside the owner's own.
- Update rewrites the files the product ships under `_brain-forge/` and deletes nothing. It does not overwrite an adopted constitution, host skill copies, or the notes.
- The skills, when an owner runs them, write captures under `raw/`, synthesis under `wiki/`, and a derived graph when a graph tool is installed.
- The framework does not run git and it does not take a credential.
- It does not reach the network on its own. A graph refresh uses whatever graph tool the owner installed.
