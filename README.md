# {org}/{repo}

A recipe for [fullsystem/install](https://github.com/fullsystem/install): files
that mirror a project root, and a `schema.json` saying what has to happen for
them to work.

This one does not do anything yet. It installs cleanly, replaces the starter
kit's welcome page so you can see that it did, and declares no packages,
deletions or commands. That is the starting point — what it becomes is written
from here.

## How to use it

Give this URL to Claude, Cursor, or whatever you code with:

```
https://raw.githubusercontent.com/{org}/{repo}/main/SKILL.md
```

Or run the installer yourself, against a Laravel project using Inertia and
React:

```bash
cpx fullsystem/install --recipe={org}/{repo}
```

Either way [fullsystem/install](https://github.com/fullsystem/install) does the
work: it installs on a branch, proves the result builds, and puts everything
back if anything fails. Nothing is pushed.

## Writing it

`AGENTS.md` is the reference — the schema, the phases, the actions, and what the
installer refuses. The short version:

- files go in `src/`, laid out as they should sit in the installed project
- `schema.json` declares what those files need around them: packages to install,
  paths to remove, commands to run
- the files come first and the schema follows from them, because what a recipe
  needs is not knowable until the files exist

## License

MIT.
