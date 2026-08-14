# 00 · Orientation

What everything here means, before any of it is touched.

**Needs** — nothing.

**Produces** — nothing to create: the template ships with `src/.ai/` already
seeded — `skills/write-knowledge.md`, the base every recipe delivers onward.

**Done when** — `src/.ai/` exists. The *reading*, though, is never done:
**read this file again in every new session** — it is context, not work. Then
go find where the sequence actually stands, the way `AGENTS.md` describes.

## What a recipe is

Files that mirror a root folder, plus a `schema.json` declaring what has to
happen for them to work. That is the whole format:

```
schema.json     what has to happen — packages, removals, commands, the driver
src/            files that mirror the target folder
```

Strip the `src/` from a path and you have where the file lands:
`src/app/Example.php` becomes `app/Example.php` in somebody's project — landing
**on top of** whatever is there. The path *is* the decision to overwrite.

[fullsystem/install](https://github.com/fullsystem/install) executes it: fetches
this repository from GitHub as a zip, works on a branch in the target project,
installs what the schema declares, copies `src/` over the root, verifies the
result, and rolls everything back if verification fails. Two consequences worth
carrying at all times:

- **It fetches `main` from GitHub.** A local change proves nothing until
  pushed.
- **Everything outside `src/` stays here.** The steps, the skills, the harness
  this repository will grow — none of it ships. `src/` is a promise to install;
  the rest is a promise never to leave.

`src/.ai/` is the one exception worth naming now: it ships. What lands in it is
delivered to whoever uses the recipe. `./.ai/` — this directory — is the
repository's own and never leaves.

## Vocabulary

The steps use these words precisely:

| word | means |
|---|---|
| **product** | what the recipe delivers, in one sentence |
| **landing base** | the project it is installed *onto* — not the same thing as what it delivers |
| **boundary** | the line between what the landing base already provides and what the recipe brings |
| **harness** | a real instance of the stack, living here, serving `src/` as if installed |
| **stand-in** | a harness file imitating something the landing base provides; never ships |
| **payload** | the contents of `src/` — the only part that ships |
| **driver** | the installer's adapter for a stack; decides which schema actions exist and what an empty directory becomes |

## What this repository is right now

One of three things, and `AGENTS.md`'s resume mechanic tells you which: a fresh
template (nothing built — the sequence starts), a recipe under construction
(resume at the first unmet step), or a finished recipe (stop orchestrating and
work by its own rules in `.ai/`).

If `{org}/{repo}` placeholders are still visible around the repository, the
identity work of step `01` has not happened yet — that is normal for a fresh
template, and fixing it is that step's job, not this one's.
