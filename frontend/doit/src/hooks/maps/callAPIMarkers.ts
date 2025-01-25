"use client"

import { makeGetRequest } from "@/utils/api/apiUtils";

interface Request {
    cityInfo: {
        latitude: number;
        longitude: number;
    };
}

export const callAPIMarkers = async (): Promise<ReadonlyArray<google.maps.LatLngLiteral>> => {
    try {
        const response = await makeGetRequest<Request[]>('/request/all/volunteer/sorted/');

        if (response.status !== 200) {
            console.error("API error:", response.message);
            return [];
        }

        const locations = (response.data || []).map((request) => ({
            lat: request.cityInfo.latitude,
            lng: request.cityInfo.longitude
        }));

        console.log("Locations:", locations);
        return locations;
    } catch (error) {
        console.error("Errore durante il recupero dei marker:", error);
        return [];
    }
};