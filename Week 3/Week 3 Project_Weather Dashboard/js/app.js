// Setting up constants and DOM references
const API_KEY = 'a99054448fe17f7516955f928d835c23';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const searchHistoryContainer = document.getElementById('search-history');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const unitToggle = document.getElementById('unit-toggle');
const loadingEl = document.getElementById('loading');
const errorMessageEl = document.getElementById('error-message');
const errorTextEl = document.getElementById('error-text');
const weatherDisplay = document.getElementById('weather-display');
const cityNameEl = document.getElementById('city-name');
const temperatureEl = document.getElementById('temperature');
const weatherIconEl = document.getElementById('weather-icon');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const feelsLikeEl = document.getElementById('feels-like');
const forecastCardsEl = document.getElementById('forecast-cards');

// Unit state: the API always returns metric, we convert on display
let currentUnit = localStorage.getItem('weather-unit') || 'C';
let lastWeatherData = null;
let lastForecastData = null;

// writing helper functions
function showLoading() {
    loadingEl.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
    errorMessageEl.classList.add('hidden');
}

function hideLoading() {
    loadingEl.classList.add('hidden');
}

function showError(message) {
    errorTextEl.textContent = message;
    errorMessageEl.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
}

function showWeather() {
    weatherDisplay.classList.remove('hidden');
    errorMessageEl.classList.add('hidden');
}

// --- Unit conversion helpers ---
function formatTemp(celsius) {
    if (currentUnit === 'F') {
        return `${Math.round(celsius * 9 / 5 + 32)}°F`;
    }
    return `${Math.round(celsius)}°C`;
}

function formatWind(metersPerSecond) {
    if (currentUnit === 'F') {
        return `${(metersPerSecond * 2.237).toFixed(1)} mph`;
    }
    return `${metersPerSecond} m/s`;
}

function updateUnitToggle() {
    unitToggle.querySelectorAll('button').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.unit === currentUnit);
    });
}

unitToggle.addEventListener('click', function(event) {
    const btn = event.target.closest('button[data-unit]');
    if (!btn || btn.dataset.unit === currentUnit) return;

    currentUnit = btn.dataset.unit;
    localStorage.setItem('weather-unit', currentUnit);
    updateUnitToggle();

    // Re-render with the new unit without refetching
    if (lastWeatherData && lastForecastData) {
        displayCurrentWeather(lastWeatherData);
        displayForecast(lastForecastData);
    }
});

// --- Weather condition helpers (icon code -> theme / animation) ---
const CONDITION_MAP = {
    '01': 'clear',
    '02': 'few-clouds',
    '03': 'clouds',
    '04': 'clouds',
    '09': 'rain',
    '10': 'rain',
    '11': 'storm',
    '13': 'snow',
    '50': 'mist'
};

const ANIMATION_MAP = {
    'clear': 'anim-sun',
    'few-clouds': 'anim-cloud',
    'clouds': 'anim-cloud',
    'rain': 'anim-rain',
    'storm': 'anim-storm',
    'snow': 'anim-snow',
    'mist': 'anim-mist'
};

function getCondition(iconCode) {
    return CONDITION_MAP[iconCode.slice(0, 2)] || 'default';
}

function getAnimationClass(iconCode) {
    return ANIMATION_MAP[getCondition(iconCode)] || '';
}

function applyWeatherTheme(iconCode) {
    document.body.dataset.weather = getCondition(iconCode);
    document.body.dataset.time = iconCode.endsWith('n') ? 'night' : 'day';
}

// Build the fetch function (shared by city search and geolocation)
async function fetchWeather(queryParams) {
    // Show loading, hide weather display, hide error
    showLoading();
    // Disable the search button
    searchBtn.disabled = true;
    try {
        // Fetch current weather
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?${queryParams}&appid=${API_KEY}&units=metric`
        );

        // Check response status
        if (weatherResponse.status === 404) {
            throw new Error('City not found');
        }

        if (!weatherResponse.ok) {
            throw new Error('API Error');
        }

        // Parse JSON
        const weatherData = await weatherResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?${queryParams}&appid=${API_KEY}&units=metric`
        );

        // Check response status
        if (forecastResponse.status === 404) {
            throw new Error('City not found');
        }

        if (!forecastResponse.ok) {
            throw new Error('API Error');
        }

        // Parse JSON
        const forecastData = await forecastResponse.json();

        // Keep the raw data so the unit toggle can re-render without refetching
        lastWeatherData = weatherData;
        lastForecastData = forecastData;

        // Display everything
        displayCurrentWeather(weatherData);
        displayForecast(forecastData);
        applyWeatherTheme(weatherData.weather[0].icon);
        showWeather();

        // Save to search history using the API's canonical city name
        saveToHistory(weatherData.name);
    } catch (error) {
        // Show error message (fetch throws a TypeError when it cannot connect)
        if (error instanceof TypeError) {
            showError('Unable to connect. Check your internet connection and try again.');
        } else if (error.message === 'City not found') {
            showError('City not found. Please check the spelling and try again.');
        } else {
            showError('Something went wrong. Please try again later.');
        }
    } finally {
        // Hide loading
        hideLoading();
        // Re-enable search button
        searchBtn.disabled = false;
    }
}

function searchWeather(city) {
    fetchWeather(`q=${encodeURIComponent(city)}`);
}

function searchWeatherByCoords(lat, lon) {
    fetchWeather(`lat=${lat}&lon=${lon}`);
}

// --- Geolocation: auto-detect on page load ---
function detectLocation() {
    if (!navigator.geolocation) {
        loadFallbackCity();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            searchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        function(error) {
            // User denied permission or location unavailable
            console.log('Geolocation unavailable:', error.message);
            loadFallbackCity();
        },
        { timeout: 8000 }
    );
}

// If geolocation fails, show the most recently searched city (if any)
function loadFallbackCity() {
    const history = JSON.parse(localStorage.getItem('weather-history')) || [];
    if (history.length > 0) {
        searchWeather(history[0]);
    }
}

function displayCurrentWeather(data) {
    const { name } = data;
    const { temp, feels_like, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;

    cityNameEl.textContent = name;
    temperatureEl.textContent = formatTemp(temp);
    descriptionEl.textContent = description;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIconEl.alt = description;
    weatherIconEl.className = getAnimationClass(icon);
    humidityEl.textContent = `${humidity}%`;
    windEl.textContent = formatWind(speed);
    feelsLikeEl.textContent = formatTemp(feels_like);
}

function displayForecast(data) {
    forecastCardsEl.innerHTML = '';

    // Filter to get one entry per day
    const dailyData = filterDailyForecast(data.list);

    dailyData.forEach(function(day) {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', {weekday: 'short'});
        const { icon, description } = day.weather[0];

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="day">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
                 alt="${description}"
                 class="${getAnimationClass(icon)}">
            <div class="temp-high">${formatTemp(day.main.temp_max)}</div>
            <div class="temp-low">${formatTemp(day.main.temp_min)}</div>
        `;

        forecastCardsEl.appendChild(card);
    });
}

function filterDailyForecast(list) {
    const days = {};

    list.forEach(function(item) {
        const date = new Date(item.dt * 1000).toLocaleDateString();

        if (!days[date]) {
            days[date] = item;
        }
    });

    // Take the first 5 days
    const allDays = Object.values(days);
    return allDays.slice(0, 5);
}

searchBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city !== '') {
        searchWeather(city);
    }
});

cityInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city !== '') {
            searchWeather(city);
        }
    }
});

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem('weather-history')) || [];

    // Remove city if it already exists (to avoid duplicates)
    history = history.filter(function(item) {
        return item.toLowerCase() !== city.toLowerCase();
    });

    // Add the new city to the beginning
    history.unshift(city);

    // Keep only the last 5
    if (history.length > 5) {
        history = history.slice(0, 5);
    }

    localStorage.setItem('weather-history', JSON.stringify(history));
    renderSearchHistory();
}

function renderSearchHistory() {
    const history = JSON.parse(localStorage.getItem('weather-history')) || [];
    searchHistoryContainer.innerHTML = '';

    history.forEach(function(city) {
        const btn = document.createElement('button');
        btn.className = 'history-btn';
        btn.textContent = city;
        btn.addEventListener('click', function() {
            cityInput.value = city;
            searchWeather(city);
        });
        searchHistoryContainer.appendChild(btn);
    });

    // Only show the clear button when there is something to clear
    clearHistoryBtn.classList.toggle('hidden', history.length === 0);
}

// --- Clear history ---
function clearHistory() {
    localStorage.removeItem('weather-history');
    renderSearchHistory();
}

clearHistoryBtn.addEventListener('click', clearHistory);

// --- Init: run when the page opens ---
updateUnitToggle();
renderSearchHistory();
detectLocation();
