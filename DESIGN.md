# Brain Forge

**Version 0.2.7**

Brain Forge is a vault framework. A vault that installed it keeps that person's notes. This repository ships the rules and the skills, not the notes.

How to install it is in [README.md](README.md). What changed for someone who already installed it is in [`_brain-forge/CHANGELOG.md`](_brain-forge/CHANGELOG.md). The rules a vault adopts are in [`_brain-forge/constitution.md`](_brain-forge/constitution.md). Working on this repository is in [AGENTS.md](AGENTS.md).

## Two layers

`raw/` is the capture layer. New material lands there, and it is not edited after capture.

`wiki/` is the synthesis layer. An agent maintains it: pages that say what the captures add up to, with room to say whose idea a claim was and whether anyone agreed.

The graph is drawn across both layers. A hit is a pointer into the corpus. It is not a claim the vault has judged true. An answer that starts from the graph goes to the wiki page before treating the hit as fact.

## Three jobs, side by side

The work splits into three purviews. They are siblings. An agent that is only reading and answering is not granted the tools that rewrite the wiki or the graph.

| Purview | Job |
|---|---|
| forge | Turn a capture into the corpus: distill, ingest, primers, synthesis |
| synapse | Keep the graph and the links honest |
| brain | Retrieval, query, and analysis. An outside agent sits here |

Install and update are not a fourth purview. They write the framework files, not the notes. The permission table for the tools lives in [`_brain-forge/schema.md`](_brain-forge/schema.md).

The owner does not pick a purview. "Keep this" or "put this in the vault" is distill, then ingest. A file already in `raw/` is ingest. "Assemble context" is a primer. A stale graph or a broken link is the synapse skill for that job.

Ingest's default is a wiki page. It holds the capture in `raw/` when the owner said to hold it, or when the capture is not material for this vault.

## What ships, and what stays yours

Install copies `_brain-forge/` to the vault root. It also seeds a few files that only work outside that folder: `.graphifyignore` at the vault root, and three primers beside the owner's own. Update rewrites the files the product ships and deletes nothing, so a learned preference file inside the framework folder can survive.

Install does not write the owner's constitution, the host's skill directories, or the notes. Copying the constitution and the skills into an agent is the owner's step. Their copy is theirs, and update will say when it has fallen behind.

The notes never ship. There is no example vault in this repository.

## What this is not

Brain Forge is files and instructions. It is not an MCP server. It does not bundle a graph engine. Graph refresh calls a graph tool the owner installs, and ingest still runs when that tool is absent. It does not require git. Git is useful if the owner wants a diff of what a synthesis pass changed.

## Where the binding text lives

This page is the picture. The text a vault actually runs is the copy it installed.

| Question | File |
|---|---|
| How a vault operates | `_brain-forge/constitution.md` |
| Frontmatter, and which tool may do what | `_brain-forge/schema.md` |
| What install and update may touch | `_brain-forge/skills/brainforge-update/SKILL.md` |
| How primers compose | `_brain-forge/primers.md` |

Those files travel with an install, so this page does not restate them.
