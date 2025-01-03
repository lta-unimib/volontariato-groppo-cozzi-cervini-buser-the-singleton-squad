import type {Metadata} from "next";
import {Roboto, Roboto_Condensed} from "next/font/google";
import "./globals.css";
import React from "react";

const roboto = Roboto({
    variable: "--font-family-roboto",
    subsets: ["latin"],
    weight: ["400", "900"],
});

const robotoCondensed = Roboto_Condensed({
    variable: "--font-family-roboto-condensed",
    subsets: ["latin"],
    weight: ["400"],
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
        <body className={`${roboto.variable} ${robotoCondensed.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}
