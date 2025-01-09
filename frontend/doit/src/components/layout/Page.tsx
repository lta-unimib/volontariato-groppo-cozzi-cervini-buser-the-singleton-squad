import React from "react";

type PageProps = {
    readonly children: React.ReactNode;
};

export function Page({ children }: PageProps) {
    return (
        <div className="w-full h-screen flex flex-col bg-[var(--neutral-color-neutral-100)]">
            {children}
        </div>
    );
}