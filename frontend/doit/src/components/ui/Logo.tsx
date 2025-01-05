"use client";
import { useTheme } from "@/hooks/useTheme";
import { ImageWrapper } from '@/components/ui/ImageWrapper';

export function Logo() {
    const theme = useTheme();

    if (!theme) return null;

    const logoSrc = theme === 'dark' ? '/header-logo-dark.svg' : '/header-logo-light.svg';

    return (
        <div className="flex items-center justify-center">
            <ImageWrapper
                src={logoSrc}
                alt="Logo"
                width={200}
                height={50}
            />
        </div>
    );
}