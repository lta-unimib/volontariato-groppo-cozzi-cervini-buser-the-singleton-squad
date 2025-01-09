"use client";
import { useState, useEffect } from "react";
import { GITHUB_PAGES } from "@/utils/constants";

export function useTheme() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        if (GITHUB_PAGES) {
            setTheme("light");
            return;
        }

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
