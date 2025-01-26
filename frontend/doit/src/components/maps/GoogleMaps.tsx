"use client";

import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import React, { FC, useCallback } from "react";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { useRouter } from "next/navigation";

const DEFAULT_CENTER = { lat: 45.5062108, lng: 8.9012659 };
const DEFAULT_ZOOM = 10;

interface GoogleMapsProps {
    locations: ReadonlyArray<google.maps.LatLngLiteral>;
    requests: Request[];
    isSubscribedView: boolean;
}

export const GoogleMaps: FC<GoogleMapsProps> = ({
                                                    locations,
                                                    requests,
                                                    isSubscribedView
                                                }) => {
    const mapID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID!;
    const router = useRouter();

    const handleMarkerClick = useCallback(
        (requestData: Request, role: string) => {
            const encodedData = encodeURIComponent(JSON.stringify({...requestData, role }));
            router.push(`/detailed/request?data=${encodedData}`);
        },
        [router]
    );

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
                {requests.map((request, index) => (
                    <AdvancedMarker
                        key={index}
                        position={locations[index]}
                        onClick={() => handleMarkerClick(request, "volunteer")}
                    >
                        <div className="bg-primary rounded-full p-4 translate-y-1/2">
                            <MdOutlineMapsHomeWork size={32} className="text-primary-foreground" />
                        </div>
                    </AdvancedMarker>
                ))}
            </Map>
        </div>
    );
};