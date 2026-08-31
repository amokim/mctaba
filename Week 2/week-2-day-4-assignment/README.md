# Week 2 – Day 4 Assignment

Three small vanilla-JavaScript DOM exercises, sharing a single stylesheet.

| Exercise | Folder | Entry file |
| --- | --- | --- |
| Modal System | `Modal-system/` | `modal.html` |
| Real-time Form Validation | `Real-time-form-validation/` | `form.html` |
| Drag-and-drop Priority List | `Drag-and-drop-priority-list/` | `drag.html` |

All three pages link to `css/styles.css` via a relative path (`../css/styles.css`), so the
folder structure must be kept intact.

```
week-2-day-4-assignment/
├── css/
│   └── styles.css
├── Modal-system/
│   ├── modal.html
│   └── modal.js
├── Real-time-form-validation/
│   ├── form.html
│   └── form.js
└── Drag-and-drop-priority-list/
    ├── drag.html
    └── drag.js
```

## Setup

No build step, package manager, or dependencies. Plain HTML, CSS, and JavaScript.

### Option 1 – open directly

1. Clone or download this repository.
2. Open any of the entry files in a browser, e.g. double-click `Modal-system/modal.html`.

### Option 2 – run a local server (recommended)

Serving over `http://` avoids browser file-path quirks and matches a real deployment.

From the `week-2-day-4-assignment/` folder:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve .

# or VS Code: right-click an .html file → "Open with Live Server"
```

Then browse to:

- http://localhost:8000/Modal-system/modal.html
- http://localhost:8000/Real-time-form-validation/form.html
- http://localhost:8000/Drag-and-drop-priority-list/drag.html

## What each exercise does

### Modal System (`Modal-system/modal.html`)
- Trigger buttons carry a `data-modal-target` attribute pointing at a modal's `id`.
- Opening a modal adds `.active` and locks body scroll.
- Closes on the `×` button, the "Close" button, a click on the dark overlay, or the `Escape` key.

### Real-time Form Validation (`Real-time-form-validation/form.html`)
- Each field validates on every `input` event:
  - **Name** – at least 2 characters.
  - **Email** – contains `@` and a `.` after the `@`.
  - **Phone** – 10 digits starting with `07` or `01`.
  - **Password** – at least 8 characters, with one uppercase letter and one number.
- Valid/invalid state shows as a coloured border, a ✓/✗ icon, and an inline error message.
- The **Register** button stays disabled until all four fields are valid.
- On submit the form data is logged to the console (`preventDefault`, no network request).

### Drag-and-drop Priority List (`Drag-and-drop-priority-list/drag.html`)
- Built on the native HTML Drag and Drop API (`dragstart`, `dragover`, `drop`, `dragend`).
- A blue indicator line shows whether the drop will land above or below the hovered item.
- Priority numbers renumber automatically after each reorder.

## Browser support

Any modern browser (Chrome, Firefox, Edge, Safari). No transpilation is applied, so the
JavaScript relies on ES6+ features (arrow functions, spread, template literals).
