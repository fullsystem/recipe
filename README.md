# {org}/{repo}

A recipe: a Laravel + Inertia + React frontend, the packages it needs, and the
conventions for working in it — installed into a project in one command, and
documented well enough that an assistant can build on it without inventing
anything.

## How to use it

Give this URL to Claude, Cursor, or whatever you code with:

```
https://raw.githubusercontent.com/{org}/{repo}/main/SKILL.md
```

That is the whole instruction. It checks what your machine is missing, runs the
installer, and hands over to the documentation that comes with the project.

Or do it yourself:

```bash
cpx fullsystem/install --recipe={org}/{repo}
```

Either way [fullsystem/install](https://github.com/fullsystem/install) does the
work: it installs on a branch, proves the result lints, builds and tests, and
puts everything back if any of that fails. Nothing is pushed.

## What you get

| | |
|---|---|
| adds | `laravel/reverb`, `laravel/horizon`, `intervention/image`, `nunomaduro/essentials` |
| adds, dev | `baconfy/factory-payload` |
| adds, JS | `@laravel/echo-react`, `react-markdown`, `pusher-js`, `date-fns` |
| runs | `shadcn init` and `add` — preset `vega`, template `laravel`, every component |
| then | `php artisan wayfinder:generate --with-form` |

The frontend itself is being written. What is here today is the shape of it,
not the finished thing.

## Why it is built this way

Most projects assume a person will read the docs and keep the conventions in
their head. That assumption stopped being true, and what came out the other side
is a lot of software that works and is not safe.

So the conventions ship with the project. How to write a policy, how to validate
a request, how anything here is meant to be done: it is in the repository, next
to the code, and it is what an assistant reads before writing anything. Not a
style guide nobody opens — the thing that is actually followed.

## Making it your own

This recipe is a starting point, and forking it is expected. Change what it
installs, replace the frontend, keep the parts that suit you.

Everything that names this repository is written as `{org}` and `{repo}`, so a
copy points at itself rather than at where it came from. The skill fills them in
when it sets a project up; if you fork by hand, they are what to search for.

## License

MIT.
