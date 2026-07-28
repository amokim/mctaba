# Amo — Personal Portfolio

A multi-section, responsive personal portfolio site, built as a first project in HTML5 and CSS3 (with a small amount of vanilla JavaScript for the bonus features).

## Live structure

```
portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
│   ├── avatar.svg
│   └── favicon.svg
└── README.md
```

## Design concept

The site uses a "signal" theme drawn from a real background in telecom and wireless network engineering: a deep navy/graphite palette, a teal "signal" accent, and an amber highlight, with skills displayed as signal-strength bars instead of plain badges. Headings use Space Grotesk, body copy uses IBM Plex Sans, and labels/eyebrows use IBM Plex Mono for a telemetry-readout feel.

## Sections

- **Header & navigation** — sticky header with anchor links to each section
- **Hero** — greeting, tagline, and call-to-action buttons, plus a decorative "signal path" timeline of career waypoints
- **About** — avatar image and background story
- **Skills** — HTML/CSS plus existing background skills, shown as signal-bar cards
- **Projects** — three placeholder project cards laid out with CSS grid
- **Contact** — a styled (non-functional) contact form
- **Footer** — copyright and social links

## Bonus features implemented

- Custom SVG favicon
- Smooth scroll (`scroll-behavior: smooth`)
- Hover animations on buttons, nav links, and project/skill cards
- Dark/light theme toggle (vanilla JS, CSS custom properties, saved to `localStorage`)
- Custom Google Fonts (Space Grotesk, IBM Plex Sans, IBM Plex Mono)
- Back-to-top button that appears on scroll

## Responsive design

Layout adapts at three breakpoints using CSS Grid and Flexbox:
- **Desktop** (1024px+): 3-column projects grid, 4-column skills grid, side-by-side about section
- **Tablet** (~768–900px): 2-column projects/skills grids
- **Mobile** (~375–640px): single-column layout, collapsible hamburger navigation, stacked about section