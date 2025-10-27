## Purpose

This file gives concise, repo-specific guidance to an AI coding agent so it can be immediately productive working on this project.

## Quick start (how to run locally)

- Ensure a MongoDB server is running and accessible at `mongodb://localhost:27017` (the code expects a local instance).
- From the project root run:

  - `node Index.js` — runs the small demo in `Index.js` which connects to MongoDB, inserts a document and queries it.

Notes:
- The repository uses CommonJS (`require`) and async/await. There are no test scripts configured in `package.json` (the `test` script is a placeholder).

## Big-picture architecture (what the code does)

- This is a small Node.js script whose main entry is `Index.js` (capital I). It:
  - Connects to MongoDB using the `mongodb` driver (dependency in `package.json`).
  - Uses database `testDB` and collection `users`.
  - Demonstrates a write (`insertOne`) and a read (`findOne`).

Why this matters for an AI agent:
- Any change touching data access should preserve the connection pattern (create MongoClient, `connect()`, use `db()`/`collection()`, then `close()` in `finally`).

## Project-specific patterns & conventions

- File casing: `Index.js` (capital I) exists in the workspace, while `package.json` references `index.js` (lowercase). On Windows this runs fine; on case-sensitive systems it may fail. Prefer matching `package.json` to actual filename when adding entrypoints.
- Dependency management: `package.json` pins `mongodb` (^6.20.0). Use this driver API style (MongoClient from `mongodb`).
- Error handling: the sample uses a try/catch/finally pattern — follow that pattern for resource cleanup.

## Integration points & external dependencies

- MongoDB at `mongodb://localhost:27017` is the only external runtime dependency in the current code. Ensure the DB is available when running or testing.
- The code uses the official `mongodb` npm package (see `package.json`). When editing data access code, consult the `mongodb` driver docs for API changes if upgrading the dependency.

## Common edits the agent may be asked to perform

- Add CLI flags (e.g., custom URI or DB name): add a small config parsing block near the top of `Index.js` and default to the existing URI.
- Add unit tests: there are no tests configured. If adding tests, also add a `test` script to `package.json` and choose a test runner (e.g., Jest or Mocha).
- Fix casing mismatch: update `package.json` "main" field to match `Index.js` or rename the file to `index.js` to avoid cross-platform issues.

## Notable pitfalls & checks

- Filename case mismatch (see above) — catch this when running on CI that may be case-sensitive.
- Assumes a running MongoDB instance on localhost; when writing CI workflow or tests, mock or provide a test database.

## Where to look next (key files)

- `Index.js` — main script that demonstrates DB usage and is the best single-file summary of runtime behavior.
- `package.json` — shows dependency on `mongodb` and the placeholder `test` script.

## If you need clarification

- After making changes that modify runtime assumptions (DB host/port, DB name, collection names), update this file to reflect them and include a short example command for running locally.

---

If any part of this is unclear or you'd like more specific examples (e.g., a Jest test skeleton, a Dockerfile for MongoDB, or a CI config), tell me which and I will add it.
