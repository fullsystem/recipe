# 03 · Build the payload

The recipe's files, written against a harness that runs them. This is the long
step, and the only one that produces what actually ships.

**Needs** — `02` done. `.ai/target.md` for `product` (what is in scope),
`boundary` (what the landing base already provides, so you do not rebuild it)
and `entitlements` (which of the project's files this recipe may replace).
`.ai/harness.md` for how to boot.

**Produces** — the contents of `src/`, and the conventions that emerged while
writing them, recorded in `.ai/`.

**Done when** — the harness boots and serves the payload, every path in `src/`
is one the `product` calls for, and nothing in `src/` imports the harness.

## Files first, schema later

Do not touch `schema.json` in this step. What the payload needs — which
packages, which of the project's files are now in the way — is not knowable
until the files exist, and a schema written ahead of them describes a plan
rather than the thing that was built. Step `04` reads what you made and derives
it.

Keep a running note as you go, though. Three things are worth writing down the
moment they happen, because reconstructing them later means re-reading every
file:

- an import that the landing base does not provide → a package, for `04`
- a file of the landing base's that this payload makes wrong or redundant → a
  removal, for `04`
- something the payload imports but does not ship — generated route helpers,
  for instance → a command, for `04`

## The path is the decision

Strip `src/` and you have where the file lands. `src/app/Example.php` becomes
`app/Example.php` in somebody's project, **on top of whatever is there**.

So every path is a decision to overwrite, and `entitlements` in `target.md` is
the list of decisions already taken. A path outside that list is a new one:
stop, and either establish the entitlement with the user or find a path that
does not collide. Discovering at install time that a recipe eats a file nobody
agreed to lose is the failure this whole sequence exists to prevent.

## One direction only

The harness serves `src/`. `src/` must never reach into the harness.

A stand-in exists because the landing base provides that thing and the harness
has to imitate it. When the recipe is installed, the real one is there and the
stand-in is not — it never ships. So an import in `src/` that resolves to a
harness file works perfectly here and breaks on the first real install, and it
breaks late, in somebody else's project.

Check it the cheap way, often: search the payload for imports and confirm each
one resolves either inside `src/` or to something the `boundary` says the
landing base provides. Anything else is a stand-in leaking.

## Prove it as you go, not at the end

The harness exists so the loop is short. Use it: boot after each meaningful
addition, open the thing you just wrote, run the build. A payload written for
two hours and exercised once is a payload with two hours of guesses in it.

The marker test from `02` is still the check that the shadowing holds. If it
starts failing while the payload grows, something in the resolution order
changed — find it before writing more, because everything written after that
point was developed against the wrong file.

## Write down what you decided

Conventions emerge here whether or not anyone records them: where components
live, how imports are written, what is named what, which patterns the recipe
expects a project to follow. They are the recipe's rules, and the next session —
or the project that installs this — has no way to infer them.

Write them as they are decided, following `src/.ai/skills/write-knowledge.md`.
Decide deliberately which side of `src/` each one belongs on: a rule about
building this recipe stays in `.ai/`, a rule about working in a project that
installed it goes in `src/.ai/`, where every such project inherits it.

Recording them after the payload is finished is how conventions become
descriptions of what happened to get built, rather than decisions somebody made.
