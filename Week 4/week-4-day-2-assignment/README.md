# State Management with useState (Week 4, Day 2)

A single-page React app with three small stateful components: a step counter with undo, a todo list saved to the browser, and a three-step signup form. Each component sits in its own card on the page. The card layout is in `src/App.css`, and each component styles itself with inline styles.

Live demo: _add your Vercel URL here after the first deploy_

## What is on the page

| Section | Component(s) | What it demonstrates |
| --- | --- | --- |
| Counter | `Counter` | Several pieces of state working together: the count, a custom step, and a history used for undo |
| Todo List | `TodoApp` | Array state, add/toggle/delete/filter, and saving to `localStorage` |
| Signup Form | `SignupForm` → `StepOne`, `StepTwo`, `StepThree` | A multi-step form whose parent owns the state and passes values and callbacks to each step |

### Counter

| Feature | How it works |
| --- | --- |
| Step buttons | `+step` and `-step` change the count by the step value |
| Custom step | A text input sets the step. Decimals and negative numbers work, and anything that is not a number counts as `0` |
| Colour | The count is green above zero, red below zero, and grey at zero |
| History | Every change is recorded (clicks that don't change the count are skipped). The last five values are shown as `0->1->2` |
| Undo | Goes back to the previous value. It is disabled when there is nothing to undo |
| Reset | Sets the count to `0` and the step back to `1` |

### Todo List

| Feature | How it works |
| --- | --- |
| Add | Type a task and press **Add** or Enter. Empty input is ignored |
| Complete | Click a task's text to toggle a strike-through |
| Delete | Removes a single task |
| Filters | **All**, **Active** and **Completed**. A filter with no matches shows a short message |
| Clear Completed | Removes every completed task |
| Counter | Shows how many tasks are still open |
| Persistence | Tasks are saved under the `todos` key in `localStorage`, so they survive a page reload |

The saved list is read once, in `useState`'s lazy initializer, and every change writes to state and `localStorage` together, so the component needs no `useEffect`.

### Signup Form

| Step | Component | Props | Notes |
| --- | --- | --- | --- |
| 1. Personal Info | `StepOne` | `name`, `email`, `phone`, `onChange`, `onNext` | **Next** stays disabled until all three fields are filled and the email is valid |
| 2. Preferences | `StepTwo` | `language`, `interests`, `onLanguageChange`, `onInterestToggle`, `onNext`, `onBack` | Radio buttons for language (English, Swahili, Both) and checkboxes for interests |
| 3. Confirmation | `StepThree` | `formData`, `onBack`, `onSubmit` | Shows a summary of everything entered |

`SignupForm` keeps all the answers in one `formData` object, so going **Back** never loses what was typed. Submitting logs the data to the browser console and shows a thank-you message.

## Project structure

```
week-4-day-2-assignment/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # Renders the three sections
    ├── App.css           # Card layout for each section
    ├── index.css         # Base typography and tokens from the Vite template
    └── components/
        ├── counter.jsx
        ├── todoApp.jsx
        ├── Signup.jsx
        ├── StepOne.jsx
        ├── StepTwo.jsx
        └── StepThree.jsx
```

## Tech stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/) for the dev server and production build
- ESLint with the React Hooks and React Refresh plugins
- Plain CSS and inline styles, no UI framework

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
cd "mctaba/Week 4/week-4-day-2-assignment"
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

### Resetting saved todos

Todos are stored in the browser, not in the project. To clear them, open the browser console (F12) and run:

```js
localStorage.removeItem("todos")
```

Then reload the page.

## Deploying to Vercel

### Option A: Vercel dashboard (recommended)

1. Push your latest changes to GitHub.
2. Sign in at <https://vercel.com> with your GitHub account.
3. Click **Add New → Project** and import the `amokim/mctaba` repository.
4. In the import screen set the following. The **Root Directory** setting is the important one because this project is not at the repository root.

   | Setting | Value |
   | --- | --- |
   | Framework Preset | Vite |
   | Root Directory | `Week 4/week-4-day-2-assignment` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

5. Click **Deploy**. The first build takes about a minute.
6. Vercel gives you a URL such as `https://week-4-day-2-assignment.vercel.app`. Paste it into the **Live demo** line at the top of this README.

Every later push to `main` triggers a new production deployment. Pushes to other branches get their own preview URL.

### Option B: Vercel CLI

```bash
npm i -g vercel
cd "Week 4/week-4-day-2-assignment"
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

- **Blank page after deploy**: check that Root Directory is set to `Week 4/week-4-day-2-assignment`. Without it Vercel builds from the repository root and finds no `package.json`.
- **Build fails on lint errors**: Vercel only runs `npm run build`, not `npm run lint`, so unused imports will not block a deploy. Run the linter locally to keep the code clean.
- **Todos from local testing do not appear on the live site**: `localStorage` belongs to each site address, so `localhost` and your Vercel URL keep separate lists.

## Learning goals

- Holding several pieces of related state with `useState`
- Updating state from its previous value with the functional form `setState((prev) => ...)`
- Updating arrays and objects without mutating them, using spread, `map` and `filter`
- Keeping a history array to support undo
- Loading saved data once with a lazy `useState` initializer
- Building controlled inputs, radio buttons and checkboxes
- Lifting state up so a parent owns the data and children receive values and callbacks as props
- Rendering one step at a time with conditional rendering
