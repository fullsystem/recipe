# .ai

How code gets written here. Read by trigger — find the row for what you are
about to do, open that file, then write.

## I am about to…

| … | read |
|---|---|
| add any file at all | [rules/where-a-file-goes](rules/where-a-file-goes.md) |
| write an import | [rules/imports-go-through-the-alias](rules/imports-go-through-the-alias.md) |
| add a screen | [conventions/page](conventions/page.md) |
| write a layout, or give a page one | [conventions/layout](conventions/layout.md) |
| write a component, and not know which folder | all three below — the split is a slot and a subject |
| … style and behaviour, nothing else | [conventions/primitive-component](conventions/primitive-component.md) |
| … an arrangement with a slot it does not fill | [conventions/shell-component](conventions/shell-component.md) |
| … the content itself, belonging to one context | [conventions/domain-component](conventions/domain-component.md) |

## The two shelves

`rules/` is what an agent gets wrong by default — transversal, few, and each one
exists because the harness is more forgiving than the installed project.
Start at [rules/index](rules/index.md).

`conventions/` is one file per artefact: where it goes, what it is called, what
shape it takes. Flat on purpose — the filename is the whole address, and the
grouping belongs in the table above rather than in the filesystem.

Nothing here ships. These describe building a recipe, not the theme a recipe
installs.
