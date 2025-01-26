import { useState, useEffect } from "react";
import { makeGetRequest } from "@/utils/api/apiUtils";
import {ApiResponse} from "@/types/apiResponse";


export function useProfileData<T>(url: string) {
    const [profileData, setProfileData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await makeGetRequest<ApiResponse<T>>(url);

                if (response.status === 200 && response.data) {
                    setProfileData(response.data as T);
                } else {
                    setError("Failed to fetch profile data");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setError("An error occurred while fetching profile data");
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { profileData, loading, error };
}