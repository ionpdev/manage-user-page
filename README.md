# Manage Users

An Angular + Firebase page to create, list, search, edit, enable/disable, and remove users.
Removal runs through a Cloud Function.

## Tech stack

- **Angular 22** — standalone, zoneless, signals, Signal Forms
- **AngularFire 20** — Firestore + Cloud Functions
- **Zod 4** — schema-first data model (shared package)
- **Custom SCSS** — token-driven, no component library
- **Firebase** — Hosting, Firestore, Cloud Functions
- **npm workspaces** — app + `functions` + `packages/shared`

## Architecture decisions

- **Firebase owns data; the app is a thin client.** All Firebase access goes through one
  `UserService`.
- **Deletion is function-only.** `removeUser` (Admin SDK) is the only delete path; Firestore
  rules deny client deletes.
- **Single source of truth.** Zod schemas in `packages/shared` define the data model; types
  are inferred and reused by the app and the functions.
- **No PII.** A user is only `username`, `role`, `status`, and timestamps.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Run the app locally (`ng serve`) |
| `npm run build` | Production build |
| `npm test` | Unit tests (Vitest) |
| `npm run emulators` | Firebase emulators (Firestore + Functions) |
| `npm run deploy` | Build, then deploy rules + functions + hosting |

## Status

In development. Live URL to follow.
