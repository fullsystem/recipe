# {org}/{repo}

A **recipe** for [fullsystem/install](https://github.com/fullsystem/install):
files that mirror a project root, and a `schema.json` declaring what has to
happen for those files to work.

This repository is not an application. There is no `composer.json` here and
nothing to run — it is a payload. It gets installed into somebody else's
project, which is where it becomes code that executes.

## Where the documentation lives

`README.md` is for humans: what this recipe is and what installing it does. It
sells the thing.

`SKILL.md` is for an assistant pointed here by URL with nothing else read, asked
to start a project from this recipe. It drives `fullsystem/install` and stops at
the handoff.

This file is for whoever changes what is in this repository. Everyone
contributing is assumed to be doing it with an assistant, and this is what the
assistant reads.

`.ai/` holds documentation too long for this file. Read what is in there before
assuming this file is everything. It is empty for now: the directory is the
convention, not a promise that it has been filled in.

## The two parts

```
schema.json     what has to happen for the files to work
src/            files that mirror the project root
```

`src/resources/js/pages/dashboard.tsx` lands at
`resources/js/pages/dashboard.tsx`. No path mapping, nothing to configure.

Anything outside `src/` — this file, the README, the licence, CI config — stays
here and never reaches a project. `src` is the default; a recipe keeping its
files elsewhere says so in the schema's `source`.

Files are copied over whatever is there, and directories are created as needed.
Files already in the project that this recipe does not ship are left alone —
only `remove` deletes.

## Working here: files first, schema second

The schema describes what the files need. It cannot be written before they
exist, and guessing it up front produces a schema that has to be rewritten
anyway.

1. **Build in `src/`.** Pages, layouts, components, routes, tests. Put each file
   where it belongs *in the installed project*, not where it would sit here.
2. **Then read your own `src/` and derive the schema.** Every entry should trace
   back to something that is actually there:
   - a frontend import that is not relative and not already in the target
     project → `packages`
   - a backend class the framework does not ship → `composer`, with
     `"dev": true` if only the tests use it
   - a file of the project's that this recipe makes wrong → `remove`
   - something imported but not shipped, like generated route helpers →
     `post-install`
   - something that has to exist before these files land → `pre-install`

**`remove` is the dangerous one.** Two kinds of path qualify and only two: files
that conflict with ours without being overwritten by them, and files that would
break the build now that ours are in. A file this recipe simply does not use is
not a reason to delete it. If you cannot name the file of ours that replaces it,
or the breakage it causes, leave it alone.

**Ship tests**, with one caveat worth knowing. The installer verifies the result
before anyone is asked to keep it, but it only runs what the project declares:
it looks for `composer lint`, `npm run build` and `composer test`, and skips
whichever the project does not have. A fresh `laravel/react-starter-kit`
declares only the build today, so a test shipped in a recipe may not run at
install time. Ship them anyway — they run for whoever works in the project
afterwards, which is where they matter most.

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

Two, and both optional:

- **`pre-install`** runs before the files land — packages they import, deletions
  that clear the way, components they build on.
- **`post-install`** runs after — anything that reads them. A generator that
  reads the routes a recipe just shipped cannot run before they are there.

The phases between them — copying `src/` over the project, and verifying the
result builds — belong to the installer. They cannot be reordered or skipped
from here, and that is deliberate: a recipe that could move them could put the
copy before the deletions that clear the way for it.

A phase is a **list**, not an object. The same action may appear many times and
runs in the order written:

```json
"pre-install": [
  { "remove": ["routes/web.php"] },
  { "composer": ["acme/router"] },
  { "remove": ["config/router.php"] }
]
```

Each item holds exactly one action name. Every other key modifies it, which is
what makes `{ "composer": [...], "dev": true }` read the way it does.

### Actions

What the driver accepts, not what the format defines — a driver decides its own
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

Worth knowing, because a recipe that tries any of it fails the run:

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

## Placeholders

`{org}` and `{repo}` stand wherever this repository is named. A fork rewrites
them and points at itself; that is what makes forking this a two-minute job
rather than a hunt through the documentation.

They are placeholders, not a naming convention — do not invent new ones, and do
not rewrite other mentions of a repository that are meant to stay, like the
links to `fullsystem/install`.

## Trying a change

There is nothing to run here. A change is tested by installing it into a project
you do not mind losing — and the installer fetches from GitHub, never from a
working copy, so it has to be pushed first:

```bash
cpx fullsystem/install ../throwaway-app --recipe={org}/{repo} --dry-run
```

Read the dry run before dropping `--dry-run`. What it prints is the whole plan;
if something in there is not what you meant, it is cheaper to find out now than
after the rollback.
