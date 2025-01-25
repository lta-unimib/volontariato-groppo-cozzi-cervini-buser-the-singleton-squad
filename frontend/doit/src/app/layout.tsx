import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/app/themeProvider";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "900"],
    display: 'swap',
});

/**
 * Metadata for the root layout, including the title and description of the app.
 *
 * @type {Metadata}
 */
export const metadata: Metadata = {
    title: "DoIT",
    description: "L'app di volontariato per la regione Lombardia",
};

/**
 * Root layout component for the application.
 * This component provides the global HTML structure, including the theme provider and font styling.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children elements to be rendered inside the layout.
 *
 * @returns The RootLayout component.
 */
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${roboto.className} antialiased`}>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
