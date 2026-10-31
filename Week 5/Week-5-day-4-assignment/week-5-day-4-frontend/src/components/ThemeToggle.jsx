function ThemeToggle({ theme, onToggle }) {
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={onToggle}
            // screen readers announce what the button will DO
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {/* show the theme you'll switch TO */}
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
            {isDark ? 'Light' : 'Dark'}
        </button>
    );
}

export default ThemeToggle;
