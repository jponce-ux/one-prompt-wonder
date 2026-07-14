---
description: "Tasks for Localhost Run Validation"
---

# Tasks: Localhost Run Validation

**Input**: `spec.md`, `plan.md`, and `quickstart.md`

**Rule**: Keep this short. Build the smallest useful product first.

## Phase 1: Setup

- [ ] T001 Ensure `frontend/package.json` has `dev`, `build`, and `preview` scripts
- [ ] T002 Ensure Vite config exists in `frontend/vite.config.ts`

## Phase 2: Documentation

- [ ] T003 [US1] Add local TODO app startup instructions to `README.md`
- [ ] T004 [US2] Confirm validation steps are documented in `specs/002-localhost-run-validation/quickstart.md`

## Phase 3: Validate

- [ ] T005 Run `npm install` in `frontend/`
- [ ] T006 Run `npm run build` in `frontend/`
- [ ] T007 Confirm app can launch with `npm run dev` at `http://localhost:5173`
- [ ] T008 Mark completed tasks `[X]` and note skipped scope

## Notes

- No backend service is required.
- Deployment and CI are out of scope.
