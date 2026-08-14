# BOOT

The installation of this project, run once, by whatever fetched it.

**This file deletes itself at the end** — or rather, whoever ran it deletes it.
That is the record: there is no install log and no marker, so the absence of
`BOOT.md` is what says this project has been booted. While it is here, the job
is unfinished, and running this again is how it gets finished.

Nothing here needs installing first. There are no dependencies to fetch and
nothing to start: this repository is payload, not an application. It runs when
it is installed into somebody else's project, not here.

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

Rewriting the second kind turns an explanation into nonsense, and the checks
that look for unfilled placeholders stop working.

Skip this file. It is about to be deleted, and rewriting it mid-run only makes
your own instructions harder to read.

Then run the search again and **show what is left**. Everything remaining should
be one of the explanations.

## 2. Put it under git

If this is not a git repository yet, make it one — without asking. Step 3 writes
a great deal, and a project with no history is one where none of it can be
undone.

```bash
git init
git add -A
git commit -m "chore: start <org>/<repo>"
```

After step 1, so the first commit carries the project's name, and before step 3,
so there is a baseline to go back to.

**Do not add a remote and do not create the repository on GitHub.** It almost
certainly does not exist yet; that is normal and not a problem to solve here.
Putting code into somebody's account is theirs to do. Give them the command once
and let them run it when they are ready:

```bash
git remote add origin git@github.com:<org>/<repo>.git
```

If it is already a repository, leave its setup alone: commit what changed and
say which branch they are on.

## 3. Work the steps

This is the bulk of it. The recipe does not exist yet — deciding what it
delivers, proving it, and building it is what `.ai/steps/` describes, and
working through that sequence is what booting this project means.

The knowledge lives in two places:

| | |
|---|---|
| `.ai/steps/` | The sequence that takes this repository from empty template to finished recipe. Numbered and ordered; each step declares what it needs and what it leaves behind. Never ships. |
| `src/.ai/skills/` | How-to knowledge the steps call on — starting with `write-knowledge.md`, the base for making and recording structural decisions. Lives inside `src/` because it **ships**: every project this recipe installs into inherits it. |

### Where am I?

**Do not assume you are at the beginning, and do not ask the user.** Every step
declares a **done when** — a fact you can check by looking at this repository.
Read the steps in order and resume at the first one whose *done when* does not
hold.

- **None hold** — fresh template. Start at `00`.
- **Some hold** — this boot was interrupted, or an earlier one was. Continue
  from the first unmet step; do not redo what already holds.
- **All hold** — the work is finished. Go to *Done* below.

That check is why an interrupted boot is safe to re-run: the file is still here
because the sequence did not finish, and the sequence knows where it stopped.

### Before doing anything

Knowledge grows while the work happens — decisions, conventions and facts land
in `.ai/` and `src/.ai/` as they are made. So before answering a question,
deriving a fact, or asking the user anything: **look for it in both first.** A
step's *Needs* names the files it is known to depend on; that list is a floor,
not the whole of what may already be written.

### When a step needs the user

Some of them do — `01` opens with an interview, and it is deliberate. Ask what
the step tells you to ask, in the order it gives, and do not batch several
questions into one message. Answers to a form are worse than answers to a
question.

## Done

Every step's *done when* holds. **Say so, and stop.**

Whoever ran this deletes `BOOT.md` now, and that deletion is what marks the boot
as finished. From there `AGENTS.md` is in charge: read it and work from it. The
steps are spent — they built the recipe, and they are not how it is maintained.
