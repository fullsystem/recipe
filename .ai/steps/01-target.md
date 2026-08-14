# 01 · Define the target

Nothing gets built before the recipe knows what it delivers, what it lands on,
and how it is judged. This step is a short interview plus your own research, and
it ends in one file that every later step reads.

**Needs** — `00` done. Nothing else exists yet, and that is correct.

**Produces** — `.ai/target.md`, and a real identity in `schema.json`.

**Done when** — `.ai/target.md` exists with every field filled, and
`schema.json`'s `name` is no longer a placeholder.

## Ask the user — four questions, intent only

Ask only what the user alone can know. Every fact you could look up yourself is
yours to establish, not theirs to recite.

1. **What does the recipe deliver, in one sentence?** A full starter kit, a
   module that adds one capability, a visual theme, a configuration pack. This
   answer sets the scope test every later decision is measured against.

2. **What does it land on?** And here sits the trap this step exists to disarm:
   **delivery is not the landing base.** "A starter kit for Laravel with
   Inertia" names what comes *out* — it says nothing about what it lands *on*.
   Bare framework, official starter kit, or empty directory are three different
   recipes with three different boundaries. Do not accept a delivery answer for
   this question; put the choice back as consequences:

   > *Does it grow from the bare framework and bring Inertia itself — you own
   > the frontend — or does it re-skin the official starter kit — you overwrite
   > its files?*

3. **What may it destroy?** Every path in `src/` lands on the project and
   replaces what is there. Which existing files is this recipe *entitled* to
   replace? "None" is a valid and common answer. Asking now, before any file
   exists, is the point — a clobber decided by convenience later never gets
   decided at all.

4. **What proves the install worked?** What has to build, pass, or appear on
   screen. This becomes the verification in step `05` and the definition of
   done everywhere.

## Establish the facts — research, then confirm with the user

- **The driver gate.** `schema.json` names a driver, and the installer refuses
  drivers it does not know. If no driver exists for the chosen stack, **stop
  here**: the recipe cannot install, and finding out now costs a conversation
  where finding out at step `05` costs the project. Offer the two ways out —
  contribute a driver to `fullsystem/install`, or choose a supported stack —
  and let the user pick. Do not attempt to write a driver in this session.

- **Catalogue a virgin landing base.** Create one — actually create it, in a
  directory outside this repository or ignored by git — and list what it
  ships: the frontend stack, the auth story, the build commands it declares.
  Do not trust memory of what a framework ships; releases move faster than
  training data. Keep the directory: step `02` reuses it.

- **What the installer will actually verify.** It runs only what the project
  declares among `composer lint`, `npm run build` and `composer test`, and
  skips the rest. A stack outside that vocabulary installs with **zero
  verification** — the user decides now whether that is acceptable, not after
  the first broken install.

- **Identity.** Real `org/repo` into `schema.json`'s `name`, starting version
  agreed. A placeholder that survives this step ends up in some user's git
  history as `feat: install {org}/{repo} 0.1.0`.

## Write `.ai/target.md`

Fixed fields, every one filled, each existing because a later step reads it:

| field | holds | consumed by |
|---|---|---|
| `product` | the one-sentence delivery | every scope decision |
| `landing` | what it lands on, how a virgin one is created, what it ships | step `02` — the harness imitates this |
| `driver` | the driver, confirmed to exist in the installer | `schema.json`, step `04` |
| `boundary` | what the landing base provides ↔ what the recipe brings | step `02` (what the harness stands in for), step `04` (packages) |
| `entitlements` | paths the recipe may overwrite, each with its why | the overwrite rule, now with a list |
| `verification` | what proves the install, in the installer's vocabulary | step `05` |
| `identity` | `org/repo`, version | `schema.json` |

`target.md` is living, but with ceremony: a change after step `02` has begun
means this step got something wrong — record the revision and its date in the
file rather than silently editing the field. A boundary that drifts quietly
produces a harness that stands in for the wrong things.
