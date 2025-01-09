import type {Metadata} from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/app/themeProvider";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "900"],
    display: 'swap',
});

export const metadata: Metadata = {
    title: "DoIT",
    description: "L'app di volontariato per la regione Lombardia",
};

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