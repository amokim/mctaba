import { useEffect, useState } from "react";

const STORAGE_KEY = 'theme';

export default function useTheme() {
    const [theme, setTheme] = useState(() => 
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // storage blocked, theme just won't persist
        }
    }, [theme]);

    const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

    return { theme, toggleTheme };
}