"use client"

import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export function GoogleMapsWrapper({ children }: { children: React.ReactNode }) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY == null ? "" : process.env.GOOGLE_MAPS_API_KEY;

    return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
}