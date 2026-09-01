# Week 3 Day 2 Assignment — Async Patterns in JavaScript

A set of standalone Node.js scripts practising asynchronous patterns: converting
callbacks to Promises/async-await, running requests in parallel and racing them,
retrying with exponential backoff, and rate-limiting concurrent fetches.

## Scripts

| File | Topic | Needs network |
|------|-------|---------------|
| `callbacks-to-async.js` | Callback → Promise → async/await conversions, with one error case each | No (Task 1) / Yes (Task 2 `fetchAll`) |
| `race.js` | `Promise.all` vs `Promise.race` — fetch three APIs in parallel and time them | Yes |
| `retry.js` | `fetchWithRetry` — retry a failing request up to N times with exponential backoff | Yes |
| `rateLimitedFetch.js` | `rateLimitedFetch` — fetch many URLs with a capped number of concurrent workers | Yes |

`callbacks-to-async.js` covers three converted functions:

| # | Callback | Promise | Async/Await |
|---|----------|---------|-------------|
| 1 | `readFile` | `readFileV1` | `readFileV2` |
| 2 | `getUser`  | `getUserV1`  | `getUserV2`  |
| 3 | `saveToDb` | `saveToDbV1` | `saveToDbV2` |

## Prerequisites

- [Node.js](https://nodejs.org/) **v18 or newer** (tested on v24.18.0) — the global
  `fetch` API used by `race.js`, `retry.js`, and `rateLimitedFetch.js` requires Node 18+.
  Check your version with:
  ```
  node -v
  ```
- No external packages — every script uses only built-in Node.js APIs, so `npm install`
  is not needed.
- A working internet connection for the scripts marked "Needs network" (they call
  `https://jsonplaceholder.typicode.com`).

## Setup

1. Clone or download this repository.
2. Open a terminal in this folder:
   ```
   cd "Week 3/week-3-day-2-assignment"
   ```

## Running the scripts

Run whichever one you want to see:

```
node callbacks-to-async.js
node race.js
node retry.js
node rateLimitedFetch.js
```

## Expected output

### `callbacks-to-async.js`

Each function runs its callback, Promise, and async/await versions in sequence, plus one
error-handling case:

```
=== readFile ===
Callback: Contents of data.txt
Promise: Contents of data.txt
Async/Await: Contents of data.txt
Error Handling: File not found

=== getUser ===
Callback: { id: 1, name: 'Amina', email: 'amina@example.com' }
Promise: { id: 1, name: 'Amina', email: 'amina@example.com' }
Async/Await: { id: 1, name: 'Amina', email: 'amina@example.com' }
Error Handling: Invalid user ID

=== saveToDb ===
Callback: { name: 'Amon', city: 'Nairobi', id: <random>, saved: true }
Promise: { name: 'Amon', city: 'Nairobi', id: <random>, saved: true }
Async/Await: { name: 'Amon', city: 'Nairobi', id: <random>, saved: true }
Error Handling: Name is required
```

`id` in `saveToDb` output is randomized each run (`Math.floor(Math.random() * 1000)`).

### `race.js`

```
=== Promise.all Results ===
Post: { ... }
User: { ... }
Todo: { ... }
All completed in: <n>ms

=== Promise.race Winner ===
Fastest API: <post|user|todo>s (<n>ms)

=== Individual Timings ===
posts: <n>ms
users: <n>ms
todos: <n>ms
```

Timings and the race winner vary run to run.

### `retry.js`

The demo URL (`.../posts/1/3`) 404s, so all attempts fail and the final error is caught:

```
Fetching https://jsonplaceholder.typicode.com/posts/1/3...
Attempt 1 of 3 failed. Retrying in 1000ms...
Attempt 2 of 3 failed. Retrying in 2000ms...
Attempt 3 of 3 failed.
Error: Failed after 3 attempts: HTTP 404
```

Backoff doubles each attempt: 1000ms, 2000ms, 4000ms (`2^(attempt-1) * 1000`).

### `rateLimitedFetch.js`

Fetches 10 URLs with `maxConcurrent = 2`, logging progress as each completes:

```
Fetching 2 of 10 URLs...
Completed: 1/10
Completed: 2/10
...
Completed: 10/10
[ { ... }, { ... }, ... ]   // results in original URL order
```

Failed requests appear in the results array as `{ error: <message> }` rather than
rejecting the whole batch.

## Notes

- Objects are logged with `console.log(label, obj)` (comma-separated), not string
  interpolation — interpolating an object into a template string calls `.toString()` and
  prints `[object Object]`.
- In `callbacks-to-async.js`, the `runCallback` helper wraps each callback-style function
  in a `Promise` so it can be `await`ed alongside the Promise/async versions, keeping
  output order deterministic.
- `rateLimitedFetch.js` uses a fixed pool of worker loops that each pull the next URL
  index until the list is exhausted — this caps concurrency without needing a queue library.
