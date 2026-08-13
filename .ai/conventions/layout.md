# Layout

A layout is a context pages live inside: the chrome that surrounds them and the
meaning they inherit. `app-layout` is the control panel; a page under it is a
context within that context.

## When

You are writing a layout when chrome is shared by more than one page —
navigation, tabs, a frame, a heading structure. Chrome that exactly one page
uses, and always will, belongs to that page.

## Where

`layouts/`, and the path is the nesting:

```
layouts/app-layout.tsx                    an area root
layouts/app/settings-layout.tsx           wrapped by app-layout
layouts/app/settings/another-layout.tsx   wrapped by settings-layout

layouts/marketing-layout.tsx              another area root
```

- Every file is `<name>-layout.tsx`.
- A folder is named after the layout that wraps what is inside it, minus the
  `-layout` suffix.
- Roots are areas — `app`, `auth`, `empty`, `marketing`. They are siblings, never depths of one
  another.
- The export carries the suffix too: `app-layout.tsx` exports `AppLayout`. Names
  are read in JSX, where the path is not there to explain them.

Reading `layouts/app/settings/another-layout.tsx` gives you `app → settings →
another` without opening a file. That is the whole point of the layout.

## Shape

An area root renders its own chrome and `children`:

```tsx
import type { PropsWithChildren } from 'react';
import type { Breadcrumb } from '@/types/navigation';
import { Breadcrumbs } from '@/components/shell/breadcrumbs';

type Props = PropsWithChildren<{ breadcrumbs?: Breadcrumb[] }>;

export default function AppLayout({ children, breadcrumbs }: Props) {
    return (
        <div>
            {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
            {children}
        </div>
    );
}
```

A nested one renders its parent around itself:

```tsx
import type { PropsWithChildren } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { Breadcrumb } from '@/types/navigation';

type Props = PropsWithChildren<{ breadcrumbs?: Breadcrumb[] }>;

export default function SettingsLayout({ children, breadcrumbs }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* settings chrome: tabs, heading */}
            {children}
        </AppLayout>
    );
}
```

Composition is code — the child imports the parent. The path documents that
composition; it does not perform it.

## How a page gets one

The page declares the context it lives in and the data that context needs. It
does not compose anything:

```tsx
Profile.layout = [
  SettingsLayout,
  {
    breadcrumbs: [{ title: 'Profile settings', href: edit() }],
  },
];
```

A pair, always: the layout it lives in, and the props that layout takes. Only
the innermost layout is named — the ones above it come from that layout's own
imports, never from the page.

- **Never list layouts.** `[AppLayout, SettingsLayout]` is read as two nested
  layouts, not as a layout and its props, and the page has just taken over a
  composition that belongs to `settings-layout.tsx`. The second element is
  props or the pair is wrong.
- A layout with no props is written bare: `Profile.layout = SettingsLayout`.
- No `layout` property at all means **no layout**: nothing wraps the page, not
  even a background. Minimal chrome is a layout — pair with `EmptyLayout`. The
  two are not interchangeable and neither is the default.

## Rules

1. **The path is a claim, and it can lie.** `layouts/app/settings-layout.tsx`
   asserts that it renders `AppLayout`. Import something else and nothing
   breaks, nothing warns, and the tree is now fiction. Moving a layout between
   folders means changing what it wraps, and the reverse.
2. **A layout never knows which page it is wrapping.** It renders `children`. A
   layout that branches on the page inside it is two layouts.
3. **Props come from the second half of the page's pair.** What the page cannot
   know — the session, the navigation, the current user — comes from shared
   props, not from the page.
4. **Areas do not nest into each other.** Moving a page from marketing to the
   app changes which layout it pairs with, never the layouts themselves.

## Not this

| you are actually writing | goes to |
|---|---|
| chrome only one page will ever use | that page |
| a piece of the frame — sidebar, breadcrumb bar, user menu | `components/shell/` |
| a piece of frame that renders entity data | `components/domain/<context>/` |

A layout composes shell components and places them. It is not one of them: if
what you are writing has no `children`, it is not a layout.
