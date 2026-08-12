# Quick Fire Trivia

A fast-paced, timed trivia quiz app built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies.

## Features

- **Category & difficulty selection** — choose Geography, Technology, or Culture, and Easy, Medium, or Hard, before starting.
- **10 random questions per quiz** — pulled from the selected category/difficulty pool and shuffled with a Fisher-Yates shuffle, so the order (and selection) is different every attempt.
- **15-second timer per question** with a live countdown and progress bar.
- **Instant feedback** — correct/incorrect answers are highlighted, with a short sound effect for each (Web Audio API, no audio files).
- **Results screen** — score, percentage, and letter grade (A–F) with a matching message.
- **Review screen** — see every question you answered, your answer, and the correct one.
- **High score leaderboard** — top 5 scores are saved to `localStorage` and shown on the start screen, with the date each was achieved.
- **Share score** — copies a shareable summary of your result to the clipboard.

## Project structure

```
.
├── index.html      # Markup for all four screens (start, quiz, results, review)
├── styles.css      # Glassmorphism-style theme, layout, and responsive rules
├── questions.js    # The question bank (quizQuestions array)
└── script.js       # App logic: quiz flow, timer, scoring, leaderboard, sound, share
```

## Setup

No installation or dependencies required — this is a static site.

### Option 1: Open directly

Double-click `index.html`, or open it from your browser with `File > Open`. This works for playing the quiz normally.

### Option 2: Run a local server (recommended)

Some browser features (like clipboard access for "Share Score") behave more reliably when served over `http://` rather than opened as a local `file://` path. From the project folder, run one of the following, then visit the printed URL:

```bash
# Python 3
python -m http.server 8000

# Node.js (no install needed)
npx serve .
```

Then open **http://localhost:8000** (or the port shown) in your browser.

## How to play

1. Select a category and difficulty on the start screen.
2. Click **Start Quiz**.
3. Answer each question before the 15-second timer runs out.
4. View your score, grade, and leaderboard placement at the end.
5. Use **Review Answers** to see a full breakdown, or **Share Score** to copy your result.

## Browser support

Requires a modern browser with support for `localStorage`, the Web Audio API, and the Clipboard API (all current versions of Chrome, Edge, Firefox, and Safari).
