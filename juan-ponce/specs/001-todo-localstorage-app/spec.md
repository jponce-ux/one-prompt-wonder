# Feature Specification: TODO LocalStorage App

**Created**: 2026-07-14

**Status**: Draft

**Input**: User description: "Create a TODO list web app that does not require login, stores data in browser localStorage, and can be launched locally at localhost in a monorepo."

## Feature Summary

Build the smallest useful no-login TODO web app. Users can add tasks, mark them complete, delete them, filter the visible list, and keep the list after a refresh through browser `localStorage`.

## User Scenarios

### User Story 1 - Manage todos locally (P1)

As a local user, I can manage a simple TODO list in the browser without creating an account.

**Acceptance Scenarios**:

1. **Given** an empty list, **When** the user enters "Buy milk" and submits it, **Then** the task appears as active.
2. **Given** an active task, **When** the user marks it complete, **Then** the task appears completed and counts update.
3. **Given** an existing task, **When** the user deletes it, **Then** it is removed from the list.
4. **Given** existing todos, **When** the page refreshes, **Then** the todos are restored from `localStorage`.

### User Story 2 - Filter task visibility (P2)

As a local user, I can switch between all, active, and completed views so the list stays easy to scan.

**Acceptance Scenarios**:

1. **Given** active and completed tasks, **When** the user selects Active, **Then** only active tasks are shown.
2. **Given** active and completed tasks, **When** the user selects Completed, **Then** only completed tasks are shown.

## Requirements

### Functional Requirements

- **FR-001**: System MUST let users create a todo with non-empty text.
- **FR-002**: System MUST let users toggle a todo between active and completed.
- **FR-003**: System MUST let users delete a todo.
- **FR-004**: System MUST persist todos in browser `localStorage`.
- **FR-005**: System MUST restore todos from `localStorage` when the app loads.
- **FR-006**: System MUST let users filter todos by all, active, and completed.
- **FR-007**: System MUST show counts for total, active, and completed todos.

### Data

- **Todo**: A local task with `id`, `text`, `completed`, and `createdAt`.

## Success Criteria

- **SC-001**: A user can add, complete, delete, and filter todos on the first screen.
- **SC-002**: Todos remain available after browser refresh.
- **SC-003**: The app works without login, backend, or network calls.

## Out of Scope

- Login or user accounts.
- Backend API or server database.
- Multi-device sync.
- Drag and drop sorting.
- Due dates, tags, and notifications.

## Assumptions

- The app is frontend-only.
- The monorepo app lives under `frontend/`.
- Browser `localStorage` is available.
- Vite React TypeScript is the frontend stack.
