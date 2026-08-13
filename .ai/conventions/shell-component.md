# Shell component

Shell is where things sit on the screen. It is the structure around content, and
it does not know what the content is.

**Shell has a hole. Domain has a subject.** That is the whole distinction.

## When

You are writing a shell component when it has a slot it does not fill —
`children`, or a `render`/`header` prop. Swap what goes in the slot and the
component does not change. No slot means it is not shell.

## Where

```
resources/js/components/shell/
```

Named for position or role, never for subject: `app-shell.tsx`,
`app-sidebar.tsx`, `app-header.tsx`, `app-page.tsx`.

File and export are the same words — `app-sidebar.tsx` exports `AppSidebar`.
The position is already the suffix; there is nothing to add.

## Shape

Shell composes shell, and the slots are filled from outside — here, by a layout:

```tsx
<AppShell>
    <AppSidebar render={<Navigation />} />

    <AppPage header={<AppHeader render={<Notifications />} />}>
        {children}
    </AppPage>
</AppShell>
```

`AppShell`, `AppSidebar`, `AppPage` and `AppHeader` are shell: each one is an
arrangement with a hole. `Navigation` and `Notifications` are domain: each one
is a subject, and neither knows it is in a sidebar or a header.

## Rules

1. **The slot is the definition.** No slot, no shell.
2. **Never name a domain concept**, in the component's name or in its code. A
   shell component that mentions invoices has content in it.
3. **Imports point one way**: shell may use `ui/`, never `domain/`. The domain
   arrives through the slot, injected by whoever composes.
4. **Structure and content in one file is two components.** The cut is the slot.
   `ControlPanelSidebar` with the links inside is `AppSidebar` plus
   `Navigation` that have not been separated yet — and the cost is a structure
   nobody can reuse holding content nobody can swap.

## Not this

| you are actually writing | goes to |
|---|---|
| styling and behaviour with no slot and no subject | `components/ui/` |
| the thing that fills the slot | `components/domain/<context>/` |
| an arrangement that also chooses the page's parent chrome | `layouts/` — see [layout](layout.md) |
