import { useState, useEffect, useCallback } from 'react';
import { makeGetRequest } from '@/utils/api/apiUtils';
import { Request, ApiResponse } from '@/types/request';


const isRequestArray = (data: unknown): data is Request[] => {
    return Array.isArray(data) &&
        data.every(item => typeof item === 'object' && item !== null && 'id' in item);
};


export const useAllRequests = (endpoint: string) => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches the requests from the provided API endpoint.
     *
     * Sets the `requests` state with the data if successful, or handles errors.
     */
    const fetchRequests = useCallback(async () => {
        try {
            const response = await makeGetRequest<ApiResponse>(endpoint);

            if (response && response.status === 200 && isRequestArray(response.data)) {
                setRequests(response.data);
            } else {
                setError("Failed to fetch requests");
                setRequests([]);
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
            setError("An error occurred while fetching requests");
            setRequests([]);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    // Trigger the request fetching when the component mounts or the endpoint changes
    useEffect(() => {
        void fetchRequests();
    }, [fetchRequests]);

    return { requests, loading, error, refetch: fetchRequests };
};


export const useVolunteerRequests = () => {
    const [registeredRequests, setRegisteredRequests] = useState<Request[]>([]);
    const [notVotedRequests, setNotVotedRequests] = useState<Request[]>([]);
    const [archivedRequests, setArchivedRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const fetchRegisteredRequests = useCallback(async () => {
        try {
            const [registered, notVoted, archived] = await Promise.all([
                makeGetRequest<ApiResponse>("/request/all/volunteer/registered/"),
                makeGetRequest<ApiResponse>("/request/all/volunteer/notvoted/"),
                makeGetRequest<ApiResponse>("/request/all/volunteer/archived/")
            ]);

            setRegisteredRequests(
                registered && registered.status === 200 && isRequestArray(registered.data)
                    ? registered.data : []
            );
            setNotVotedRequests(
                notVoted && notVoted.status === 200 && isRequestArray(notVoted.data)
                    ? notVoted.data : []
            );
            setArchivedRequests(
                archived && archived.status === 200 && isRequestArray(archived.data)
                    ? archived.data : []
            );
        } catch (error) {
            console.error("Error fetching registered requests:", error);
            setError("An error occurred while fetching registered requests");
        } finally {
            setLoading(false);
        }
    }, []);

    // Trigger the request fetching when the component mounts
    useEffect(() => {
        void fetchRegisteredRequests();
    }, [fetchRegisteredRequests]);

    return {
        subscribedRequests: registeredRequests,
        notVotedRequests,
        archivedRequests,
        loading,
        error,
        refetch: fetchRegisteredRequests
    };
};