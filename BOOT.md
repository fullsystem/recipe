# BOOT

The installation of this project, run once, by whatever fetched it.

**This file deletes itself at the end** — or rather, whoever ran it deletes it.
That is the record: there is no install log and no marker, so the absence of
`BOOT.md` is what says this project has been booted, and what stops a later
session from booting it again. While it is here, the job is unfinished.

Three things, and then `AGENTS.md` takes over.

## 1. Give the project its name

This repository is a template and does not know what it is called. Wherever it
would name itself, it says `{org}` and `{repo}` instead — in `schema.json`, in
the documentation, anywhere a repository belongs.

If whoever ran you already asked for an organisation and a repository, use those
answers. Otherwise ask now, one at a time:

> Which GitHub organisation will this recipe live in?

> And what should the repository be called?

Both are GitHub names: letters, digits, hyphens, underscores and dots, never
starting with a hyphen. A personal account is a valid organisation.

Find every occurrence rather than working from a list of files — what is here
changes, and a list goes stale:

```bash
grep -rnF -e '{org}' -e '{repo}' . --exclude-dir=.git
```

**Replace the ones that name this repository. Leave the ones that talk about
them.** The difference is visible in the line itself:

| | |
|---|---|
| `"name": "{org}/{repo}"` in `schema.json` | names the repository → replace |
| `# {org}/{repo}` as a document title | names the repository → replace |
| "if `{org}/{repo}` placeholders are still visible…" | talks about them → leave |
| "…lands in history as `feat: install {org}/{repo} 0.1.0`" | an example → leave |

Rewriting the second kind turns an explanation into nonsense: a sentence about
"the `acme` and `dashboard` placeholders" helps nobody, and the checks that look
for unfilled placeholders stop working.

Skip this file. It is about to be deleted, and rewriting it mid-run only makes
your own instructions harder to read.

Then run the search again and **show what is left**. Everything remaining should
be one of the explanations. Anything else is a broken reference.

## 2. Put it under git

If this is not a git repository yet, make it one — without asking. The next
thing anybody does here is change files, and a project with no history is one
where that cannot be undone.

```bash
git init
git add -A
git commit -m "chore: start <org>/<repo>"
```

After step 1, so the first commit already carries the project's name.

**Do not add a remote and do not create the repository on GitHub.** It almost
certainly does not exist yet; that is normal and not a problem to solve here.
Putting code into somebody's account is theirs to do. Give them the command once
and let them run it when they are ready:

```bash
git remote add origin git@github.com:<org>/<repo>.git
```

If it is already a repository, leave its setup alone: commit what changed and
say which branch they are on.

## 3. Nothing here needs installing

There are no dependencies to fetch and nothing to start. This repository is a
recipe: files that mirror a project root, and a `schema.json` saying what has to
happen for them to work. It is payload, not an application — it runs when it is
installed into somebody else's project, not here.

So there is no `composer install`, no `npm install`, no dev server. If you were
expecting one, that expectation came from somewhere else.

## Done

The project is named and under git. **Say so, and stop.**

Whoever ran this deletes `BOOT.md` now. Then `AGENTS.md` is in charge: read it
and work from it. It is what knows what this repository is for and what happens
next — including what to ask the user, which is not something to guess at from
here.
