// Setting up constants and DOM references
const API_KEY = 'a99054448fe17f7516955f928d835c23';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const searchHistoryContainer = document.getElementById('search-history');
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

// Build the search function
async function searchWeather(city) {
    // Show loading, hide weather display, hide error
    weatherDisplay.hidden = true;
    errorMessageEl.hidden = true;

    loadingEl.hidden = false;

    // Disable the search button
    searchBtn.disabled = true;
    try {
        // Fetch current weather
        const weatherResponse = await (
            fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)
        )

        // Check response status
        if (!weatherResponse.ok) {
            if (weatherResponse.status === 404) {
                throw new Error(`${city} not found. Please enter a valid city name!`);
            }
            throw new Error(`API error: ${weatherResponse.status}`)
        }

        // Parse JSON
        const weatherData = await weatherResponse.json();
        // Display current weather data
        displayCurrentWeather(weatherData);
        // Fetch 5-day forecast
        const forecastResponse = await (
        fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`)
        )

        // Check response status
        if (!forecastResponse.ok) {
            if (forecastResponse.status === 404) {
                throw new Error(`${city} not found. Please enter a valid city name!`);
            }
            throw new Error(`API error: ${forecastResponse.status}`)
        }

        // Parse JSON
        const forecastData = await forecastResponse.json();
        // Parse and display forecast
        displayForecast(forecastData)
        weatherDisplay.hidden = false;
        // Save to search history
    } catch (error) {
        // Show error message
        errorMessageEl.hidden = false;
        errorTextEl.textContent = error.message;
    } finally {
        // Hide loading
        loadingEl.hidden = true;
        // Re-enable search button
        searchBtn.disabled = false;
    }
}

function displayCurrentWeather(data) {
    const { name } = data;
    const { temp, feels_like, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;

    cityNameEl.textContent = name;
    temperatureEl.textContent = `${Math.round(temp)}°C`;
    descriptionEl.textContent = description;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIconEl.alt = description;
    humidityEl.textContent = `${humidity}%`;
    windEl.textContent = `${speed} m/s`;
    feelsLikeEl.textContent = `${Math.round(feels_like)}°C`;
}

function displayForecast(data) {
    forecastCardsEl.innerHTML = '';

    // Filter to get one entry per day (at noon or closest to it)
    const dailyData = filterDailyForecast(data.list);

    dailyData.forEach(function(day) {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', {weekday: 'short'});
        const { icon, description } = day.weather[0];
        const tempHigh = Math.round(day.main.temp_max);
        const tempLow = Math.round(day.main.temp_min);

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="day">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <div class="temp-high">${tempHigh}°C</div>
            <div class="temp-low">${tempLow}°C</div>
        `;

        forecastCardsEl.appendChild(card);
    })
}

function filterDailyForecast(list) {
    const days = {};

    list.forEach(function(item) {
        const date = new Date(item.dt * 1000).toLocaleDateString();

        if (!days[date]) {
            days[date] = item;
        }
    });

    // Remove today (we already show current weather) and take next 5 days
    const allDays = Object.values(days);
    return allDays.slice(1, 6);
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