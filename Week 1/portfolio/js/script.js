
document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Theme toggle ---------- */
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const THEME_KEY = "amo-portfolio-theme";
  
    function applyTheme(theme) {
      if (theme === "light") {
        body.classList.add("theme-light");
        themeToggle.setAttribute("aria-pressed", "true");
      } else {
        body.classList.remove("theme-light");
        themeToggle.setAttribute("aria-pressed", "false");
      }
    }
  
    // Respect a previously saved choice, otherwise fall back to system preference.
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem(THEME_KEY);
    } catch (e) {
      // localStorage may be unavailable (e.g. private browsing) — safe to ignore.
    }
  
    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      applyTheme("light");
    }
  
    themeToggle.addEventListener("click", () => {
      const isLight = body.classList.contains("theme-light");
      const nextTheme = isLight ? "dark" : "light";
      applyTheme(nextTheme);
      try {
        localStorage.setItem(THEME_KEY, nextTheme);
      } catch (e) {
        // ignore storage errors
      }
    });
  
    /* ---------- Mobile nav toggle ---------- */
    const navToggle = document.getElementById("navToggle");
    const primaryNav = document.getElementById("primaryNav");
  
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  
    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  
    /* ---------- Back-to-top button ---------- */
    const backToTop = document.getElementById("backToTop");
  
    function toggleBackToTop() {
      if (window.scrollY > 480) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();
  
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
  });