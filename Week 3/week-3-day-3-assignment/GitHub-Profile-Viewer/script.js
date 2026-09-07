// Getting DOM Elements
const usernameInput = document.getElementById('username-input');
const searchBtn = document.getElementById('search-btn');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const profileSection = document.getElementById('profile-section');
const clearCacheBtn = document.getElementById('clear-cache-btn');
const cacheStatusEl = document.getElementById('cache-status');

// adding cache function
const CACHE_PREFIX = 'ghProfile';
const CACHE_TTL_MS = 5 * 60 * 1000;

function cacheKey(username) {
    return CACHE_PREFIX + username.toLowerCase();
}

function getCachedProfile(username) {
    try {
        const raw = localStorage.getItem(cacheKey(username));
        if (!raw) return null;

        const entry = JSON.parse(raw);

        // Guard against malformed entries
        if (!entry || typeof entry.timestamp !== 'number' || !entry.profile || !Array.isArray(entry.repos)) {
            localStorage.removeItem(cacheKey(username));
            return null;
        }

        const age = Date.now() - entry.timestamp;

        if (age > CACHE_TTL_MS) {
            localStorage.removeItem(cacheKey(username));
            return null;
        }
        return entry;
    } catch (_) {
        return null;
    }
}

function setCachedProfile(username, profile, repos) {
    try {
        const entry = {profile, repos, timestamp: Date.now() };
        localStorage.setItem(cacheKey(username), JSON.stringify(entry));
    } catch (_) {

    }
}

function clearCache() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(CACHE_PREFIX)) keysToRemove.push(key);
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    return keysToRemove.length;
}

function formatAge(timestamp) {
    const seconds = Math.round((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    return `${Math.round(seconds / 60)} min ago`;
}

function showCacheStatus(message) {
    cacheStatusEl.textContent = message;
    cacheStatusEl.hidden = false;
    clearTimeout(showCacheStatus.timer);
    showCacheStatus.timer = setTimeout(() => { cacheStatusEl.hidden = true; }, 2500);
}

async function fetchProfile(username) {
    // Resetting the UI
    profileSection.hidden = true;
    errorEl.hidden = true;
    
    // Serve from cache if its recent
    const cached = getCachedProfile(username);
    if (cached) {
        displayProfile(cached.profile, cached.repos, cached.timestamp);
        return;
    }

    loadingEl.hidden = false;

    try {
        // Fetch profile and repos in parallel
        const [profileResponse, reposResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);

        if (!profileResponse.ok) {
            if (profileResponse.status === 404) {
                throw new Error(`User "${username}" not found. Check the spelling and try again.`);
            }
            if (profileResponse.status === 403) {
                throw new Error(`API rate limit exceeded. Wait a minute and try again.`)
            }
            throw new Error(`Github API error: ${profileResponse.status}`)
        }

        if (!reposResponse.ok) {
            throw new Error(`Could not load repositories (error ${reposResponse.status}).`);
        }

        const profile = await profileResponse.json();
        const allRepos = await reposResponse.json();

        const topRepos = allRepos
            .sort((a,b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 5);

            setCachedProfile(username, profile, topRepos);
        displayProfile(profile, topRepos);
    } catch (error) {
        errorEl.textContent = error.message;
        errorEl.hidden = false;
    } finally {
        loadingEl.hidden = true;
    }
}

// Helper functions
function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function buildStat(value, label) {
    const stat = element('div', 'stat');
    stat.appendChild(element('strong', null, value.toLocaleString()));
    stat.appendChild(element('span', null, label));
    return stat;
}

function buildRepoCard(repo) {
    const card = element('div', 'repo-card');

    const title = element('h4');
    const link = element('a', null, repo.name);
    link.href = repo.html_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    title.appendChild(link);

    const description = element('p', null, repo.description || 'No description.');

    const meta = element('div', 'repo-meta');
    meta.appendChild(element('span', null, `Stars: ${repo.stargazers_count.toLocaleString()}`));
    meta.appendChild(element('span', null, `Language: ${repo.language || 'N/A'}`));

    card.append(title, description, meta);
    return card;
}

function displayProfile(profile, repos, cachedAt) {
    profileSection.innerHTML = '';

    // Show cached indicator when data is served from localStorage
    if (cachedAt) {
        const badge = element('span', 'cache-badge', `Cached . ${formatAge(cachedAt)}`);
        badge.title = 'Served from localStorage. Click "Clear Cache" to fetch fresh data.';
        profileSection.appendChild(badge);
    }

    const header = element('div', 'profile-header');

    const avatar = element('img', 'avatar');
    avatar.src = profile.avatar_url;
    avatar.alt = `${profile.login}'s avatar`;

    const info = element('div', 'profile-info')
    info.appendChild(element('h2', null, profile.name || profile.login));
    info.appendChild(element('p', 'bio', profile.bio || 'No bio available'));

    const stats = element('div', 'stats');
    stats.append(
        buildStat(profile.followers, 'Followers'),
        buildStat(profile.following, 'Following'),
        buildStat(profile.public_repos, 'Repos')
    );
    info.appendChild(stats);

    header.append(avatar, info);

    const reposHeading = element('h3', null, 'Top Repositories');
    const reposList = element('div', 'repos-list');

    if (repos.length === 0) {
        reposList.appendChild(element('p', null, 'No public repositories'));
    } else {
        repos.forEach(repo => reposList.appendChild(buildRepoCard(repo)));
    }

    profileSection.append(header, reposHeading, reposList);
    profileSection.hidden = false;
}

function handleSearch() {
    const username = usernameInput.value.trim();
    if (!username) return;
    fetchProfile(username);
}



searchBtn.addEventListener('click', handleSearch);

clearCacheBtn.addEventListener('click', () => {
    const removed = clearCache();
    showCacheStatus(removed === 0 ? 'Cache is already empty.' : `Cache cleared (${removed} profile${removed === 1 ? '' : 's'}).`);

    const badge = profileSection.querySelector('.cache-badge');
    if (badge) badge.remove();
})

usernameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});