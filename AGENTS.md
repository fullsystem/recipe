# {org}/{repo}

This repository builds a **recipe** for
[fullsystem/install](https://github.com/fullsystem/install): files that mirror a root folder (`src/`) and a `schema.json` declaring what has to happen for them
to work.

This file holds no knowledge of its own. It is an orchestrator, and the
knowledge lives in two places:

| | |
|---|---|
| `.ai/steps/` | The sequence that takes this repository from empty template to published recipe. Numbered and ordered; each step declares what it needs and what it leaves behind. Never ships. |
| `src/.ai/skills/` | How-to knowledge the steps call on — starting with `write-knowledge.md`, the base for making and recording structural decisions. Lives inside `src/` because it **ships**: every project this recipe installs into inherits it. |

## Where am I?

Do not assume you are at the beginning, and do not ask the user. Every step
declares a **done when** — a fact you can check by looking at this repository.
Read the steps in order and resume at the first one whose *done when* does not
hold.

- **None hold** — fresh template. Start at `00`.
- **Some hold** — the recipe is being built. Continue from the first unmet step.
- **All hold** — the recipe exists. Stop orchestrating: work by the rules and
  conventions the steps wrote into `.ai/`, and touch the steps again only if
  the recipe's target itself changes.

## Before doing anything

Knowledge grows while the work happens — decisions, conventions and facts land
in `.ai/` and `src/.ai/` as they are made. So before answering a question,
deriving a fact, or asking the user anything: **look for it in both first.** A
step's *Needs* names the files it is known to depend on; that list is a floor,
not the whole of what may already be written.
