# Write knowledge

How a structural decision gets made, and how it becomes a file. The steps call
this skill every time a structural choice comes up — where a kind of file
goes, how something is named, where one responsibility ends and another
begins. Not sequential, not once: this runs whenever a decision happens, **at
the moment it happens**. A rule written after the fact documents what the code
does; a rule written at decision time governs what the code will do. Only the
second kind prevents anything.

It has two jobs, and the second is the one easily forgotten:

1. **Shape the decision** — think structurally before any code exists.
2. **Preserve it** — the mechanics of destinations, rules, conventions and the
   index, so the decision governs every later session.

## Principle and criterion, never implementation

Knowledge here describes **the principle and its decision criterion** — the
implementation belongs to the technology and changes with it. Not:

> *"Create a class X this way in Laravel."*

But:

> *"When a responsibility has its own lifecycle, or can evolve independently,
> give it a boundary of its own."*

The first sentence dies with the stack. The second one survives it, and the
agent translates it into whatever the stack offers — a class, a module, a
component, a context. That is the layering every piece of knowledge lives in:

```
structural principle  →  technology translation  →  concrete code
```

In a convention's slots, the principle lives above the **Shape**: the skeleton
is the translation, never the rule itself.

Before writing code, a structural decision passes through questions like
these — and when the answer is not obvious, that is the signal the decision
deserves a file:

- Does this responsibility have its own lifecycle? Can it evolve alone?
- Where is the boundary, and what is allowed to cross it, in which direction?
- Does something already answer this question — and is this a duplicate about
  to be born?
- Is this one thing, or two things that have not been separated yet?
- What category is this, of the ones that already exist — and by which
  discriminator, asked in which order?

## First: who has to read it?

The reader decides where knowledge lives — and this file travels, so where
"here" is depends on where you are reading it:

- **In a recipe repository** there are two destinations. `src/.ai/` ships with
  the recipe: conventions the payload follows, patterns the installed project
  should keep growing by — its reader works in the project after install.
  `./.ai/` stays: harness, schema, shipping, the repository's own machinery —
  its reader builds the recipe. When in doubt: would the person in the
  installed project ever need this? Then it ships.
- **In an installed project** there is one home, `.ai/`, and everything
  written by this skill goes there.

## Second: is it a rule or a convention?

**A rule** is transversal — it applies to everything and exists because an
agent gets it wrong *by default*, usually because the immediate environment is
more forgiving than the place the code ends up. Few of them, each one earned.

**A convention** is one artefact type — "I am about to create an X: where,
what name, what shape". Many of them, one file each.

The test: if it answers "where/how do I write an X?", convention. If it would
be violated while writing any X at all, rule.

## What earns a file — and what does not

A decision earns a file when a fresh session would plausibly decide it
differently. That is the whole criterion. It covers naming schemes, folder
boundaries, patterns with a wrong-but-working alternative.

It does not cover: what is obvious from reading the code, one-off choices that
recur nowhere, or hunches not yet confirmed by working code. Writing those
down buries the rules that matter.

## The shape of a convention

Fixed slots, always the same, always in this order — fixed so a reader can
jump to the slot they need without interpreting prose:

| slot | answers |
|---|---|
| **When** | how do I know I am in this case — the trigger |
| **Where** | the exact path, and the naming of file and export |
| **Shape** | a minimal real skeleton, copyable |
| **Rules** | the non-negotiables, few, numbered |
| **Not this** | the neighbouring artefact this gets confused with, and where to go instead |

**Not this** is the slot that does the most work. The commonest agent error is
not writing an artefact badly — it is classifying which artefact something is.
Every convention names its neighbours and points away from itself.

Two more habits that earn their cost:

- **Write the exceptions.** If category A pulls a case that actually belongs
  to B, say so by name — an unwritten exception is decided wrong the same way
  by every session.
- **Order the discriminators.** When three categories compete, give the
  questions in the order they must be asked; an unordered list gets applied in
  a different order each time.

## The shape of a rule

Four parts: what the rule is, why it exists, how to apply it, and **what
getting it wrong looks like** — the observable symptom. The last part does the
work: rules without symptoms read as style advice and get skipped under
pressure.

## Index it

Each destination keeps an `index.md` mapping trigger to file:

```
| I am about to… | read |
|---|---|
| add a page | conventions/page.md |
```

Index by what the reader is *about to do*, never by theme — the reader arrives
with a task, not a topic. A file the index cannot route to from a task is a
file that will not be read.

## Keep it small

One answer per file; two files answering the same question produce different
behaviour in different sessions, which is worse than no file. A convention
growing long usually contains a transversal rule in disguise — lift it out.
And prefer deleting a stale rule over annotating it: wrong knowledge is the
only kind worse than none.
