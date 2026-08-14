# 05 · Prove the install

Everything so far was proved against a harness. This step proves it against the
thing the recipe is actually for: a real project, installed into by the real
installer, from the real repository.

**Needs** — `04` done. `.ai/target.md` for `verification` — what has to build,
pass, or appear on screen — and `landing` for how a virgin base is created.

**Produces** — `.ai/proof.md`: the exact commands, what was installed onto, what
was checked, and the commit it was proved at.

**Done when** — an install onto a virgin landing base finished without rolling
back, and everything `verification` names holds in the result.

## It has to be pushed first

The installer fetches `main` from GitHub as a zip. It does not read a working
copy, and there is no flag that makes it. So a local change proves nothing:
commit, push, and only then run.

This catches people out at exactly this step, because everything before it
worked locally. If the plan you see does not match the schema you are looking
at, that is the answer — you are testing an older commit.

## Onto a virgin base, never a project someone owns

Create the landing base fresh, the way `target.md` describes, in a throwaway
directory. Never run this against the harness, and never against anything with
work in it: the installer works on a branch and rolls back, but a rollback that
has to be trusted is not a thing to arrange deliberately.

Read the plan before writing anything. It prints every package, every deletion
and every command the schema declares, and writes nothing:

```bash
cpx fullsystem/install <path> --recipe=<org>/<repo> --dry-run
```

If what it prints is not what you meant, the fix is in `04`, not here.

Then run it for real, without `--dry-run`.

## What a failure is telling you

The installer rolls the project back to where it started, so a failed run costs
time and nothing else. What it costs is only recovered if the failure is read
properly:

| where it stopped | what it means |
|---|---|
| a check | the recipe's `requires` does not match the base it was pointed at |
| `pre-install` | a package name, or a package that does not exist |
| copy | the payload is not where the schema says it is |
| `post-install` | a command whose package was never installed — the classic one |
| verify | the payload does not build in a project, whatever the harness said |

The last row is the one this step exists for. Everything before it, the harness
could have caught. That one it structurally cannot, because the harness is not
the landing base.

## Then check what `verification` asked for

The installer's own verification is not yours. It runs what the project
declares — `composer lint`, `npm run build`, `composer test` — and **skips
whatever the project does not have**. A stack that declares none of them
installs with zero verification and reports success.

So go and check the things `target.md` named: open the page, run the command,
look at the artefact. If the answer is that the installer verified nothing at
all, that is a finding about this recipe, and it belongs in `proof.md` where the
next person can read it.

## Record it

`.ai/proof.md`, and keep it short and exact:

- the commit that was installed, by hash
- how the landing base was created, verbatim
- the install command, verbatim
- what was checked afterwards, and what was seen
- anything the installer skipped

The hash is the important part. A proof without one describes a run nobody can
locate, and the recipe moves on the next commit.

Re-run this after any change to the payload or the schema. It is the only step
that exercises the whole thing, and it is cheap compared to finding out from
somebody who installed it.
