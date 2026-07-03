# EduPlatform — Cybersecurity Rebrand Roadmap

Converting EduPlatform from a **programming** education platform into a
**cybersecurity** education platform. Frontend only (React + Vite), mock-data
driven, no backend.

- **Active branch:** `feat/cybersecurity-rebrand` (branched from `main`)
- **Strategy:** `main` stays as the old programming version (backup). All
  cybersecurity work happens on the feature branch until it is stable.
- **First milestone tag:** `v0.1-cyber`

## How to resume next time

Open the project and tell the assistant:

> "Continue the EduPlatform cybersecurity rebrand on branch
> `feat/cybersecurity-rebrand`. Read `ROADMAP.md` first. This round I want to …"

Content and copy are centralized in a few files, so most changes are localized:

| What | File |
|------|------|
| Course catalog, chapters, roadmap nodes, AI replies | `src/data/mockData.js` |
| All UI copy (zh-TW + en) | `src/context/LanguageContext.jsx` |
| Design tokens / colors | `src/styles/global.css` |
| Dashboard lesson content (`LESSON_DATA`) | `src/pages/Dashboard.jsx` |
| Sandbox exercises (`TASKS`) | `src/pages/Sandbox.jsx` |

## Done — v0.1 (7 phases)

1. Course catalog → 6 cybersecurity courses
2. Chapters + learning roadmap
3. Dashboard lesson content `l1`–`l3`
4. Sandbox → 5 security mock exercises
5. AI tutor copy
6. Site copy i18n (zh-TW + en synced)
7. Removed 3 unused dead-code components

## Deliberately unchanged (product decisions)

- Platform name / logo stays **EduPlatform** / "E"
- Accent color stays **gold** (no `global.css` change)
- Course titles/descriptions stay **English** (not localized via `t()`)

## Open follow-ups (future rounds)

- [ ] `crypto` and `social` courses in `COURSE_CATALOG` are **placeholders** — finalize or replace
- [ ] Dashboard lessons `l4`–`l12` still use the generic fallback — write real content
- [ ] Course-name bilingual localization (currently English-only) — decide whether to do
- [ ] Sandbox is mock-only (fake Run output) — decide if/when to wire a real runner or lab
- [ ] Settings demo account (`demo@eduplatform.dev`) — revisit if branding changes
- [ ] When stable: merge `feat/cybersecurity-rebrand` → `main` (or open a PR)

## Working style

Phase-by-phase: one phase, then stop for review and commit before the next.
No batch refactors. Reuse existing components and CSS tokens.
