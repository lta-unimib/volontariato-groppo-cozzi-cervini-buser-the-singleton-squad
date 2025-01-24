"use client";

import React, { useEffect, useRef } from "react";

const DEFAULT_CENTER = { lat: 45.51530804792321, lng: 9.235410679435955 };
const DEFAULT_ZOOM = 17;

/**
 * GoogleMaps component renders a map using the Google Maps JavaScript API.
 * It initializes the map with a default center and zoom level, and displays it inside a container.
 *
 * @returns The rendered Google Maps component.
 */
export const GoogleMaps = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            new window.google.maps.Map(ref.current, {
                center: DEFAULT_CENTER,
                zoom: DEFAULT_ZOOM,
            });
        }
    }, [ref]);

    return (
        <div className="w-full h-full">
            <div
                ref={ref}
                className="w-full h-full rounded-2xl"
            />
        </div>
    );
};
