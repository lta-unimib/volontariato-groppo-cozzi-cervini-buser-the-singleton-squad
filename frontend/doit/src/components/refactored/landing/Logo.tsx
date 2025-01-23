"use client";

import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

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
