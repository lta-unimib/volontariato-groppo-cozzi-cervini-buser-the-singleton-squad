import type {Metadata} from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import React from "react";

const roboto = Roboto({
    variable: "--font-family-roboto",
    subsets: ["latin"],
    weight: ["400", "900"],
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
        <body className={`${roboto.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}
