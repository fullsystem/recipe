# Page

A page is a place, not content. It says which layout it lives in, takes what the
server sent, and puts domain components where they go. If you are writing
behaviour in a page, it belongs somewhere else.

## When

Every screen the router can reach is a page. There is no other reason for a file
to be in `pages/`.

## Where

```
resources/js/pages/
```

The path is the page's name, and the name is what the server renders:
`pages/settings/profile.tsx` is `Inertia::render('settings/profile')`. Names stay
plain — no namespaces, no prefixes — because that is what an installed project
resolves.

**File name and export diverge here, and on purpose.** The file is the route
name and cannot carry a suffix; the export is read in JSX and does:

```
pages/login.tsx            →  export default function LoginPage()
pages/settings/profile.tsx →  export default function ProfilePage()
```

A recipe's pages go in `src/resources/js/pages/`. They arrive **unrouted**: a
recipe cannot ship `routes/web.php` without destroying the project's own, so
whoever installs it writes the route. Say so in the recipe's `README.md`.

## Shape

Declare the layout, render the slots, and nothing else:

```tsx
import { Head } from '@inertiajs/react';
import { PageHeader } from '@/components/shell/page-header';
import { InvoiceTable } from '@/components/domain/invoice/invoice-table';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/invoices';
import type { Invoice } from '@/types/invoice';

type Props = { invoices: Invoice[] };

export default function InvoicesPage({ invoices }: Props) {
    return (
        <>
            <PageHeader title={"Invoices"} breadcrumbs={{ breadcrumbs: [{ title: 'Invoices', href: index() }] }} />
           
            <InvoiceTable invoices={invoices} />
        </>
    );
}

InvoicesPage.layout = AppLayout;
```

The layout pairing is the page's one declaration about itself — see
[layout](layout.md) for the pair, the bare form, and what omitting it means.

## Rules

1. **A page assembles; it does not implement.** Validation, submitting, fetching,
   formatting a subject — all of that is a domain component. A page long enough
   to scroll is usually a domain component that has not been extracted.
2. **Server props land here and go down.** The page is the only place that reads
   what the controller sent; everything below receives props.
3. **It never renders the layout's chrome.** No sidebars, no headers that belong
   to the area. The page fills the hole it was given.
4. **It declares its layout, and it is the only thing that does.** Nothing else
   in the theme decides which layout a screen gets.
5. **`<Head>` belongs to the page.** The title is per screen, not per layout.

## Not this

| you are actually writing | goes to |
|---|---|
| the content itself — a form, a table, a navigation | `components/domain/<context>/` |
| an arrangement with a slot you do not fill | `components/shell/` |
| chrome that every page of the area shares | `layouts/` |
| a screen the router cannot reach | nothing — delete it |
