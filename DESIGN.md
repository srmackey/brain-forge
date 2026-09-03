# Design

Brain Forge is a vault framework. It ships the conventions, the skills, and the install contract for a personal knowledge vault built on two layers: an immutable capture layer and a synthesis layer an LLM maintains over it.

This file is the locked spec: what is true of the system now, in one place, so a contributor does not have to reconstruct it from history.

## Where the design currently lives

Most of it is already written, and it is written in the files that ship, because a vault has to carry its own rules to a machine that has never seen this repository.

| Question | Answer lives in |
|---|---|
| How a vault operates: layers, purviews, records, non-negotiables | `_brain-forge/constitution.md` |
| Frontmatter, the capability matrix, the tool-naming convention, the eval-log format | `_brain-forge/schema.md` |
| What ships, what install writes, what update may touch | `_brain-forge/skills/brainforge-update/SKILL.md` |
| What the primer layer is and how composition works | `_brain-forge/primers.md` |
| What changed between versions, for someone who installed it | `_brain-forge/CHANGELOG.md` |
| What the product is, for someone deciding whether to use it | `README.md` |
| How to work on the product itself | `AGENTS.md` |

That distribution is deliberate. The constitution and the schema are adopted or read by an installing vault, so they cannot be summarized here and left to drift. This file points at them and holds only what has no shipped home.

## What has no shipped home yet

Nothing, at 0.2.0. The framework is small enough that every binding decision sits in a file that travels with it.

When that stops being true, this file is where the answer goes: a decision that governs the product but does not belong in anything a vault installs. Add it here rather than growing a section inside a shipped file.

## Out of scope, on purpose

- **A server.** The framework is files and instructions. An MCP interface for other tools to query a vault is a later question and is not designed.
- **Shipping a graph engine.** Graph tooling is a user install the framework calls, not something it bundles.
- **Vault contents.** The value of a second brain is what is in it, and contents never ship. No example vault, no seeded pages, no sample captures beyond empty scaffolding.
- **Writing an owner's constitution.** Install places the framework. Adopting it into a host is the owner's step, and their adopted copy is theirs.
