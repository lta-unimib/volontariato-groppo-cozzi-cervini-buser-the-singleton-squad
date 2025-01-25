import { useState, useCallback, useEffect } from "react";
import { makeGetRequest } from "@/utils/api/apiUtils";
import { ApiResponse } from "@/types/request";

interface Category {
    id: string;
    label: string;
}

/**
 * Custom hook to fetch and manage categories from the API.
 *
 * @returns {Object} The hook's return values.
 * @returns {Category[]} categories - The list of fetched categories.
 * @returns {boolean} loading - Indicates if the data is still being fetched.
 * @returns {string | null} error - Contains an error message if fetching fails.
 * @returns fetch - Function to manually trigger a category fetch.
 */
export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches categories from the API and updates the state accordingly.
     */
    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await makeGetRequest<ApiResponse>("/categories/all/");
            console.log("Categories Response:", response);

            if (response?.status === 200) {
                let parsedCategories: Category[] = [];

                if (response.data && Array.isArray(response.data)) {
                    parsedCategories = response.data.map((category, index) => ({
                        id: `category_${index}`,
                        label: category
                    }));
                }
                else if (response.message) {
                    parsedCategories = response.message
                        .replace(/^\[|]$/g, '')
                        .split(',')
                        .map((label: string, index: number) => ({
                            id: `category_${index}`,
                            label: label.trim()
                        }));
                }

                setCategories(parsedCategories);
            } else {
                setError("Impossibile recuperare le categorie");
                setCategories([]);
            }
        } catch (error) {
            console.error("Errore nel recupero delle categorie:", error);
            setError("Si è verificato un errore nel recupero delle categorie");
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Effect hook to fetch categories on component mount.
     */
    useEffect(() => {
        const loadCategories = async () => {
            await fetchCategories();
        };
        loadCategories().catch(console.error);
    }, [fetchCategories]);

    return {
        categories,
        loading,
        error,
        fetch: fetchCategories
    };
};