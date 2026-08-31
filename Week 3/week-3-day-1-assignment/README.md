# Week 3 Day 1 Assignment

This folder contains three standalone Node.js scripts. Each can be run independently.

Requires Node.js 18+ (for built-in `fetch` support used in `fetcher.js`).

```bash
node exercices.js
node pipeline.js
node fetcher.js
```

---

## `exercices.js` — Destructuring, Spread & Rest

Covers a set of small exercises on object/array destructuring, the spread operator, and rest parameters.

### Run

```bash
node exercices.js
```

### Sample output

```
Amina 24
Amina
student
Mombasa Mombasa
Nairobi Kisumu
[ 1, 2, 3, 4, 5, 6 ]
[ 1, 2, 8, 4, 5, 6 ]
7
{ a: 1, b: 3, c: 4 }
[ 10, 11, 12, 13, 14, 15, 16 ]
600
Hello, Tom!
And hello to: Jerry
Tom
{
  age: 29,
  location: 'Nairobi, Kenya',
  skills: [ 'Python', 'JavaScript', 'Kubernetes' ]
}
Python
JavaScript, Kubernetes
First: 10, remaining: 4
```

---

## `pipeline.js` — Array Pipeline (Listings Search)

Defines `findTopListings(listings, neighborhood, maxPrice)`, which filters a list of housing listings by neighborhood and max price, sorts the matches by rating (highest first), and formats them into a readable, numbered report.

### Run

```bash
node pipeline.js
```

### Sample output

```
Top listings in Westlands under KES 5000:
1. ⭐ 4.8 - Cozy Studio Westlands Westlands (KES 3,500/night) - wifi, kitchen, parking
2. ⭐ 4.5 - Artist Loft Westlands Westlands (KES 4,500/night) - wifi, kitchen
3. ⭐ 4.1 - Backpacker Hostel Westlands Westlands (KES 800/night) - wifi
Top listings in Kilimani under KES 10000:
1. ⭐ 4.9 - Modern Apartment Kilimani Kilimani (KES 6,000/night) - wifi, pool, gym, kitchen
```

---

## `fetcher.js` — Resilient Fetch

Defines `resilientFetch(url)`, an async function that:

- Wraps `fetch()` in a `try/catch` block
- Retries up to 3 times, waiting 1 second between attempts, if a request fails (network error or a non-OK HTTP status)
- Logs each attempt: `Attempt 1 of 3 for <url>...`
- On success, returns the parsed JSON data
- On final failure (after 3 attempts), returns a clean error object:
  ```js
  { success: false, error: "Failed after 3 attempts", url, attempts: 3 }
  ```

### Run

Uncomment (or add) a call to `resilientFetch` at the bottom of the file, e.g.:

```js
resilientFetch('https://jsonplaceholder.typicode.com/posts/1');
resilientFetch('https://jsonplaceholder.typicode.com/invalid-endpoint-that-404s');
```

Then:

```bash
node fetcher.js
```

### Sample output

**Successful request** (`/posts/1`):

```
Attempt 1 of 3 for https://jsonplaceholder.typicode.com/posts/1...
✅ Success: {"userId":1,"id":1,"title":"sunt aut facere...","body":"quia et suscipit..."}
```

**Failing request** (`/invalid-endpoint-that-404s`), retried 3 times before giving up:

```
Attempt 1 of 3 for https://jsonplaceholder.typicode.com/invalid-endpoint-that-404s...
Attempt 2 of 3 for https://jsonplaceholder.typicode.com/invalid-endpoint-that-404s...
Attempt 3 of 3 for https://jsonplaceholder.typicode.com/invalid-endpoint-that-404s...
❌ Failed: {
  success: false,
  error: 'Failed after 3 attempts',
  url: 'https://jsonplaceholder.typicode.com/invalid-endpoint-that-404s',
  attempts: 3
}
```
