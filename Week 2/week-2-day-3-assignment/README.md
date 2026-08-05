# Week 2 - Day 3 Assignment

Three small vanilla HTML/CSS/JS apps: a calculator, a character counter, and a shopping list.

## Structure

```
week-2-day-3-assignment/
├── css/
│   └── styles.css
├── Calculator/
│   ├── calculator.html
│   └── calculator.js
├── Character-counter/
│   ├── counter.html
│   └── counter.js
└── Shopping-list/
    ├── shopping-list.html
    └── shopping-list.js
```

## Setup

No build step or dependencies — plain HTML/CSS/JS.

1. Clone or download this repo.
2. Open the HTML file for the app you want directly in a browser, e.g.:
   - `Calculator/calculator.html`
   - `Character-counter/counter.html`
   - `Shopping-list/shopping-list.html`

   Or serve the folder with a local server (e.g. the VS Code "Live Server" extension) and navigate to one of the paths above.

## Apps & example output

### Calculator

Standard button-grid calculator with digits, decimal, `+ - × ÷`, clear, and equals.

```
┌─────────────────────┐
│          12          │  <- display
├─────┬─────┬─────┬────┤
│Clear│  ÷  │  ×  │    │
├─────┼─────┼─────┼────┤
│  7  │  8  │  9  │ -  │
├─────┼─────┼─────┼────┤
│  4  │  5  │  6  │ +  │
├─────┼─────┼─────┼────┤
│  1  │  2  │  3  │ =  │
├─────┴─────┼─────┼────┤
│     0     │  .  │    │
└───────────┴─────┴────┘
```

Example interaction: click `1`, `2`, `+`, `3`, `=` → display shows `15`.

### Character Counter

A textarea with a live character count, capped display of `x/280 characters`, and a Post button.

Example: typing `Hello world!` updates the counter row to:

```
12/280 characters
```

### Shopping List

Add items with a name and quantity; the list renders below with a running count of remaining items and validation errors for empty/invalid input.

Example: adding `Milk` (qty `2`) then `Eggs` (qty `1`) produces:

```
2 items remaining

• Milk   x2
• Eggs   x1
```
