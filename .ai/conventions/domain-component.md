# Domain component

A domain component has a subject. It belongs to one context, and moving it to
another context breaks its meaning rather than its code.

## When

You are writing a domain component when it *is* the content: navigation,
notifications, a list of invoices. Remove the subject and there is no component
left.

Domain is not only business entities. `Navigation` is nobody's entity, and it is
domain — the control panel's navigation and the landing page's navigation are
different things, each belonging to its own context.

Forms are domain, and they show why the subject is what counts rather than the
placement. A login form is the same form in a dialog and on a full page: same
fields, same validation, same submit. The placement changed; the component did
not.

Two tests, and they pull in opposite directions on purpose:

- Change the **placement** — page to modal — and nothing about the component
  changes. If something did, it has absorbed its container.
- Change the **context** — control panel to landing page — and the meaning
  breaks. If it survives, it is probably shell or a primitive.

## Where

```
resources/js/components/domain/<context>/
```

The context is whatever the rest of the theme already calls it — an area
(`app`, `marketing`) or a subject (`invoice`, `billing`):

```
components/domain/app/navigation.tsx
components/domain/marketing/navigation.tsx
components/domain/invoice/invoice-table.tsx
```

Two components with the same name in different contexts is the convention
working, not a collision.

Name it so it reads without the path: in JSX you see `<LoginForm />` and never
the folder that would have explained it. `Navigation` and `Notifications`
already say what they are and take nothing extra; `Login` says nothing and
becomes `LoginForm`. The file is the kebab of the export — `login-form.tsx`.

## Shape

A domain component knows things and fills a slot. It does not arrange the
screen — whoever composes decides where it goes:

```tsx
import { usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Link } from '@/components/ui/link';

export function Navigation() {
    const { auth } = usePage().props;

    return (
        <nav>
            <Link href={dashboard()}>Dashboard</Link>
            {auth.user.isAdmin && <Link href="/admin">Admin</Link>}
        </nav>
    );
}
```

## Rules

1. **It may know everything** — routes, session, the shape of an entity. That
   knowledge is what makes it domain, and it is the reason it cannot be reused
   across contexts.
2. **It does not arrange, and it does not own its container.** A login form
   renders fields and a submit — never a `<Dialog>`, never a page frame, never
   the padding that decides it is a card. Whoever places it wraps it. A form
   that renders its own modal can never be a page again.
3. **One context per folder.** A domain component wanted by two contexts is
   usually a shell component or a primitive trying to get out — look for the
   part with no subject and lift that instead of sharing the whole.
4. **Named for the subject**, never the position. `Navigation`, not
   `SidebarContent`.

## Not this

| you are actually writing | goes to |
|---|---|
| an arrangement with a slot you do not fill | `components/shell/` |
| style and behaviour with no subject at all | `components/ui/` |
| the chrome shared by every page of an area | `layouts/` — see [layout](layout.md) |
