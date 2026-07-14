---
description: "Tasks for TODO LocalStorage App"
---

# Tasks: TODO LocalStorage App

**Input**: `spec.md`, `plan.md`, and `quickstart.md`

**Rule**: Keep this short. Build the smallest useful product first.

## Phase 1: Setup

- [X] T001 Create Vite React TypeScript structure in `frontend/`
- [X] T002 Add app entry files in `frontend/src/main.tsx` and `frontend/src/vite-env.d.ts`

## Phase 2: Frontend Logic

- [X] T003 [US1] Define Todo type and localStorage helpers in `frontend/src/App.tsx`
- [X] T004 [US1] Implement add, toggle, delete, and persistence logic in `frontend/src/App.tsx`
- [X] T005 [US2] Implement all, active, and completed filters in `frontend/src/App.tsx`
- [X] T006 [US1] Show total, active, and completed counts in `frontend/src/App.tsx`

## Phase 3: Frontend UI

- [X] T007 [US1] Build form, empty state, todo list, and item controls in `frontend/src/App.tsx`
- [X] T008 [US2] Build filter controls in `frontend/src/App.tsx`
- [X] T009 [US1] Add responsive plain CSS in `frontend/src/styles.css`

## Phase 4: Validate

- [X] T010 Run local manual validation from `specs/001-todo-localstorage-app/quickstart.md`
- [X] T011 Run `npm run build` from `frontend/`
- [X] T012 Mark completed tasks `[X]` and note skipped scope

## Notes

- No backend tasks are needed.
- No login, sync, routing, or global state manager.
