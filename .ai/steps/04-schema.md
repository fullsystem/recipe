# 04 · Declare the schema

The payload exists. This step reads it and writes down what it needs around it,
so the installer can put it into a project that has none of it yet.

**Needs** — `03` done. The payload, the running note it produced, and
`.ai/target.md` for `driver`, `boundary` and `entitlements`.

**Produces** — a complete `schema.json`.

**Done when** — every entry in the schema traces to something in `src/`, every
import in `src/` traces to the schema or to the `boundary`, and the file parses
with no action the driver does not know.

## Derived, not designed

Every entry has to answer *which file needed this*. An entry that cannot is a
guess, and guesses in this file install packages nobody wanted or delete files
nobody agreed to lose.

Read the payload and work outwards:

1. **Every frontend import** that is not relative and not something the
   `boundary` says the landing base ships → a `packages` entry.
2. **Every backend class** the landing base does not provide → a `composer`
   entry, `"dev": true` if only the tests use it.
3. **Every file of the landing base's that the payload makes wrong** → a
   `remove` entry, and only if `entitlements` already covers it.
4. **Everything the payload imports but does not ship** — generated route
   helpers are the usual case → a command in `post-install`.
5. **Everything that must exist before the files land** — a component library
   the pages import → `pre-install`.

The running note from `03` is the first draft of this list. It is not the whole
of it: read the files anyway, because what got written down is what somebody
remembered to write down.

## `remove` is the one that destroys

Two kinds of path qualify and only two: files that conflict with the payload
without being overwritten by it, and files that would break the build now that
the payload is in. **A file the recipe simply does not use is not a reason to
delete it** — the project it lands on is not yours to tidy.

Every entry also has to be in `entitlements`. If it is not, that is not a
formality to skip: it means nobody agreed the recipe could take that file, and
this is the last moment before the decision becomes somebody else's problem.

## Order inside a phase is real

A phase is a list, and it runs top to bottom. Deletions that clear the way for
an install come before it; a package that a later command needs comes before
that command. The same action may appear as many times as the order requires.

What you cannot order is the two phases in the middle — copying `src/` over the
project, and verifying the result. Those are the installer's, and a recipe that
could move them could put the copy before the deletions that clear the way for
it.

## The driver decides what exists

`driver` was settled in `01` and confirmed to exist. What it accepts is its own
list, not the format's: a driver that cannot execute an action refuses the whole
schema rather than skipping it quietly.

So do not write an action from memory. The installer names what it knows when
handed something it does not — an unknown action answers with the driver's list,
an unknown check answers with the checks it offers. Getting it wrong on purpose,
in a run that writes nothing, is a legitimate way to ask.

Two traps in the vocabulary itself, both of which fail the run:

- **`artisan` takes flags, never positional arguments.** `wayfinder:generate
  --with-form` passes; `make:model Post` is refused. If a file has to be
  generated, ship it in `src/` instead.
- **Commands are argument lists, never strings.** Nothing reaches a shell, so
  `&&`, `;` and `|` cannot work.

## `requires`

Declare a check only when the recipe genuinely depends on it. `fresh-project`
suits a recipe that rewrites what a project has already built on; it would
never pass for one that only adds a module, and a recipe that asks for it
without needing it just puts an unanswerable question in front of the user.

A failure there is a question, not a verdict — the user is shown what was seen
and asked whether to continue.

## Then read it back

Go through the finished schema line by line and name the file that justifies
each entry. Anything you cannot name comes out. Then go the other way: every
import in the payload, and where it comes from — the schema, or the boundary.
Anything that comes from neither is why the install will fail.

That double pass is the whole verification available at this point. The real one
is step `05`, and it costs a great deal more.
