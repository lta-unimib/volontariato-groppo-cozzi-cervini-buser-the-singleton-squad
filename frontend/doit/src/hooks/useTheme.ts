"use client";
import { useState, useEffect } from "react";

/**
 * Custom hook to detect and manage the user's preferred theme (light or dark mode).
 *
 * It listens to the system's color scheme preference and updates the theme accordingly.
 *
 * @returns The current theme: 'dark' or 'light'.
 */
export function useTheme() {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        /**
         * Updates the theme based on the media query event.
         *
         * @param e The media query event.
         */
        const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
            const newTheme = e.matches ? "dark" : "light";
            setTheme(newTheme);
        };

        updateTheme(mediaQuery);

        mediaQuery.addEventListener("change", updateTheme);

        return () => mediaQuery.removeEventListener("change", updateTheme);
    }, []);

    return theme;
}