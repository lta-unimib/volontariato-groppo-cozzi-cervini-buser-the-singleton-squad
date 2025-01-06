"use client";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { GITHUB_PAGES } from "@/utils/constants";

export function Logo() {
    const theme = useTheme();
    const logoSrc = theme === "dark" ? "/header-logo-dark.svg" : "/header-logo-light.svg";

    console.log("GITHUB_PAGES value:", GITHUB_PAGES);

    return (
        <div className="flex items-center justify-center">
            {GITHUB_PAGES ? (
                <ImageWrapper
                    src="/header-logo-dark.svg"
                    alt="Logo"
                    width={200}
                    height={50}
                />
            ) : (
                <Image
                    src={logoSrc}
                    alt="Logo"
                    width={200}
                    height={50}
                />
            )}
        </div>
    );
}
