# {org}/{repo}

A **recipe** for [fullsystem/install](https://github.com/fullsystem/install):
files that mirror a project root, and a `schema.json` declaring what has to
happen for those files to work.

What is in `src/` is not an application — it is a payload. It gets installed
into somebody else's project, which is where it becomes code that executes.

The root around it is a different thing, and it is there so the payload can be
worked on: a Composer package requiring `orchestra/testbench`, whose
[Workbench](https://packages.tools/workbench.html) boots a Laravel application
that serves `src/` for real, with Inertia, React and hot reload. None of that
scaffolding — `composer.json`, `package.json`, `vite.config.ts`,
`testbench.yaml`, `workbench/` — reaches an installed project. See
[Trying a change](#trying-a-change).

## Where the documentation lives

`README.md` is for humans: what this recipe is and what installing it does. It
sells the thing.

`SKILL.md` is for an assistant pointed here by URL with nothing else read, asked
to start a project from this recipe. It drives `fullsystem/install` and stops at
the handoff.

This file is for whoever changes what is in this repository. Everyone
contributing is assumed to be doing it with an assistant, and this is what the
assistant reads.

`.ai/` holds documentation too long for this file, and `.ai/rules/` is the part
you cannot skip: one file per rule, on how code gets written here and the
decisions that go wrong by default. Start at [`.ai/rules/index.md`](.ai/rules/index.md),
and read the rule before writing the file it governs rather than after.

The rules are about building a recipe, not about the theme a recipe installs.
Like everything outside `src/`, they stay in this repository.

## The two parts

```
schema.json     what has to happen for the files to work
src/            files that mirror the project root
```

`src/resources/js/pages/dashboard.tsx` lands at
`resources/js/pages/dashboard.tsx`. No path mapping, nothing to configure.

Anything outside `src/` — this file, the README, the licence, CI config, the
Workbench scaffolding — stays here and never reaches a project. `src` is the default; a recipe keeping its
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

**Name a file for what it is, not for what it replaces.** Landing on top of
`resources/js/pages/welcome.tsx` is a decision with a cost — the project's page
is gone, and only the installer's rollback brings it back. A recipe proving it
installed does not need to destroy anything to do it, which is why the example
page here is `how-to-start`. Overwrite a project's file when replacing it *is*
the recipe; never merely to be noticed.

### Imports, and the two component roots

Write them the way the installed project will — `@/components/ui/input` — never
a relative path into `workbench/`.

`@` means `resources/js` in a project. Here it means two directories, tried in
order:

```
src/resources/js         the recipe's own files — what ships
workbench/resources/js   stand-ins for what the target project already has
```

`src/` first is the whole point. Ship `src/resources/js/components/ui/input.tsx`
and it shadows the workbench copy while you develop, exactly as it will overwrite
the starter kit's file once installed. A relative import reaching into
`workbench/` compiles here and breaks on arrival; it is the one import that is
always wrong.

Which root a component belongs in is the same question as whether the recipe
ships it. Something you only need in order to *see* a page — a starter kit
button, a layout the recipe assumes is already there — goes in `workbench/`.
Anything in `src/` is a promise to install it.

The list is written twice, in `tsconfig.json`'s `paths` and in `vite.config.ts`
— the editor reads one, the bundler the other. Change one and change the other.

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

Two ways, answering two different questions.

### Locally, with Workbench

```bash
composer install
npm install
composer dev
```

That puts the recipe's own pages on `http://127.0.0.1:8000` — `src/` served by a
real Laravel application, not a preview of it — and edits to
`src/resources/js/**` hot-reload.

`composer dev` is one terminal running four processes under `concurrently`: the
Testbench server, a queue listener, Pail, and Vite. They live and die together
(`--kill-others`), so a crash in any one of them takes the whole thing down —
read the prefixes in the output to see which.

`composer run serve` on its own is the same server without Vite, and Blade will
die on a missing manifest unless `npm run build` has run at least once. Use it
when you want the built assets rather than the dev server; otherwise use
`composer dev`.

Four pieces make that work, and it is worth knowing which is which:

| | |
|---|---|
| `testbench.yaml` | Configures the skeleton. Its `sync` block symlinks `workbench/public` onto the skeleton's public directory, which is the only reason Vite and Blade agree on where the manifest lives. |
| `workbench/` | The throwaway application — routes, models, seeders, the Inertia root view, and the `app.tsx` that mounts React. Committed here, never shipped. |
| `vite.config.ts` | Entry points under `workbench/resources`, `publicDirectory` pointed at the symlink. |
| `workbench/resources/js/app.tsx` | Resolves pages straight out of `../../../src/resources/js/pages`. |
| `eslint.config.js` | The starter kit's, with the paths moved: its `resources/js` is our `workbench/resources/js`. Copy a newer one over and the `ignores` block silently stops matching — 45 vendored shadcn files start failing the lint and nothing tells you why. |
| `vite.config.ts` `resolve.alias` | Makes `@/…` try `src/` before `workbench/`. See [Imports](#imports-and-the-two-component-roots). It has to be the array form: `laravel-vite-plugin` ships its own `@` → `/resources/js`, and only an array puts ours ahead of it. `customResolver` carries the fallback, and Vite 9 drops it — that is the line to rewrite when the warning becomes an error. |

That last line is the whole trick, and it is deliberately dumb: the page name
the harness resolves is the page name an installed project resolves.
`Inertia::render('how-to-start')` finds
`src/resources/js/pages/how-to-start.tsx` here and
`resources/js/pages/how-to-start.tsx` there. A namespacing scheme — the sort a
package shipping pages at runtime needs — would buy nothing and would mean
developing against a name that does not survive installation.

What the harness does **not** carry is the rest of a starter kit. There is no
layout, no `ziggy`, no shadcn, no auth scaffolding. A page in `src/` that
imports any of it renders here only if the recipe ships it too — which is the
same bar the installed project sets, so it fails early rather than quietly.

The rest of the scripts are Workbench's own: `composer run build` rebuilds the
SQLite database and publishes assets, `composer run clear` purges the skeleton,
`composer run prepare` re-runs package discovery.

### For real, by installing it

The question Workbench cannot answer yet — whether the payload lands correctly
in a project. Install into one you do not mind losing, and note the installer
fetches from GitHub, never from a working copy, so a change has to be pushed
first:

```bash
cpx fullsystem/install ../throwaway-app --recipe={org}/{repo} --dry-run
```

Read the dry run before dropping `--dry-run`. What it prints is the whole plan;
if something in there is not what you meant, it is cheaper to find out now than
after the rollback.
