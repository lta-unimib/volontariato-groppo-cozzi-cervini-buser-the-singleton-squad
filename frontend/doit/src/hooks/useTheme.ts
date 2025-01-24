"use client";
import { useState, useEffect } from "react";

export function useTheme() {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

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