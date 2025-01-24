"use client"

import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

/**
 * GoogleMapsWrapper component is a wrapper that provides the Google Maps JavaScript API to its children components.
 * It uses the `googlemaps/react-wrapper` package to load the Google Maps API using an API key stored in the environment variables.
 *
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components that will be rendered inside the wrapper.
 *
 * @returns The rendered wrapper component with the Google Maps API loaded.
 */
export function GoogleMapsWrapper({ children }: { children: React.ReactNode }) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY == null ? "" : process.env.GOOGLE_MAPS_API_KEY;

    return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
}
