# GameShop – React Component Library (Week 4, Day 1)

A single-page React storefront that demonstrates reusable, props-driven components. Every component is rendered on one page with sample data so you can see how its props change what it displays. The page uses a dark, glossy theme defined in `src/App.css`.

Live demo: _add your Vercel URL here after the first deploy_

## What is on the page

| Section | Component(s) | What it demonstrates |
| --- | --- | --- |
| Sticky top bar | `NavBar` | `brand` text and an array of `links` rendered as anchors |
| Hero | plain markup in `App.jsx` | Page title and tagline |
| Notifications | `AlertBox` | `type` (`success`, `warning`, `error`), `message`, and optional `children` such as a retry button |
| Featured Products | `ProductCard` → `StarRating`, `PriceTag` | Image, name, rating, price, and in/out-of-stock state |
| Top Reviews | `ProfileCard` | Avatar, name, title, and location |
| Team | `TeamPage` → `MemberCard` | A list of members with a title and member label |

### Component props

| Component | Props | Notes |
| --- | --- | --- |
| `NavBar` | `brand`, `links: [{ label, href }]` | Links use hash hrefs to jump to page sections |
| `AlertBox` | `type`, `message`, `children` | Background tint is chosen from `type` |
| `StarRating` | `rating`, `maxStars = 5` | Renders filled and empty stars |
| `PriceTag` | `price`, `currency = "KES"`, `discount` | With `discount`, shows the reduced price and strikes through the original |
| `ProfileCard` | `name`, `title`, `avatar`, `location` | |
| `ProductCard` | `image`, `name`, `price`, `rating`, `inStock` | Out-of-stock cards are greyed out with a badge and a disabled button |
| `MemberCard` | `name`, `role`, `avatar`, `bio` | |
| `TeamPage` | `members`, `title = "Our Team"`, `memberLabel = "team members"` | Prints `members.length` before `memberLabel` |

## Project structure

```
week-4-day-1-assignment/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── logo.svg
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # Page layout and all sample data
    ├── App.css           # Dark glossy theme
    ├── index.css         # Base typography and tokens from the Vite template
    └── components/
        ├── AlertBox.jsx
        ├── MemberCard.jsx
        ├── NavBar.jsx
        ├── PriceTag.jsx
        ├── ProductCard.jsx
        ├── ProfileCard.jsx
        ├── StarRating.jsx
        └── TeamPage.jsx
```

## Tech stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/) for the dev server and production build
- ESLint with the React Hooks and React Refresh plugins
- Plain CSS, no UI framework

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
cd "mctaba/Week 4/week-4-day-1-assignment"
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

### Sample data

All sample data lives at the top of `src/App.jsx`:

- `navLinks` for the navigation bar
- `products` for the product grid, using Steam header images by app ID
- `reviewers` for the review cards
- `supportTeam` for the team section

Avatars come from <https://i.pravatar.cc>, so the page needs an internet connection to show them.

## Previous deployments

Earlier projects in this repository were published with **GitHub Pages**, for example the three Week 3 Day 3 apps:

- Currency Converter: <https://amokim.github.io/mctaba/Week%203/week-3-day-3-assignment/Currency-converter/>
- GitHub Profile Viewer: <https://amokim.github.io/mctaba/Week%203/week-3-day-3-assignment/GitHub-Profile-Viewer/>
- News Headline Aggregator: <https://amokim.github.io/mctaba/Week%203/week-3-day-3-assignment/New-Headline-Aggregator/>

Those apps were plain HTML, CSS, and JavaScript, so GitHub Pages could serve the source files directly from the `main` branch with no build step. The URLs are long because each project sits in a subfolder of the shared repository.

This project is different: it uses JSX and must be compiled by Vite before a browser can run it. Serving the raw source from GitHub Pages will not work. Vercel runs the build for you on every push, which is why it is the recommended host from Week 4 onward.

## Deploying to Vercel

### Option A: Vercel dashboard (recommended)

1. Push your latest changes to GitHub.
2. Sign in at <https://vercel.com> with your GitHub account.
3. Click **Add New → Project** and import the `amokim/mctaba` repository.
4. In the import screen set the following. The **Root Directory** setting is the important one because this project is not at the repository root.

   | Setting | Value |
   | --- | --- |
   | Framework Preset | Vite |
   | Root Directory | `Week 4/week-4-day-1-assignment` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

5. Click **Deploy**. The first build takes about a minute.
6. Vercel gives you a URL such as `https://week-4-day-1-assignment.vercel.app`. Paste it into the **Live demo** line at the top of this README.

Every later push to `main` triggers a new production deployment. Pushes to other branches get their own preview URL.

### Option B: Vercel CLI

```bash
npm i -g vercel
cd "Week 4/week-4-day-1-assignment"
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

- **Blank page after deploy**: check that Root Directory is set to `Week 4/week-4-day-1-assignment`. Without it Vercel builds from the repository root and finds no `package.json`.
- **Build fails on lint errors**: Vercel only runs `npm run build`, not `npm run lint`, so unused imports will not block a deploy. Run the linter locally to keep the code clean.
- **Images missing**: product art is loaded from Steam's CDN and avatars from pravatar. Both are external, so an ad blocker or offline network hides them.

## Learning goals

- Building small, reusable function components that accept props
- Providing default prop values such as `currency = "KES"` and `maxStars = 5`
- Passing arrays of objects and rendering them with `map` and a stable `key`
- Passing elements through `children`
- Composing components, for example `ProductCard` rendering `StarRating` and `PriceTag`
- Styling components with a shared stylesheet and CSS custom properties
