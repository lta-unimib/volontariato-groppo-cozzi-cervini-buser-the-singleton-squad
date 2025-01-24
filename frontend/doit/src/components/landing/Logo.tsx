"use client";

import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

/**
 * Logo component for the header.
 *
 * This component renders the logo for the website, which switches between
 * light and dark versions based on the current theme.
 *
 * The logo's image source is dynamically determined based on the theme state.
 * The layout is centered using flexbox.
 */
export function Logo() {
    const theme = useTheme();
    const logoSrc = theme === "dark" ? "/header-logo-dark.svg" : "/header-logo-light.svg";

    return (
        <div className="flex items-center justify-center">
            <Image
                src={logoSrc}
                alt="Logo"
                width={200}
                height={50}
            />
        </div>
    );
}
