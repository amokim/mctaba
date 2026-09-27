# Amon – Personal Portfolio with React Router (Week 4, Day 4)

A multi-page React portfolio that uses React Router for client-side navigation. A shared layout keeps the header and footer on every page, and each route renders its own page inside it. The site uses a dark theme with teal accents: design tokens and base styles are in `src/index.css`, and layout and component styles are in `src/App.css`.

Live demo: _add your Vercel URL here after the first deploy_

## Pages and routes

| Route | Component | What it shows |
| --- | --- | --- |
| `/` | `Home` | Hero with name and tagline, two call-to-action buttons, and link cards to the other pages |
| `/about` | `About` | Profile photo and a short background from data analytics to AI and software |
| `/projects` | `Projects` | A card grid built from `src/data/projects.js`, with tags and a link or "Coming Soon" label |
| `/contact` | `Contact` | A controlled form with a subject dropdown, live validation after the first submit, and a success message |
| `/users` | `UserList` | A directory of users fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users), with loading skeletons and an error message |
| `/users/:id` | `UserDetail` | One user's full profile, read from the `:id` URL parameter. Unknown or non-numeric IDs show a "User not found" message |
| `/search` | `Search` | Filters `src/data/searchItems.js` by title, category or description. The query lives in the URL (`/search?q=react`), so results can be shared |
| `*` | `NotFound` | A 404 page that shows the unmatched path and a button back to Home |

### Shared components

| Component | What it does | Notes |
| --- | --- | --- |
| `Layout` | Wraps every route with `NavBar`, a `<main>` holding the `<Outlet />`, and `Footer` | Used as the parent `<Route path="/">` element |
| `NavBar` | Logo plus navigation built from a `Links` array with `NavLink` | Highlights the current route with `is-active`; `end` on `/` stops Home staying active on other pages. A hamburger toggle opens the menu below 760px |
| `Footer` | Copyright year and social links | Links open in a new tab with `rel="noopener noreferrer"` |

### Contact form validation

| Field | Rule | Error message |
| --- | --- | --- |
| Name | Must not be empty after trimming | Please enter your name. |
| Email | Must match `something@domain.tld` | Please enter a valid email address. |
| Subject | Must be one of General Inquiry, Bug Report, Feature Request or Partnership | Please choose a subject. |
| Message | At least 20 characters after trimming. A counter under the box shows progress | Your message must be at least 20 characters. |

Fields have neutral borders until the first submit. After that, each field turns red or green and re-checks as you type.

Nothing is sent to a server. A valid submission is logged to the browser console, the form is cleared, and "Thanks for your message! We'll get back to you soon." appears.

## Project structure

```
week-4-day-4-assignment/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json           # Sends every path to index.html so page refreshes work
├── eslint.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx          # React entry point, wraps App in BrowserRouter
    ├── App.jsx           # Route definitions
    ├── App.css           # Layout, nav, buttons, cards, form, footer, responsive rules
    ├── index.css         # Tailwind imports, design tokens (CSS custom properties) and base styles
    ├── assets/
    │   └── profile.jpg   # Photo on the About page
    ├── components/
    │   ├── Footer.jsx
    │   ├── Layout.jsx
    │   └── NavBar.jsx
    ├── data/
    │   ├── projects.js   # Project cards shown on /projects
    │   └── searchItems.js # Items filtered on /search
    └── pages/
        ├── About.jsx
        ├── Contact.jsx
        ├── Home.jsx
        ├── NotFound.jsx
        ├── Projects.jsx
        ├── Search.jsx
        ├── UserDetail.jsx
        └── UserList.jsx
```

## Tech stack

- [React 19](https://react.dev/)
- [React Router 7](https://reactrouter.com/) (`react-router-dom`) for routing
- [Vite 8](https://vite.dev/) for the dev server and production build
- ESLint with the React Hooks and React Refresh plugins
- Plain CSS with custom properties for the shared layout, nav, cards and footer
- [Tailwind CSS 4](https://tailwindcss.com/) utility classes for the Contact, Users and Search pages. `index.css` imports only Tailwind's theme and utilities, not its reset, so it doesn't override the base styles

## Setup

### Prerequisites

- Node.js 20 or newer (the project was built on Node 24)
- npm 10 or newer

Check your versions:

```bash
node -v
npm -v
```

### Install and run

This project lives inside the larger `mctaba` repository, so change into its folder first.

```bash
git clone https://github.com/amokim/mctaba.git
cd "mctaba/Week 4/week-4-day-4-assignment"
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
| `npm run lint` | Run ESLint over the project |

### Editing content

- **Projects:** add or edit entries in `src/data/projects.js`. Each entry needs a unique `id`, a `title`, a `tags` array, a `blurb`, and a `link` (use `null` to show "Coming Soon").
- **Navigation:** edit the `Links` array at the top of `src/components/NavBar.jsx`. Each link has a `to` path and `text` label. Add a matching `<Route>` in `src/App.jsx` for any new page.
- **Search items:** add or edit entries in `src/data/searchItems.js`. Each entry needs a unique `id`, a `title`, a `category`, and a `description`.
- **Social links:** edit the `social` array at the top of `src/components/Footer.jsx`.
- **Colours and fonts:** change the custom properties in `:root` in `src/index.css`.

## Deploying to Vercel

### Option A: Vercel dashboard (recommended)

1. Push your latest changes to GitHub.
2. Sign in at <https://vercel.com> with your GitHub account.
3. Click **Add New → Project** and import the `amokim/mctaba` repository.
4. In the import screen set the following. The **Root Directory** setting is the important one because this project is not at the repository root.

   | Setting | Value |
   | --- | --- |
   | Framework Preset | Vite |
   | Root Directory | `Week 4/week-4-day-4-assignment` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

5. Click **Deploy**. The first build takes about a minute.
6. Vercel gives you a URL such as `https://week-4-day-4-assignment.vercel.app`. Paste it into the **Live demo** line at the top of this README.

Every later push to `main` triggers a new production deployment. Pushes to other branches get their own preview URL.

### Option B: Vercel CLI

```bash
npm i -g vercel
cd "Week 4/week-4-day-4-assignment"
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

- **Blank page after deploy**: check that Root Directory is set to `Week 4/week-4-day-4-assignment`. Without it Vercel builds from the repository root and finds no `package.json`.
- **404 when refreshing a page such as `/about`**: the app uses `BrowserRouter`, so the server must send `index.html` for every path. The `vercel.json` in this folder does that. Check it was committed and that Root Directory points at this folder, otherwise Vercel won't see it.
- **Users page shows "Could not load users"**: the data comes from JSONPlaceholder, so it needs an internet connection. Ad blockers can also block the request.

- **Works locally but a component fails to load on Vercel**: Vercel builds on Linux, where file names are case-sensitive. Make sure each import matches the file name exactly, for example `./NavBar` for `NavBar.jsx`.
- **Blank page locally**: open the browser console (F12). A JavaScript error in a shared component such as `NavBar` stops every page from rendering.

## Learning goals

- Setting up client-side routing with `BrowserRouter`, `Routes`, and `Route`
- Using a layout route with `<Outlet />` so the header and footer are shared across pages
- Using an index route for the home page and a `*` catch-all route for 404s
- Navigating with `Link` and `NavLink`, and styling the active link with `NavLink`'s `className` callback
- Reading the current path with `useLocation` and navigating in code with `useNavigate`
- Using a dynamic route (`users/:id`) and reading the parameter with `useParams`
- Keeping search state in the URL with `useSearchParams`, so a filtered page can be shared or bookmarked
- Fetching data in an effect and cancelling it with `AbortController` when the page changes
- Building a controlled form with `useState` and validating it on the client
- Keeping page content in a separate data file and rendering it with `map` and a stable `key`
- Organising styles into design tokens (`index.css`) and component styles (`App.css`), and mixing in Tailwind utility classes
