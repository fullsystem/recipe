# Primitive component

A primitive knows nothing but its own props. A control, a surface, a piece of
text. It would work unchanged in a different product.

## When

You are writing a primitive when the component has no subject and no place: it
does not know what it is showing, and it does not know where on the screen it
sits. It is style and behaviour, nothing else.

## Where

```
resources/js/components/ui/
```

The same folder shadcn installs into, and deliberately so: shadcn writes its
components into the project rather than into `node_modules`, so they are the
theme's primitives — there is no "theirs" and "ours" to separate. A primitive
the theme writes itself goes in beside them.

File is `kebab-case.tsx`. Export is named, never default.

Primitives are the one kind that takes **no suffix**: `Badge`, not
`BadgePrimitive`. They are already nouns, and the shadcn registry names them
this way — every `shadcn add` would arrive fighting the rename.

## Shape

Props in, `cn()` over the incoming `className`, everything else forwarded.
Variants through `cva`:

```tsx
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-md px-2 py-0.5 text-xs', {
    variants: { tone: { neutral: 'bg-muted text-muted-foreground', danger: 'bg-destructive text-white' } },
    defaultVariants: { tone: 'neutral' },
});

function Badge({ className, tone, ...props }: ComponentProps<'span'> & { tone?: 'neutral' | 'danger' }) {
    return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { Badge, badgeVariants };
```

## Rules

1. **Imports point one way**: `domain` → `shell` → `ui`. A primitive importing
   from either of the others is no longer a primitive.
2. **No route, no session, no fetch.** Everything it renders arrived as a prop.
3. **Named for what it is** — `Badge`, `Card`, `Input` — never for where it is
   used. `SidebarBadge` is a primitive that has given up.
4. **shadcn's components are yours.** They live in the project, so edit them in
   place. Do not wrap one in another file to change a colour.

## Not this

| you are actually writing | goes to |
|---|---|
| something with a slot it does not fill itself | `components/shell/` |
| something with a subject — it shows *invoices*, *notifications* | `components/domain/<context>/` |
