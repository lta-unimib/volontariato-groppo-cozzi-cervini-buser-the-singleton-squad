import { useState, useEffect } from "react";
import { makeGetRequest } from "@/utils/api/apiUtils";
import { ApiResponse } from "@/types/apiResponse";

export interface Participant {
    id: string;
    email: string;
}

export function useParticipants(idRequest: string) {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await makeGetRequest<ApiResponse<Participant[]>>(`/request/volunteer/list/${idRequest}`);

                if (response.status === 200 && response.data) {
                    setParticipants(response.data.data || []);
                } else {
                    setError("Failed to fetch participants");
                }
            } catch (error) {
                console.error("Error fetching participants:", error);
                setError("An error occurred while fetching participants");
            } finally {
                setLoading(false);
            }
        })();
    }, [idRequest]);

    return { participants, loading, error };
}