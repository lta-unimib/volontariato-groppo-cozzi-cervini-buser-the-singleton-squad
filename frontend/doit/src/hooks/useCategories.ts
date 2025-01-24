import { useState, useCallback, useEffect } from "react";
import { makeGetRequest } from "@/utils/api/apiUtils";
import { ApiResponse } from "@/types/request";

interface Category {
    id: string;
    label: string;
}

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await makeGetRequest<ApiResponse>("/categories/all/");
            console.log(response);
            if (response?.status === 200 && Array.isArray(response?.data)) {
                console.log("Categories returned");
                setCategories(response?.data);
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