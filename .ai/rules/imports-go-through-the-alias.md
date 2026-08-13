# Import through `@/`, never relatively into `workbench/`

Write imports the way the installed project will:

```tsx
import { Input } from '@/components/ui/input';   // ✅
```

Never reach across the two roots by path:

```tsx
import { Input } from '../../../../workbench/resources/js/components/ui/input';   // ❌
```

That import compiles here and breaks on arrival. It is the one import that is
always wrong, in either direction.

## Why

`@` means `resources/js` in a project. Here it means two directories, tried in
order:

```
src/resources/js         the recipe's own files — what ships
workbench/resources/js   stand-ins for what the target project already has
```

The order is the point. Ship `src/resources/js/components/ui/input.tsx` and it
shadows the workbench copy while you develop, exactly as it will overwrite the
starter kit's file once installed. A relative path pins the import to a
directory that does not exist in the project, and defeats the shadowing on the
way.

Pages work the same way and by the same rule: names stay plain — `billing`,
`settings/appearance` — because that is what an installed project resolves. No
namespacing scheme. A namespace would mean developing against a name that does
not survive installation.

## Doing it

The fallback is written twice and both have to agree:

| file | what it feeds |
|---|---|
| `vite.config.ts` → `resolve.alias` | the bundler |
| `tsconfig.json` → `compilerOptions.paths` | the editor and `tsc` |
| `workbench/resources/js/app.tsx` | the Inertia page resolver, same two roots |

Adding a root means editing all three. Editing one is the failure mode: the
build passes and the editor reports a missing module, or the reverse.

## Getting it wrong

`laravel-vite-plugin` ships its own `@` → `/resources/js`, and Vite's alias step
runs before every plugin, including `enforce: 'pre'` ones. That is why the alias
here is the **array** form with a `customResolver` — an object would lose to the
plugin's default and silently resolve `@/…` to a directory outside this
repository.

If you touch `resolve.alias`, prove the fallback still works rather than
assuming: put a file with a marker in `src/`, build, and grep the bundle for the
marker. An import resolving to the wrong root does not fail — it quietly gives
you the other file.
