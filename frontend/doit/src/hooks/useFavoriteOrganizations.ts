import { useState, useCallback, useEffect } from "react";
import { makeGetRequest } from "@/utils/api/apiUtils";
import { OrganizationFormData } from "@/types/form/auth/organizationFormData";
import { ApiResponse } from "@/types/request";

/**
 * Custom hook to manage and fetch the list of favorite organizations for a volunteer.
 * It handles loading state, error state, and provides a function to refetch the favorite organizations.
 *
 * @returns An object containing:
 * - `organizations`: The list of favorite organizations.
 * - `loading`: A boolean indicating whether the data is still loading.
 * - `error`: An error message if something went wrong while fetching the data.
 * - `refetch`: A function to refetch the favorite organizations.
 */
export const useFavoriteOrganizations = () => {
    const [organizations, setOrganizations] = useState<OrganizationFormData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches the list of favorite organizations from the API.
     * Handles loading, error, and updates the state accordingly.
     */
    const fetchFavoriteOrganizations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await makeGetRequest<ApiResponse>("/volunteer/favorite/organizations/");

            if (response?.status === 200 && Array.isArray(response.data)) {
                setOrganizations(response.data);
            } else {
                setError("Impossibile recuperare le organizzazioni preferite");
                setOrganizations([]);
            }
        } catch (error) {
            console.error("Errore nel recupero delle organizzazioni preferite:", error);
            setError("Si è verificato un errore nel recupero delle organizzazioni");
            setOrganizations([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const loadOrganizations = async () => {
            await fetchFavoriteOrganizations();
        };

        loadOrganizations().catch(console.error);
    }, [fetchFavoriteOrganizations]);

    return {
        organizations,
        loading,
        error,
        refetch: fetchFavoriteOrganizations
    };
};