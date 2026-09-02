---
name: vault-surfaces
description: "Vault-purview skill that keeps derived surfaces aligned with their sources. Exposes framework skills into a host's discovery path, checks and regenerates those copies using header stamps, flags the vault constitution and the system primer when one has moved ahead of the other, and reports rule text duplicated out of the schema. Run to expose a skill to your agent, after a framework update, after editing a skill core or the constitution, or whenever an agent seems to be following an old rule. Invoke for /vault-surfaces, 'expose forge-ingest', 'check the surfaces', 'regenerate my skills', or 'are my host copies stale'."
argument-hint: "[optional: check (default) | regenerate | expose <skill> ... | a single surface name]"
---

> Product core (`_brain-forge/skills/vault-surfaces/SKILL.md`). Install copies this file into an instance. Exposing a skill to a host is this skill's job, on the owner's word.

# vault-surfaces Skill

The **vault purview's** derived-surface hands. Structural plumbing, same purview as graph rebuilds and link integrity.

A vault runs the framework through copies. Skill cores get copied into host discovery paths, the constitution gets adopted into whatever file the host loads, and the system primer restates the operating model for a web session. Every one of those is a derived surface, and every one of them goes stale silently when its source moves. Nothing else in the framework notices.

`vault-update` reports that copies are behind. This skill is what fixes them.

## The stamp

A generated copy carries a header stamp naming what it came from and when:

```
generated from _brain-forge/skills/forge-ingest/SKILL.md on 2026-09-02 - edit the source, not this file.
```

Place it as the first line after the frontmatter. Use a plain hyphen, not a dash character, since some hosts are strict about the file's opening bytes.

The stamp makes staleness mechanically decidable rather than a judgment call. Three checks, in order:

1. **Stamped?** If yes, go to check 3.
2. **Unstamped: byte-identical to its core?** If yes, **claim it**: write the stamp and treat it as derived from here on. Nothing is lost, because a file identical to its core holds nothing of the owner's. If no, the file is the owner's. Report and stop.
3. **Stamped: byte-identical to a fresh generation, ignoring the stamp line?** If yes it is current. If no it is stale.

Check 2 is what makes a hand-copied file maintainable. An owner who copies a core into a host directory has produced something indistinguishable from what this skill would have written, and refusing to touch it forever would strand exactly the copies most likely to go stale.

The file this protects is the one that is unstamped **and** differs from its core. That is either the owner's own variant of a framework skill or something they hand-edited, and either way it is theirs. Content is what distinguishes them, not the absence of a stamp on its own.

**A stamp is a claim of ownership by this skill, and the stamp line says so: edit the source, not this file.** A stamped copy that the owner then edits reads as stale and will be regenerated over. If they want a variant, they take the stamp off, and it becomes theirs under check 2.

## Modes

**check** (default) reports and writes nothing, with one exception: it claims copies under check 2, since stamping a file identical to its core changes nothing about what that file says.

**regenerate** applies the fixes that are mechanical and unambiguous: stamped copies whose source moved. It never touches a file that is unstamped and differs from its core, never resolves a parity flag, and never edits the constitution or a primer.

**expose** takes skill names and writes them into this vault's host directories, stamped. This is first adoption, and it is the one thing here that creates a file rather than repairing one.

- The owner names the skills. Never expose one they did not ask for, and never expose all of them because all of them exist.
- Write to host directories that already exist. If none does, name the paths this vault's host would use and ask which to create. Creating `.grok/skills/` in a vault that has never mentioned Grok is still not your call.
- A name that is already exposed is not an error. Run the three checks on it and report what they say.
- **A named copy that is unstamped and differs from its core is reported, never replaced.** Say what differs and ask. Naming a skill is not the same as reviewing the file that is already there, and this is the only path in the whole skill by which someone's own variant could be destroyed. It is also where a hand copy that fell behind before this skill ever saw it comes back: same evidence, opposite meaning, and only the owner knows which it is.
- Stamp on the way out. A copy this skill wrote is a copy this skill can maintain, and that is the entire point of doing it here rather than by hand.

## 1. Host skill copies

The framework cores are at `_brain-forge/skills/<name>/SKILL.md`. A host finds skills by scanning a directory, so using one means copying the core into that directory.

| Host | Discovery path |
|---|---|
| Claude Code | `.claude/skills/<name>/SKILL.md` |
| Cursor | `.cursor/skills/<name>/SKILL.md`, or the `.claude/skills` compat path |
| Grok | `.grok/skills/<name>/SKILL.md` |

Other hosts scan other paths. Read the host's own documentation rather than guessing, and do not invent a tree a host does not document.

For each core, for each host directory that exists in this vault:

- **Copy missing.** The owner chose not to expose that skill. Report it once as available, not as an error, and do not create it. Expose mode is how they change that.
- **Copy present and stamped and current.** Say nothing.
- **Copy present and stamped and stale.** This is the case regenerate fixes. Copy the core, add the stamp, keep the filename.
- **Copy present, unstamped, identical to its core.** Claim it under check 2: write the stamp, report it in one line as adopted. Almost always a copy the owner made by hand before this skill existed or before they knew about it.
- **Copy present, unstamped, differs from its core.** Report. Never overwrite. This is the owner's variant of a framework skill, which is a legitimate thing to have.
- **Copy present with no matching core.** Either an instance-authored skill, which is fine and not yours, or an orphan from a framework version that dropped it. Report, never delete.

In check and regenerate, only act on host directories that already exist. Expose is the one mode that may create one, and only on the owner's word.

## 2. Constitution and system primer parity

`_brain-forge/constitution.md` is the framework's copy. The owner adopted it into whatever file their host loads, and adapted it. `primers/_system.md` restates the same operating model for a web session. Those two describe one thing in two places, which is the coupling this framework ships and cannot enforce.

Both files ship a `framework:` line near the top naming the version of the doctrine they carry, and it travels with any copy. Compare those, not timestamps. A modification time says when a file was written, which a copy, a reformat, a checkout or a folder sync all change, and adoption itself writes the constitution copy, so a timestamp rule flags every vault on the day it is created.

Read three markers: the adopted constitution's, `primers/_system.md`'s, and the shipped `_brain-forge/constitution.md`'s.

- **Adopted marker behind the shipped one.** The owner's constitution reflects older doctrine. Name the versions between them and point at the changelog entries.
- **Primer marker behind the adopted one.** A doctrine change may not have reached the primer, which is the file they hand to other people's models.
- **A marker is missing.** Say so and compare nothing. An owner who removed the line gets a report that says the check cannot run, never a guess from some other signal.

The markers make staleness decidable. **What changed between two versions is still semantic**, so name it from the changelog rather than diffing the files into a report nobody can act on. "The purview table gained a row" is actionable. "These files differ" is not.

Neither file's marker is bumped by this skill, or by any run. A release bumps it in the product when that release changes that file, and a copy keeps whatever it was copied with. That is the whole point: the number describes the doctrine in the file, not the last time anyone touched it.

Never edit either file to resolve a flag. The adopted constitution is the owner's, and the primer is a document they hand to other people's models.

## 3. Canonical-home drift

`_brain-forge/schema.md` is the canonical home for the frontmatter model, the capability matrix, the producer boundary, the tool structure convention, and the eval log. Every other surface is supposed to carry a short principle plus a pointer, never a second copy of the rule.

Scan the vault's own surfaces (the adopted constitution, instance-authored skills, `primers/_system.md`) for text that restates a schema rule rather than pointing at it. Report the location and which canonical section it duplicates.

Do not scan the framework's own files for this. They are the product's problem, not this vault's.

Duplication is not always wrong. A one-line restatement beside a pointer is the convention working. Flag a second full copy of a rule, not a summary of it.

## Output

```
── /vault-surfaces run: YYYY-MM-DD ── check | regenerate | expose

Host copies:
  .claude/skills/ — 5 of 8 exposed, 1 stale
    forge-ingest — stale, source moved 2026-09-02 [regenerated]
    forge-distill — unstamped copy of the current core, adopted
    vault-link-check — unstamped and edited, left alone (yours)
  .grok/skills/ — 2 of 8 exposed, all current

Available but not exposed: forge-primer, vault-surfaces
  Expose one with: /vault-surfaces expose forge-primer

Parity:
  Adopted constitution 0.1.2, framework ships 0.1.4. The purview table gained
  a row in 0.1.3. primers/_system.md is 0.1.4 and ahead of your constitution.

Canonical-home drift:
  Your constitution restates the full capability matrix from schema.md.
  Pointer would do.

Nothing else moved.
```

If everything is current, say so in one line.

## Non-negotiables

- **Never overwrite an unstamped file that differs from its core.** No exceptions, including when it looks like a stale copy. Content is the evidence. An unstamped file identical to its core is the one safe case, and claiming it writes a stamp rather than overwriting anything.
- **Never delete.** Orphaned copies are reported and left. The owner decides.
- **Never create a host directory** in check or regenerate, and never expose a skill the owner did not name. Expose acts only on names they gave.
- **Never resolve a parity or drift flag by editing.** Those need judgment and both files belong to the owner.
- **Regenerate is opt-in.** Check is the default and writes nothing.
- **Report honestly.** A host you do not know how to generate for is a thing to say, not a thing to guess at.
- Append an entry to `_brain-forge/eval.md` after the run. Unconditional; format and charter in `_brain-forge/schema.md`.

## Related
- `_brain-forge/skills/vault-update/SKILL.md` — installs and updates the framework, and reports the staleness this skill repairs.
- `_brain-forge/schema.md` — the canonical home whose drift section 3 checks.
- `_brain-forge/constitution.md` — one half of the parity coupling.
- `_brain-forge/primers/_system.md` — the other half.
