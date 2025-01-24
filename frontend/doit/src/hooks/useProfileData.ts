import { useState, useEffect } from "react";
import { makeGetRequest } from "@/utils/api/apiUtils";
import {ApiResponse} from "@/types/apiResponse";

/**
 * Custom hook to fetch and manage profile data from a given API endpoint.
 * It handles loading, error, and the fetched data.
 *
 * @param url The API endpoint from which to fetch the profile data.
 * @returns An object containing:
 * - `profileData`: The fetched profile data (or null if not yet fetched).
 * - `loading`: A boolean indicating whether the data is still being loaded.
 * - `error`: An error message, or null if no errors occurred.
 *
 * @template T The type of the profile data being fetched.
 */
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