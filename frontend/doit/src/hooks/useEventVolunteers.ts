"use client"

import { useState, useCallback, useEffect } from "react";
import { makeGetRequest } from "@/utils/api/apiUtils";
import { ApiResponse } from "@/types/request";
import { VolunteerFormData } from "@/types/form/auth/volunteerFormData";

interface Address {
    id: number;
    streetAddress: string;
    city: string;
    postalCode: string;
    houseNumber: string;
    additionalInformation?: string;
}

interface Event {
    id: number;
    title: string;
    detailedDescription: string;
    address: Address;
    volunteers: Partial<VolunteerFormData>[];
    capacity: number;
}

export const useEventVolunteers = () => {
    const [eventsData, setEventsData] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEventVolunteers = useCallback(async () => {
        if (typeof window === 'undefined') return; // Previene l'esecuzione durante SSR

        setLoading(true);
        setError(null);
        try {
            const response = await makeGetRequest<ApiResponse>('/request/volunteer/list/');

            if (response?.status === 200 && Array.isArray(response.data)) {
                setEventsData(response.data);
            } else {
                setError("Impossibile recuperare i dati degli eventi");
                setEventsData([]);
            }
        } catch (error) {
            setError("Si è verificato un errore nel recupero degli eventi");
            setEventsData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEventVolunteers().catch(() => {});
    }, [fetchEventVolunteers]);

    return {
        eventsData: eventsData || [], // Garantisce un array anche durante SSR
        loading,
        error,
        refetch: fetchEventVolunteers
    };
};