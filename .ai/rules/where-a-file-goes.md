# Where a file goes

## `src/` is the project's root, mirrored

Strip the `src/` and you have the path the file will occupy once installed:

```
src/resources/js/pages/billing.tsx   →   resources/js/pages/billing.tsx
src/app/Policies/PostPolicy.php      →   app/Policies/PostPolicy.php
```

No path mapping, nothing to configure, directories created as needed.

Which root it mirrors comes from `schema.json`'s `driver`, and that is what
decides the layout. `laravel-react` means a Laravel root, so files go where
Laravel puts them: `app/Policies/`, `app/Http/Requests/`, `database/migrations/`,
`resources/js/pages/`, `routes/`. Another driver is another framework and none
of those answers carry over — a Zend project organises by module. The question
is never where you want the file, it is where that framework would put it.

## `src/` ships, `workbench/` does not

Does the recipe ship this file?

- **Yes** → `src/`.
- **No** → `workbench/`, standing in for what the target project already has:
  starter kit components, auth pages, routes, the Blade root view, and anything
  generated (Wayfinder output, build artefacts).

Both mistakes are silent. A file left in `workbench/` compiles here and is
missing in the project — `@/` resolves from both roots, so nothing tells you
which one answered. A stand-in left in `src/` is copied into somebody's project.

## The path is the overwrite

A file in `src/` lands on whatever is already at that path: replaced, not
merged. The path is therefore a decision to destroy a file you have never seen.

Take a path the target already uses only when replacing that file *is* the
recipe, and say so in the `README.md`. `dashboard.tsx` is right for a recipe
that replaces the dashboard, wrong for one that needed somewhere to put a chart.

This repository once shipped a `welcome.tsx` to prove installs worked, which
bought an easy preview — `/` already routes `welcome` — with the user's page.
It ships nothing now.

Nothing catches this — build, harness and install all pass. Read the paths under
`src/` and ask of each whether taking it was the point.
