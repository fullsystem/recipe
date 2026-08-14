# 02 · Build the harness

A recipe is proved by running, and the installed project is too slow a loop to
prove anything in. The harness is a real instance of the target stack living in
this repository, serving `src/` as if it were already installed. Until it
exists, every convention is a guess and every component is unverified.

**Needs** — `01` done. Read `.ai/target.md`: the `landing` field is what the
harness imitates, and the `boundary` field is what it must stand in for.

**Produces** — a bootable harness, and `.ai/harness.md` recording what was
chosen and how to run it.

**Done when** — `.ai/harness.md` exists, and the marker test it describes
passes when run.

## The three invariants

Whatever tool this step ends up choosing, these are not negotiable:

1. **A real instance of the stack.** The framework boots, routes resolve, the
   build runs. Not a mock, not "the files compile" — a page you can open, a
   command you can run. What cannot be exercised cannot be trusted.

2. **`src/` shadows the harness.** The resolution order tries `src/` first,
   everywhere it matters — pages, components, imports, config. A file the
   recipe ships wins over the harness's copy *here*, exactly as it will
   overwrite the project's copy *when installed*. This is what lets you develop
   against the very names and paths that survive installation.

3. **The harness never ships.** Everything it needs — dependencies, config,
   stand-ins, generated files — lives outside `src/`, and what it generates is
   gitignored. One direction only: the harness exists to serve `src/`; `src/`
   must never reach into the harness (see the import rules this repository's
   conventions will set).

## Finding the tool — a ladder, not a catalogue

This step does not know the tool for your stack, and does not need to. Climb:

**First: the ecosystem's native answer.** Research one question, always the
same one — *"how does this ecosystem develop packages or extensions outside a
full application?"* Mature ecosystems have an answer: Laravel has
`orchestra/testbench`, whose Workbench boots a full app around a package.
Prefer the native tool when it exists — it tracks the framework so you do not
have to.

**Then: the universal fallback.** No native tool, or a poor one? Take the
virgin landing base you created and catalogued in step `01`, place it inside
this repository under a gitignored directory, and wire `src/` into it —
symlinks, build config, path mapping, whatever the stack's tooling allows.
Inelegant, and always possible.

Either way, the `boundary` field of `target.md` now becomes a checklist: each
thing the landing base provides, the harness must also provide — as a
**stand-in**, outside `src/` — or the recipe's files that depend on it cannot
run here. A stand-in the harness lacks will surface as an unresolvable import
the moment `src/` grows; a stand-in that drifted into `src/` will ship.

## The marker test

A harness that boots is not a harness that is done. Resolution fails silently:
a tool's own default can hijack yours and quietly serve the wrong root, and
nothing errors — you develop against a file that is not the one installing.
Prove the shadowing; never assert it:

1. Put a file in `src/` carrying an unmistakable string — a marker — at a path
   the harness serves, shadowing a harness file if one exists at that path.
2. Boot, build, or render — whatever exercises that path.
3. Find the marker in the output: the bundle, the rendered page, the artefact.
4. Remove the file. Confirm the marker is gone — and that the harness's own
   copy, if there was one, is back.

Record the exact commands as part of `.ai/harness.md`, because *done when* for
this step means the test passes when a future session runs it again.

## Record it

Write `.ai/harness.md`: which rung of the ladder was taken and why, how to
boot, how to run the marker test. Structural decisions made while wiring —
where stand-ins live, what gets gitignored, how imports must be written —
are rules and conventions of this recipe: write them down now, following
`src/.ai/skills/write-knowledge.md`, not after the payload exists.
