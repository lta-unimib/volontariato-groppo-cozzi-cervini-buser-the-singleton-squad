"use client";
import { useTheme } from "@/hooks/useTheme";
import { ImageWrapper } from '@/components/ui/ImageWrapper';

export function Logo() {
    // const theme = useTheme();

    return (
        <div className="flex items-center justify-center">
            <ImageWrapper
                src="/header-logo-dark.svg" //{theme === 'dark' ? '/header-logo-dark.svg' : '/header-logo-light.svg'}
                alt="Logo"
                width={200}
                height={50}
            />
        </div>
    );
}