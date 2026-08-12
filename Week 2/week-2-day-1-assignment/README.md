# Week 2, Day 1 Assignment

A set of vanilla JavaScript exercises covering core language fundamentals, working with objects/arrays, and small data-processing helpers — no frameworks, no dependencies.

## Contents

- **Task 1 — JS fundamentals**: `fizzBuzz`, `reverseString`, `isPalindrome`, `findLargest`, `countVowels`
- **Task 2 — Kenyan counties data**: a `counties` object plus `displayCounty`, `formatPopulation`, `bordersString`
- **Task 3 — Nairobi matatu routes**: a `routes` array plus `cheapestRoute`, `routeThroughStop`, `journeyFare`

All logic lives in a single file, `index.js`.

## Setup

Requires [Node.js](https://nodejs.org/) (any recent LTS version). No packages to install.

## Running / testing the functions

`index.js` only defines functions — it doesn't call or print anything on its own. To try them out, load the file into a Node REPL and call functions directly:

```bash
node -i -e "require('./index.js')"
```

Then, at the `>` prompt:

```js
reverseString("hello")            // "olleh"
isPalindrome("level")             // "true"
findLargest([3, 7, 2, 9, 4])      // 9
countVowels("JavaScript")         // 3

displayCounty("Nairobi")          // "Nairobi County | Capital: Nairobi City | Population: 4,397,073 | Area: 696 km²"
formatPopulation(1234567)         // "1,234,567"
bordersString("Kiambu")           // "Kiambu borders Nairobi, Machakos, Murang'a, Nyandarua, Nakuru, and Kajiado"

routeThroughStop(routes, "CBD")   // lists every route that passes through CBD
journeyFare(routes, ["Route 11 - Eastleigh", "Route 23 - Langata"])
```

> Note: `routes` and `counties` are only available inside the REPL session above (they're loaded along with the functions). `cheapestRoute` needs a routes array passed in, e.g. `cheapestRoute(routes)`.

Alternatively, paste the contents of `index.js` into a browser DevTools console and call the functions from there — no browser-specific APIs are used, so it runs identically.

## Known issue

`fizzBuzz(n)` currently returns after the first loop iteration (a `return` sits inside the `for` loop), so it always returns `1` regardless of `n` instead of producing FizzBuzz output for the full range. Flagging this here so it isn't mistaken for correct behavior when testing.
