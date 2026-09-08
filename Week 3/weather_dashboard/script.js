// Setting up constants and DOM references
const API_KEY = 'a99054448fe17f7516955f928d835c23';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const searchHistoryContainer = document.getElementById('search-history');
const loadingEl = document.getElementById('loading');
const errorMessageEl = document.getElementById('error-text');
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
    console.log('Hello');
    // Show loading, hide weather display, hide error
    weatherDisplay.hidden = true;
    errorMessageEl.hidden = true;

    loadingEl.hidden = false;

    // Disable the search button
    searchBtn.disabled = true;
    try {
        // Fetch current weather
        const weatherResponse = await (
            fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`)
        )

        // Check response status
        if (!weatherResponse.ok) {
            if (weatherResponse.status === 404) {
                throw new Error(`${city} not found. Please enter a valid city name!`);
            }
            throw new Error(`API error: ${weatherResponse.status}`)
        }

        // Parse JSON
        weatherData = await weatherResponse.json();
        // Display current weather data
        weatherDisplay.hidden = false;
        displayCurrentWeather(weatherData);
        // Fetch 5-day forecast
        // Parse and display forecast
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