'use client';
import { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export default function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check localStorage for saved theme on initial load
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Toggle dark mode and save preference in localStorage
    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="  w-8 md:w-10 h-8 md:h-10 bg-neutral-900 dark:bg-slate-200 rounded-full font-semibold dark:text-slate-800"
        >
            {isDarkMode ? <LightModeIcon/> : <DarkModeIcon/>}
        </button>
    );
}
