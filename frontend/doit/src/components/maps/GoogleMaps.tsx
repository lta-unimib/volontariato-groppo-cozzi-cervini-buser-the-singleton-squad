"use client";

import React, { useEffect, useRef } from "react";
import { addSingleMarkers } from "@/hooks/maps/markers";

// Costanti per la mappa
const DEFAULT_CENTER = { lat: 45.51530804792321, lng: 9.235410679435955 };
const DEFAULT_ZOOM = 17;

// Definizione dei tipi delle proprietà del componente
interface GoogleMapsProps {
    locations: ReadonlyArray<google.maps.LatLngLiteral>;
}

/**
 * GoogleMaps component renders a map using the Google Maps JavaScript API.
 * It initializes the map with a default center and zoom level, and displays it inside a container.
 * Additionally, it allows adding markers to the map.
 *
 * @param {GoogleMapsProps} props - Component props, including locations for the markers.
 * @returns {JSX.Element} The rendered Google Maps component.
 */
export const GoogleMaps: React.FC<GoogleMapsProps> = ({ locations }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            const map = new window.google.maps.Map(ref.current, {
                center: DEFAULT_CENTER,
                zoom: DEFAULT_ZOOM,
            });

            if (locations && locations.length > 0) {
                addSingleMarkers({ locations, map });
            }
        }
    }, [ref, locations]);

    return (
        <div className="w-full h-full">
            <div ref={ref} className="w-full h-full rounded-2xl" />
        </div>
    );
};
