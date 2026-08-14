# Open questions

Working notes for the redesign. Not documentation — each entry leaves when it is
resolved and written into the real files.

## Phase 1 — defining the target

1. ~~Virgin target~~ — **defaulted in `steps/01-target.md`**: create it for
   real, keep it for step 02. Veto if too costly.
2. ~~Driver gate~~ — **defaulted in `steps/01-target.md`**: stop and offer the
   two ways out; never write a driver in-session. Veto to allow guiding.
3. ~~target.md mutability~~ — **defaulted in `steps/01-target.md`**: living
   with ceremony, revisions recorded in the file.
4. **Delivery is not the landing base.** "Starter kit for Laravel with Inertia"
   names what the recipe delivers, not what it lands on. Question 2 of the
   interview has to split: bare framework (`laravel/laravel`), official starter
   kit (`laravel/react-starter-kit`), or empty directory — three different
   recipes with three different boundaries.
5. **The driver couples empty-directory installs to one base.** `laravel-react`
   creates `laravel/react-starter-kit` when the directory is empty. A recipe
   whose landing base is bare Laravel gets the wrong base on that path — this
   may be installer work, not recipe work.

## Phase 2 — harness (design settled in conversation, to be written)

- The template teaches **what a harness must achieve**, never the tool: boot a
  real instance of the stack from this repo; `src/` shadows the harness; the
  harness never ships.
- Discovery is a two-step ladder: (1) research the ecosystem's native
  package-development harness — the question is always "how does this ecosystem
  develop packages outside a full application?"; (2) universal fallback — the
  virgin target created in phase 1, kept gitignored inside the repo, with
  `src/` wired into it.
- A harness is not done until the marker test passes: marker file in `src/`,
  build, grep the output.

## Phase 6 — packaging

6. ~~Where shipped knowledge lives~~ — **decided**: `src/.ai/`, founded empty
   by step `00`, filled during the steps, packaged by step `06`. Still open
   inside this: what exactly goes in it (an `AGENTS.md` for the project? the
   payload's conventions?), and whether the `.gitkeep` placeholder is removed
   at packaging so it does not ship.
7. **Session boundary after install.** Passive knowledge (markdown) is readable
   immediately if something says to read it; registered machinery (skills,
   agents, hooks in `.claude/`) likely needs a fresh session. The post-install
   handover must be designed for one of the two.

## Installer findings (from the live test, belong to fullsystem/install)

8. Empty-directory path never runs `npm install`, so verification always fails
   with `vite: command not found` on a fresh create.
9. `src/.gitkeep` ships to the project root as a real file. Still true after
   the reset — `src/` needs the placeholder but the payload should not include it.
10. Placeholder identity leaks: `{org}/{repo}` appears in the user's git
    history (`feat: install {org}/{repo} 0.1.0`) when the recipe is installed
    without forking.

## Knowledge layering

12. ~~Does `write-knowledge.md` ship?~~ — **decided**: it lives at
    `src/.ai/skills/write-knowledge.md` and ships with every recipe. Its
    destination section now reads correctly in both worlds (recipe repo and
    installed project). Side effect: `src/` has real content, so both
    `.gitkeep`s were dropped — which also closes the "placeholder ships"
    part of point 9.

## Housekeeping

11. `LICENSE` and `.gitignore` were kept on the cleaned `main` by judgement
    call — confirm or remove.
