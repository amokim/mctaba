// Config
const NEWS_API_KEY = "5d2a64aae473aca680a5f901efede266";
const API_BASE = "https://gnews.io/api/v4/top-headlines";
const ARTICLE_COUNT = 10;
const DEFAULT_CATEGORY = "technology";

//Selecting DOM elements
const categoryFilter = document.getElementById('categoryFilter');
const statusArea = document.getElementById('statusArea');
const headlinesGrid = document.getElementById('headlinesGrid');
const cardTemplate = document.getElementById('cardTemplate');
const themeToggle = document.getElementById('themeToggle');

// Setting initial state
let currentCategory = DEFAULT_CATEGORY;

// clear screen & loading contentfunction
function clearScreen() {
    headlinesGrid.innerHTML = '';
}

function showStatus(type, message) {
    statusArea.className = `status-area ${type}`;
    statusArea.innerHTML = "";

    if (type === "loading") {
        const spinner = document.createElement("div");
        spinner.className = "spinner";
        spinner.setAttribute("aria-hidden", "true");
        statusArea.appendChild(spinner);
    }

    const text = document.createElement("p");
    text.textContent = message;
    text.style.margin = "0";
    statusArea.appendChild(text);

    statusArea.hidden = false;
}

function hideStatus() {
    statusArea.hidden = true;
    statusArea.className = "status-area";
    statusArea.innerHTML = "";
}


// format date and categoory function
function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "Unknown date";

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date);
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Web response function
function messageForStatus(status) {
    switch (status) {
        case 400:
            return "The request was invalid. Please try a different category.";
        case 401:
            return "The API key is missing or invalid.";
        case 403:
            return "Daily request limit reached for this API key. Please try again later.";
        case 429:
            return "Too many requests. Please wait a moment and try again.";
        case 503:
            return "The news service is temporarily unavailable. Please try again shortly.";
        default:
            return `Something went wrong while fetching headlines. Please try again.`;
    }
}

// Function to set current category
function setActiveCategory(category) {
    currentCategory = category;
    categoryFilter.querySelectorAll('.category-btn').forEach(btn => {
        const isActive = btn.dataset.category === category;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
    });
}

// Render articles function
function renderArticles(articles) {
    clearScreen();
    if (!articles || articles.length === 0) {
        showStatus("empty", `No ${currentCategory} headlines found right now. Try another category.`);
        return;
    }
    articles.forEach(article => {
        const card = cardTemplate.content.cloneNode(true);
        const image = card.querySelector('.card-image');
        image.src = article.image;
        image.alt = article.title ? `Image for: ${article.title}` : '';
        card.querySelector('.card-category-badge').textContent = capitalize(currentCategory);
        card.querySelector('.card-title').textContent = article.title || 'Untitled';
        card.querySelector('.card-source').textContent = article.source.name || 'Unknown source';
        card.querySelector('.card-date').textContent = formatDate(article.publishedAt);
        card.querySelector('.card-description').textContent = article.description || 'No description available.';
        card.querySelector('.card-link').href = article.url;
        card.querySelector('.card-link').target = '_blank';
        card.querySelector('.card-link').rel = 'noopener noreferrer';
        card.querySelector('.card-link').setAttribute('aria-label', `Read more: ${article.title || 'article'}`);
        headlinesGrid.appendChild(card);
    })
    hideStatus();
}


// Load articles function
async function loadArticles(category) {
    clearScreen();
    showStatus("loading", `Loading ${category} headlines...`);
    try {
        const response = await fetch(`${API_BASE}?category=${category}&lang=en&apikey=${NEWS_API_KEY}`);
        if (!response.ok) {
            throw new Error(messageForStatus(response.status));
        }
        const data = await response.json();
        renderArticles(data.articles);
    } catch (error) {
        if (error.name === "AbortError") return; // superseded by a newer request

        const message =
        error instanceof TypeError
          ? "Unable to reach the news service. Check your internet connection and try again."
          : error.message;
        
        clearScreen();
        showStatus('error', error.message);
        console.error('Error loading articles:', error);
    }
}

//Event listener when user changes category
categoryFilter.addEventListener('click', (event) => {
    const button = event.target.closest('.category-btn');
    if (!button) return;
    const category = button.dataset.category;
    if (!category || category === currentCategory) return;
    setActiveCategory(category);
    loadArticles(category);
});


//Theme toggle function
const root = document.documentElement;

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}

function initTheme() {
    let saved = null;
    try {
        saved = localStorage.getItem(THEME_KEY);
    } catch (_) {
        /* localStorage unavailable */
        const prefersDark =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    
      applyTheme(saved === "dark" || saved === "light" ? saved : prefersDark ? "dark" : "light");
    }
    
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (_) {
        /* ignore */
      }
    });
}

initTheme();
setActiveCategory(currentCategory);
loadArticles(currentCategory);