---
name: fullsystem-app
description: Install this recipe into a Laravel project — check that php, composer and npm work, then run `cpx fullsystem/install --recipe={org}/{repo}` against the project, which executes the recipe's schema.json: its packages, its deletions, its files and its commands. Hands over to the project's AGENTS.md afterwards. Use when someone wants this recipe in their project, or points at this file.
---

# Installing this recipe into a Laravel project

Someone wants what this recipe builds — the frontend, the packages it needs, and
the conventions that come with them. One command puts all of it into their
project:

```bash
cpx fullsystem/install --recipe={org}/{repo}
```

That is the job. The recipe is a `schema.json` plus a directory of files, and
that command is what executes it: it installs the packages the schema declares,
removes what the schema says to remove, copies the files over the project, and
runs whatever has to run afterwards.

**You are not doing any of that by hand.** The installer works on a branch,
validates every file in the archive before unpacking it, proves the result
lints, builds and tests, and puts the project back exactly as it was if any of
that fails. Downloading and copying the files yourself throws all of it away and
leaves nobody a way back.

Three things happen, and then you hand over.

## 1. Check the machine

```bash
php --version
composer --version
npm --version
```

All three are required. PHP 8.3 or newer, with the `zip` and `curl` extensions —
`php -m | grep -E 'zip|curl'` answers that. Node is what the verification step
builds with, so npm missing is not something to work around.

`cpx` runs the installer without installing it, so there is nothing else to set
up.

### If something is missing

**Ask before installing anything.** A language runtime is a change to the user's
machine outside this project, and it is not yours to decide. Say what is
missing, what you propose to run, and wait for a yes.

If they agree, you may attempt it **only** where a package manager is already
there and needs no password:

| platform | attempt |
|---|---|
| macOS with Homebrew | `brew install php composer node` |
| anywhere else | do not attempt — send them to the documentation below |

Do not install Homebrew, or any other package manager, to make this work. That
is a far larger change than they agreed to.

**You cannot type a password.** Anything through `sudo`, most Linux package
managers, every Windows installer: stop, hand the command over, and let them run
it. Do not retry, and do not look for a way around the prompt.

When you cannot install it, say what is missing, what you tried and what it
said, then point at the right one of these and stop:

| missing | where to send them |
|---|---|
| PHP or Composer | https://getcomposer.org/download/ |
| Node and npm | https://nodejs.org/en/download |
| all of it, macOS or Windows | https://herd.laravel.com — one installer, for people who do not want to assemble a PHP toolchain by hand |

## 2. Run it against the project

**Find the Laravel project first.** That is what this installs into: a directory
with `artisan` and `composer.json` in it, using Inertia and React. The installer
detects that itself and refuses anything it does not recognise, which is the
behaviour you want — do not talk it into running somewhere it declined.

Two cases are also fine, and both are the installer's to handle rather than
yours:

- **an empty directory** — it offers to create the Laravel project first, then
  installs into it
- **the current directory**, when that is already the project — the path
  argument defaults to it

Read the plan before writing anything. This prints every package, every deletion
and every command the schema declares, and writes nothing:

```bash
cpx fullsystem/install <path> --recipe={org}/{repo} --dry-run
```

Show the user what it says, then run it for real without `--dry-run`.

What happens then is the installer's, not yours:

1. it detects the project, or offers to create one in an empty directory
2. it runs its checks — this recipe requires a project nobody has built on yet,
   and being asked about that is normal
3. it works on `feat/fullsystem-install`, branched from wherever they were
4. it installs the packages, lands the files, runs what has to run after
5. it verifies: lint, build, test
6. it commits, and **asks whether to apply the branch** to the one they started
   on

**Answer nothing on their behalf.** That last question is the user's, and so is
the one about a project that is not fresh. Put the question in front of them.

If it fails, the project is already back to where it started — the rollback is
part of the run. Report what failed and what it said. Do not try to finish the
install by hand.

## 3. Hand over to `AGENTS.md`

The recipe is installed and the project builds. Your part is done.

`AGENTS.md` in the project is what knows how to write code here: the
conventions, the patterns, where things go, what has to be true before something
is considered finished. **Read it now**, and work from it rather than from
anything you assumed while reading this file.

If the user has not said what they want to build yet, that is the conversation
to have next — and `AGENTS.md` is what tells you how to have it here.
