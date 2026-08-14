# 06 · Write the README

The recipe works. Nobody knows what it is. This step turns everything learned
while building it into the one page a person reads before deciding whether to
install it — and it comes last on purpose: a README written earlier sells
intentions, and this one can only claim what already exists.

**Needs** — `05` done. `.ai/target.md` for what this delivers, `schema.json` for
what it actually does, and whatever `.ai/` recorded on the way.

**Produces** — `README.md` in the repository root.

**Done when** — `README.md` exists, every claim in it is backed by something in
`schema.json` or `src/`, and the install command in it names the real
`org/repo`.

## Who is reading, and what they are deciding

Someone who has a project, or is about to start one, and is deciding whether to
hand it over to this recipe. They are not deciding whether the format is clever.
They want to know: what do I get, what does it do to my project, and how do I
try it without regretting it.

That is a sales page, and there is no shame in it — but the thing being sold has
to be the thing that installs. Everywhere else in this repository, precision is
the goal. Here, so is persuasion. They are not opposites: the most convincing
line is usually the most specific one.

## Where the words come from

You have been building this for several steps and know it better than anyone
will. That is the raw material — not a template to fill in.

| source | gives you |
|---|---|
| `.ai/target.md` → `product` | the one sentence at the top, rewritten to be read by a person rather than by a step |
| `.ai/target.md` → `landing`, `boundary` | who this is for and what they need before installing |
| `schema.json` | what it installs, removes and runs — the only honest source for "what you get" |
| `src/` | what actually lands: the pages, the layouts, the conventions |
| `.ai/target.md` → `entitlements` | what it overwrites, which a reader deserves to know before running it |

If some of that reads as thin — "installs four packages and a page" — then the
README is thin, and that is information, not a writing problem. Say what is
there.

## What goes in

Nothing more than these, and in an order a reader can follow:

1. **What it is**, in a sentence or two. What kind of project comes out.
2. **How to install it**, with the real command:

   ```bash
   cpx fullsystem/install --recipe=<org>/<repo>
   ```

   And the URL of this repository's own skill, if it has one, for whoever would
   rather ask their assistant.

3. **What you get** — the packages, the pages, the conventions. Concrete, drawn
   from `schema.json` and `src/`.
4. **What it changes about the project**, including anything it deletes. A
   reader who finds this out after running it will not run anything of yours
   again.
5. **What it lands on** — the stack and starting point from `target.md`. A
   recipe installed onto the wrong base fails in ways nobody enjoys debugging.

Then stop. Contribution guidance belongs in `AGENTS.md`; the recipe format
belongs to the installer's documentation; the reasoning behind decisions belongs
in `.ai/`.

## What must not go in

**Anything the recipe does not do.** The temptation at this step is to write the
recipe you meant to build. Every capability named here has to be findable in
`schema.json` or `src/` — if it is not there, it is a plan, and plans do not go
on the front page.

**Reassurance the installer provides, claimed as yours.** Working on a branch,
verifying the build, rolling back on failure — that is
`fullsystem/install`, and it is worth mentioning as *its* guarantee, not as
something this recipe implements.

**Placeholders.** `{org}` and `{repo}` in a README are the clearest possible
signal that nobody read the thing before publishing it.

## Then check it as a stranger

Read it once as somebody who has never seen this repository. Two questions,
both of which have to answer themselves in the first ten lines: *what does this
give me*, and *what will it do to my project*. If either needs the reader to
scroll or infer, move it up.
