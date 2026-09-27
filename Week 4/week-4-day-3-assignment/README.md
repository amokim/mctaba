# Data Fetching with useEffect (Week 4, Day 3)

A single-page React app with three components that load live data from public APIs: a random joke, a GitHub user search, and a crypto price tracker. Each one handles loading and error states, and uses `useEffect` for fetching, timers and cleanup. Styles are in `src/App.css` and follow the system light or dark theme.

Live demo: _add your Vercel URL here after the first deploy_

## What is on the page

| Section | Component(s) | API | What it demonstrates |
| --- | --- | --- | --- |
| Random Joke | `JokeDisplay` | [Official Joke API](https://official-joke-api.appspot.com/random_joke) | Fetching on mount, loading and error states, and a timer that reveals the punchline |
| GitHub User Search | `UserSearch` | [GitHub Search Users API](https://docs.github.com/en/rest/search/search#search-users) | Debounced search, cleanup of a pending timeout, and friendly error messages |
| Crypto Tracker | `CryptoTracker` → `useFetch` | [CoinGecko](https://www.coingecko.com/en/api) and [ExchangeRate-API](https://www.exchangerate-api.com/docs/free) | A reusable fetch hook, auto-refresh with an interval, and comparing new data with the previous result |

### Random Joke

| Feature | How it works |
| --- | --- |
| Load on mount | Fetches a joke once when the component first renders |
| Punchline | Shows the setup first, then reveals the punchline after 2 seconds. **Show Punchline** reveals it straight away |
| New joke | **Get New Joke** fetches another one and hides the punchline again |
| Errors | Shows a message and a **Try Again** button if the request fails |

### GitHub User Search

| Feature | How it works |
| --- | --- |
| Debounce | Waits 300 ms after typing stops before searching. Each keystroke clears the previous timeout in the effect cleanup |
| Results | Avatar, username, and a **View Profile** link that opens in a new tab |
| Empty states | Clearing the box clears the results. A search with no matches shows "No users found." |
| Errors | Status 403 shows a rate-limit message, and a network failure asks you to check your connection |

GitHub allows about 10 unauthenticated search requests per minute, so typing quickly for a while can trigger the rate-limit message.

### Crypto Tracker

| Feature | How it works |
| --- | --- |
| Prices | Bitcoin, Ethereum and Solana in USD, plus KES worked out from the live USD→KES exchange rate |
| Auto-refresh | Fetches new prices every 30 seconds. **Pause Updates** stops it and **Resume Updates** starts it again |
| Refresh Now | Fetches straight away. The button is disabled while a request is running |
| Change arrows | ↑ or ↓ shows whether each price rose or fell since the last fetch, and – means no change |
| Last updated | A one-second timer shows how many seconds ago the prices were fetched |
| Errors | If a refresh fails, the last known prices stay on screen with a warning |

CoinGecko does not return KES, so the shilling price comes from a second request to the exchange-rate feed.

### `useFetch` hook

`src/components/UseFetch.jsx` wraps `fetch` in a reusable hook.

| Input | Returns | Notes |
| --- | --- | --- |
| `url` | `{ data, loading, error, refetch }` | Fetches whenever `url` changes. An empty `url` skips the request. `refetch` is wrapped in `useCallback`, so it is safe to use in another effect's dependency list |

## Project structure

```
week-4-day-3-assignment/
├── index.html
├── package.json
├── vite.config.js
├── .oxlintrc.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # Renders the three sections
    ├── App.css           # Section cards, price grid, up/down colours, dark mode
    ├── index.css         # Base typography and tokens from the Vite template
    └── components/
        ├── JokeDisplay.jsx
        ├── UserSearch.jsx
        ├── CryptoTracker.jsx
        └── UseFetch.jsx  # useFetch custom hook
```

## Tech stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/) for the dev server and production build
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) with the React rules-of-hooks check
- Plain CSS with custom properties, no UI framework
- The browser's built-in `fetch`, no HTTP library

## Setup

### Prerequisites

- Node.js 20 or newer (the project was built on Node 24)
- npm 10 or newer
- An internet connection, because every section loads data from a public API

Check your versions:

```bash
node -v
npm -v
```

### Install and run

This project lives inside the larger `mctaba` repository, so change into its folder first.

```bash
git clone https://github.com/amokim/mctaba.git
cd "mctaba/Week 4/week-4-day-3-assignment"
npm install
npm run dev
```

Vite prints a local URL, normally <http://localhost:5173>. Open it in the browser. Edits to any file under `src/` hot-reload without a refresh.

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server with hot module replacement |
| `npm run build` | Create an optimised production build in `dist/` |
| `npm run preview` | Serve the `dist/` folder locally to check the production build |
| `npm run lint` | Run Oxlint over the project |

### API keys

None are needed. All three APIs have free public endpoints. They do have rate limits, so a section may show an error for a minute if it is refreshed too often.

## Deploying to Vercel

### Option A: Vercel dashboard (recommended)

1. Push your latest changes to GitHub.
2. Sign in at <https://vercel.com> with your GitHub account.
3. Click **Add New → Project** and import the `amokim/mctaba` repository.
4. In the import screen set the following. The **Root Directory** setting is the important one because this project is not at the repository root.

   | Setting | Value |
   | --- | --- |
   | Framework Preset | Vite |
   | Root Directory | `Week 4/week-4-day-3-assignment` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

5. Click **Deploy**. The first build takes about a minute.
6. Vercel gives you a URL such as `https://week-4-day-3-assignment.vercel.app`. Paste it into the **Live demo** line at the top of this README.

Every later push to `main` triggers a new production deployment. Pushes to other branches get their own preview URL.

### Option B: Vercel CLI

```bash
npm i -g vercel
cd "Week 4/week-4-day-3-assignment"
vercel login
vercel          # first run: answer the prompts, accept the detected Vite settings
vercel --prod   # publish to the production URL
```

Run the CLI from inside this folder so Vercel treats it as the project root.

### Checking a build locally before deploying

```bash
npm run build
npm run preview
```

If the preview works at <http://localhost:4173>, the same output is what Vercel will serve.

### Troubleshooting

- **Blank page after deploy**: check that Root Directory is set to `Week 4/week-4-day-3-assignment`. Without it Vercel builds from the repository root and finds no `package.json`.
- **"API rate limit exceeded" in the user search**: GitHub limits unauthenticated searches. Wait a minute and try again.
- **Crypto prices fail to load**: CoinGecko's free API also has a rate limit. Pausing updates or waiting a minute usually fixes it. Ad blockers can block these requests too.
- **KES shows "N/A"**: the exchange-rate request failed or has not finished yet. USD prices still work on their own.
- **Requests fire twice in development**: React's `StrictMode` in `main.jsx` runs effects twice in development to catch missing cleanups. This does not happen in the production build.

## Learning goals

- Fetching data in `useEffect` and tracking `loading`, `error` and `data` state
- Checking `response.ok` and showing clear error messages for different failures
- Returning a cleanup function from an effect to clear timeouts and intervals
- Debouncing user input with `setTimeout` and cleanup
- Running repeated work with `setInterval`, and pausing it by changing a dependency
- Extracting fetch logic into a reusable custom hook
- Keeping a value between renders with `useRef` without causing a re-render
- Using `useCallback` to keep a function stable across renders
