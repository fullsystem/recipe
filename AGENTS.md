# {org}/{repo}

This repository builds a **recipe** for
[fullsystem/install](https://github.com/fullsystem/install): files that mirror a
root folder (`src/`) and a `schema.json` declaring what has to happen for them
to work.

If `BOOT.md` is still in the root, the repository has not been set up yet and
that file is what says how. Read it instead of this one.

## Where the knowledge is

This file holds little of its own. What is true about this recipe was written
down while it was being built, and it lives in two places:

| | |
|---|---|
| `.ai/` | Decisions, conventions and facts about this recipe — what it targets, how it is proved, what was settled and why — plus `skills/`, the how-to knowledge for working on the recipe itself. Never ships. |
| `src/.ai/skills/` | How-to knowledge for working in a project the recipe installs into, starting with `write-knowledge.md`. Lives inside `src/` because it **ships**: every such project inherits it. |

**Before answering a question, deriving a fact, or asking the user anything:
look in both first.** Knowledge kept growing after the build finished, and the
answer is more often written down than not.

## The two parts

```
schema.json     what has to happen for the files to work
src/            files that mirror the project root
```

`src/resources/js/pages/dashboard.tsx` lands at
`resources/js/pages/dashboard.tsx` in the installed project. No path mapping,
nothing to configure. Anything outside `src/` — this file, `.ai/`, the licence —
stays here and never reaches a project.

Files are copied over whatever is there, and directories are created as needed.
Files already in the project that this recipe does not ship are left alone: only
`remove` deletes.

## Changing the recipe

The files come first and the schema follows from them. What a recipe needs is
not knowable until the files exist, and a schema written ahead of them describes
a plan rather than the thing that was built.

So: build in `src/`, then read what you built and derive the schema from it —
a frontend import that is not already in the target project becomes a
`packages` entry, a backend class the framework does not ship becomes a
`composer` entry, a file of the project's that your work makes wrong becomes a
`remove`, something you import but do not ship becomes a `post-install` command.

**`remove` is the dangerous one.** Two kinds of path qualify and only two: files
that conflict with ours without being overwritten by them, and files that would
break the build now that ours are in. A file this recipe simply does not use is
not a reason to delete it. If you cannot name the file of ours that replaces it,
or the breakage it causes, leave it alone.

## `.ai/steps/` is spent

The steps built this recipe. They are not how it is maintained, and re-running
them on a finished repository undoes decisions that were already made.

Go back to them only if what the recipe targets changes — a different stack, a
different kind of project. That is a rebuild, not an edit, and the steps are
written for it.

## The schema

| field | type | meaning |
|---|---|---|
| `name` | string | `owner/repo`. Shown to the user and used in the install commit message. |
| `version` | string | Ours. Shown, not compared or enforced. |
| `driver` | string | The driver this recipe was written for, and what an empty target directory gets created as. |
| `requires` | list of strings | Checks that must pass before anything is written. |
| `source` | string | Directory holding the mirrored files. Defaults to `src`. |
| `phases` | object | `pre-install` and `post-install`. Nothing else. |

### Phases

Two, and both optional. `pre-install` runs before the files land — packages they
import, deletions that clear the way. `post-install` runs after — anything that
reads them.

The phases between them, copying `src/` over the project and verifying the
result builds, belong to the installer. They cannot be reordered or skipped from
here: a recipe that could move them could put the copy before the deletions that
clear the way for it.

A phase is a **list**, not an object. The same action may appear many times and
runs in the order written. Each item holds exactly one action name; every other
key modifies it, which is what makes `{ "composer": [...], "dev": true }` read
the way it does.

### Actions

What the driver accepts, not what the format defines. A driver decides its own
list, and one that cannot execute an action refuses the recipe rather than
skipping it quietly. The installer names what it knows when handed something it
does not, so `--dry-run` with a deliberately wrong name is a cheap way to ask.

| action | value | modifiers |
|---|---|---|
| `composer` | list of packages | `"dev": true` |
| `packages` | list of JS packages | `"dev": true` |
| `remove` | list of paths, relative to the project root | none |
| `shadcn` | object: `preset`, `base`, `template`, `components`, `pointer` | none |
| `artisan` | list of command strings | none |

**`composer`** entries must match
`/^[a-z0-9]([_.-]?[a-z0-9]+)*\/[a-z0-9]([_.-]?[a-z0-9]+)*(:\S+)?$/i` —
`vendor/package`, optionally `vendor/package:^2.0`. The shape check exists to
refuse a "package" called `--ignore-platform-reqs`, which composer would obey as
a flag.

**`packages`** entries must match
`/^(@[a-z0-9][\w.-]*\/)?[a-z0-9][\w.-]*(@\S+)?$/i`. Never name a package
manager: it is chosen from the project's lockfile — pnpm, yarn, bun, then npm.

**`shadcn`** identifiers must match `/^[a-z0-9][a-z0-9-]*$/i`. `components` is
either `"all"` or a list of names.

**`artisan`** has a trap. Each entry is split on whitespace; the first token must
match `/^[a-z][a-z0-9]*(:[a-z0-9][a-z0-9-]*)*$/i`, and **every token after it
must be a flag**, matching `/^--?[a-z0-9][a-z0-9-]*(=[\w.\/-]+)?$/i`.

```json
{ "artisan": ["wayfinder:generate --with-form"] }   ✅
{ "artisan": ["make:model Post"] }                   ❌ positional argument, refused
```

There is no way to pass a positional argument. If a file has to be generated,
ship it in `src/` instead.

`db:wipe`, `migrate:fresh`, `migrate:reset` and `migrate:rollback` are refused
outright.

### requires

| check | fails when |
|---|---|
| `fresh-project` | more than one commit, the starter kit pages are gone, or there are models besides `User` |

A failure here is a **question, not a verdict**: the user is shown what was seen
and asked whether to continue. `--force` answers yes in advance, and so does
running with no terminal.

Declare it when the recipe rewrites things it has no right to assume. Leave it
out when it does not — a recipe that only adds a module would never pass it and
should not be asking.

## What the installer will not do

A recipe that tries any of this fails the run:

- **Commands are argument lists, never strings.** Nothing reaches a shell, so
  `migrate; rm -rf /` arrives as one literal argument and dies there. `&&`, `;`
  and `|` cannot work.
- **Paths cannot leave the project**, in `remove` or in the archive itself. An
  archive with one bad entry is refused whole rather than unpacked halfway.
- **Unknown actions, drivers and checks are refused before anything runs** —
  the whole schema, not the offending line.

None of this protects anyone from a recipe they should not have trusted. A
recipe that can add a Composer package can already run code. See the installer's
[SECURITY.md](https://github.com/fullsystem/install/blob/main/SECURITY.md).

## Trying a change

The installer fetches from GitHub, never from a working copy, so a change has to
be pushed before a run sees it:

```bash
cpx fullsystem/install ../throwaway-app --recipe={org}/{repo} --dry-run
```

Read the dry run before dropping `--dry-run`. What it prints is the whole plan;
if something in there is not what you meant, it is cheaper to find out now than
after the rollback.

**Verification only runs what the project declares.** The installer looks for
`composer lint`, `npm run build` and `composer test`, and skips whichever the
project does not have. A fresh `laravel/react-starter-kit` declares only the
build today, so a test shipped in a recipe may not run at install time. Ship
them anyway — they run for whoever works in the project afterwards.
