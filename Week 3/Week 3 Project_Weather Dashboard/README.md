# Weather Dashboard

A single-page weather app built with plain HTML, CSS and JavaScript. It detects your location on load (or you can type any city) and shows the current conditions plus a 5-day forecast, using the [OpenWeatherMap](https://openweathermap.org/) API. Recent searches and your preferred temperature unit are kept in `localStorage` so they survive a page reload.

## Features

- **Current weather** – temperature, condition icon and description, humidity, wind speed and "feels like" temperature.
- **5-day forecast** – one card per day with the day name, icon, high and low.
- **Geolocation** – on page load the app asks for your location and shows the weather for your current city. If permission is denied it falls back to your most recent search.
- **Temperature unit toggle** – switch between °C and °F from the header. Wind speed switches between m/s and mph. The choice is remembered between visits and applied instantly without refetching.
- **Weather-based backgrounds** – the page background changes to match the conditions (clear, clouds, rain, storm, snow, mist) with separate day and night palettes.
- **Animated weather icons** – icons pulse, drift, bob, flash or sway depending on the condition. Animations are disabled automatically for users who prefer reduced motion.
- **Search history** – the last 5 searched cities are shown as clickable chips under the search bar and persist between visits.
- **Clear history** – a button next to the chips wipes the saved history. It only appears when there is something to clear.
- **Loading and error states** – a loading message while fetching, and clear messages for "city not found", network failures and other API errors.
- **Keyboard friendly** – press <kbd>Enter</kbd> in the input to search.
- **Responsive layout** – the details and forecast cards reflow on narrow screens.

## Getting started

### 1. Get an OpenWeatherMap API key

1. Create a free account at <https://home.openweathermap.org/users/sign_up>.
2. Open the **API keys** tab in your account and copy the default key (or generate a new one).
3. New keys can take a couple of hours to activate. Until then requests return `401`.

### 2. Add the key to the project

Open `js/app.js` and replace the value of `API_KEY` at the top of the file:

```js
const API_KEY = 'your_api_key_here';
```

### 3. Run the app

There is no build step or dependency to install. Serve the folder locally:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>.

> **Note:** browsers only allow geolocation on `https://` or `localhost`. If you open `index.html` directly from the file system the location prompt will not appear and the app will fall back to your last searched city (or wait for a manual search).

### 4. Try it out

Allow the location prompt to see your local weather, or type a city such as `London`, `Nairobi` or `New York` and press **Search** or <kbd>Enter</kbd>. Click any chip in the history row to search that city again, use **Clear history** to remove them, and use the **°C / °F** toggle to change units.

## Project structure

```
Week 3 Project_Weather Dashboard/
├── index.html        # Page markup: header with unit toggle, search bar, history, loading/error panels, weather layout
├── css/
│   └── styles.css    # Styling, weather-based backgrounds, icon animations, responsive rules
├── js/
│   └── app.js        # API calls, geolocation, unit conversion, DOM updates, history persistence
└── README.md
```

## How it works

- `fetchWeather(queryParams)` is shared by both search paths. `searchWeather(city)` passes `q=<city>` and `searchWeatherByCoords(lat, lon)` passes `lat=&lon=`. It shows the loading state, disables the button, then calls the `/weather` and `/forecast` endpoints with `units=metric`.
- `detectLocation()` runs on page load and calls `navigator.geolocation.getCurrentPosition`. On success it fetches by coordinates. On failure or denial it calls `loadFallbackCity()`, which loads the most recent history entry if one exists.
- The API is always queried in metric. `formatTemp()` and `formatWind()` convert to °F and mph on display when the unit is set to `F`. The last fetched data is kept in memory so toggling units re-renders without a new request. The unit is stored under the `weather-unit` key in `localStorage`.
- `applyWeatherTheme(iconCode)` maps the OpenWeather icon code (for example `10d`) to a condition using its first two characters and to day or night using its last character. It sets `data-weather` and `data-time` attributes on `<body>`, and the CSS picks a gradient from those attributes with a smooth transition.
- `getAnimationClass(iconCode)` uses the same mapping to attach a CSS animation class (`anim-sun`, `anim-cloud`, `anim-rain`, `anim-storm`, `anim-snow`, `anim-mist`) to the current and forecast icons.
- A `404` from the API is mapped to "City not found", a `TypeError` from `fetch` to a connectivity message, and anything else to a generic error.
- `filterDailyForecast()` reduces the 3-hourly forecast list to the first entry of each calendar day and keeps five days.
- `saveToHistory()` stores the city name returned by the API, de-duplicates case-insensitively, puts the newest city first, trims to 5 entries and stores the array under the `weather-history` key in `localStorage`. `clearHistory()` removes that key and re-renders.
- Weather icons are loaded from `https://openweathermap.org/img/wn/{icon}@2x.png`.

## Tech

- HTML5, CSS3 (Flexbox, Grid, custom properties, keyframe animations), vanilla JavaScript (ES2017 `async`/`await`)
- Browser Geolocation API
- OpenWeatherMap Current Weather and 5 Day / 3 Hour Forecast APIs
- No frameworks, bundlers or packages
