import { useState, useCallback, useEffect } from "react";
import { makeGetRequest } from "@/utils/api/apiUtils";
import { OrganizationFormData } from "@/types/form/auth/organizationFormData";
import { ApiResponse } from "@/types/request";

export const useFavoriteOrganizations = () => {
    const [organizations, setOrganizations] = useState<OrganizationFormData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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