import React from "react";

type PageProps = {
    children: React.ReactNode;
};

export function Page({ children }: PageProps) {
    return (
        <div className="w-full min-h-screen flex flex-col bg-[var(--neutral-color-neutral-100)]">
            {children}
        </div>
    );
}