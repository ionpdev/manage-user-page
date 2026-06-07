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
  are inferred and reused by the app and the functions. The Cloud Function is bundled with
  esbuild so that shared package is inlined at deploy time.
- **No PII.** A user is only `username`, `role`, `status`, and timestamps — enforced both in
  the schema and in the Firestore rules.

## Project structure

```
src/app/
  core/          services (UserService = the Firebase boundary) and models
  features/      manage-users page + its form, list, row, and search
  shared/        reusable UI (button, badge, dialog, toast) and pipes
packages/shared/ Zod schemas + contracts shared by app and functions
functions/       removeUser Cloud Function
```

## Prerequisites

- **Node 22**
- **Firebase CLI** — `npm i -g firebase-tools`
- **Java 11+** — only needed to run the Firestore emulator locally

## Getting started

```bash
npm install --legacy-peer-deps   # AngularFire 20 peers Angular 20; we run 22
```

Run the Firebase emulators (Firestore + Functions) in one terminal:

```bash
npm run emulators
```

Run the app in another (points at the emulators in development):

```bash
npm start
```

The app is served at `http://localhost:4200`.

## Testing

```bash
npm test
```

Unit tests (Vitest) cover the Firestore-boundary schema parse and the search filter.
Firestore security rules were verified against the emulator (valid writes allowed; PII
fields, invalid roles, `createdAt` tampering, and client deletes denied).

## Deploy

Set your production Firebase web config in `src/environments/environment.prod.ts`
(Firebase console → Project settings → Your apps). The file is committed with placeholder
values; to keep your real values out of git, tell git to ignore local changes to it:

```bash
git update-index --skip-worktree src/environments/environment.prod.ts
```

Then deploy (targets the Firebase project in `.firebaserc`):

```bash
npm run deploy   # builds shared + app, then deploys rules, functions, and hosting
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Run the app locally (`ng serve`) |
| `npm run build` | Production build |
| `npm test` | Unit tests (Vitest) |
| `npm run emulators` | Firebase emulators (Firestore + Functions) |
| `npm run deploy` | Build, then deploy rules + functions + hosting |
