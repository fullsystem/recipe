# Rules

One rule per file, named for the rule. These are not style preferences: each one
exists because getting it wrong produces code that works here and breaks in the
project the recipe installs into — the failure the harness is least able to show
you.

Read the rule before writing the file it governs, not after review.

| rule | in one line |
|---|---|
| [where-a-file-goes](where-a-file-goes.md) | `src/` mirrors the target project's root and ships; `workbench/` stands in. The path is the overwrite. |
| [imports-go-through-the-alias](imports-go-through-the-alias.md) | `@/…`, never a relative path into `workbench/`. |

## Writing a new rule

A rule earns a file when it is a decision an agent will get wrong by default —
usually because the harness is more forgiving than the installed project. If the
answer is obvious from reading the code, it is documentation, not a rule, and it
belongs in `AGENTS.md` or nowhere.

Keep the shape: what the rule is, why it exists, how to apply it, and what
getting it wrong looks like. The last section is the one that does the work.
