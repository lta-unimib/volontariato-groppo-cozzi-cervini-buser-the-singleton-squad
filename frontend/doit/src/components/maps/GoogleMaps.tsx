"use client";

import { Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import React, { FC, useState, useCallback } from "react";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { MapLocationInfo } from "@/app/dashboard/volunteer/page";

const DEFAULT_CENTER = { lat: 45.6100484, lng: 9.1490172 };
const DEFAULT_ZOOM = 17;

interface GoogleMapsProps {
    locations: ReadonlyArray<google.maps.LatLngLiteral>;
    mapLocationInfo: MapLocationInfo[];
}

export const GoogleMaps: FC<GoogleMapsProps> = ({ locations, mapLocationInfo }) => {
    const mapID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID!;
    const [openInfoWindow, setOpenInfoWindow] = useState<number | null>(null);

    const handleMarkerClick = useCallback((index: number) => {
        console.log(`Marker ${index} clicked`);
        setOpenInfoWindow(index);
    }, []);

    const handleInfoWindowClose = useCallback(() => {
        console.log('Info window closed');
        setOpenInfoWindow(null);
    }, []);

    return (
        <div className="w-full h-full rounded-3xl overflow-hidden">
            <Map
                defaultZoom={DEFAULT_ZOOM}
                defaultCenter={DEFAULT_CENTER}
                mapId={mapID}
                gestureHandling="greedy"
                disableDefaultUI={false}
                className="w-full h-full rounded-3xl"
            >
                {locations.map((location, index) => (
                    <React.Fragment key={index}>
                        <AdvancedMarker
                            position={location}
                            onClick={() => handleMarkerClick(index)}
                        >
                            <div className="bg-primary rounded-full p-4 translate-y-1/2">
                                <MdOutlineMapsHomeWork size={32} className="text-primary-foreground"/>
                            </div>
                        </AdvancedMarker>

                        {openInfoWindow === index && mapLocationInfo[index] && (
                            <InfoWindow
                                position={location}
                                onCloseClick={handleInfoWindowClose}
                            >
                                <div className="w-72 h-16">
                                    <h4 className="text-lg font-semibold text-primary-foreground">
                                        {mapLocationInfo[index].street}
                                    </h4>
                                    <h3 className="text-md font-semibold text-primary-foreground">
                                        {mapLocationInfo[index].city}
                                    </h3>
                                </div>
                            </InfoWindow>
                        )}
                    </React.Fragment>
                ))}
            </Map>
        </div>
    );
};
