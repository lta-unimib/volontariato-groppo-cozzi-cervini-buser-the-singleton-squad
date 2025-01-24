"use client";

import React from "react";

type PageProps = {
    readonly children: React.ReactNode;
};

export function Page({ children }: PageProps) {
    return (
        <div className={`w-full h-screen flex flex-col bg-background`}>
            {children}
        </div>
    );
}