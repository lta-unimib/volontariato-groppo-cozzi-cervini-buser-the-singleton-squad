import { useState, useCallback, useEffect } from "react";
import { makeGetRequest } from "@/utils/api/apiUtils";
import { ApiResponse } from "@/types/request";

/**
 * Custom hook to manage and fetch the reviews summary for volunteer, organization, or request.
 */
interface ReviewFormData {
    averageRating: number;
    totalReviews: number;
}

export const useReviews = (type: "volunteer" | "organization" | "request") => {
    const [reviewData, setReviewData] = useState<ReviewFormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches the review summary for the specified type (volunteer, organization, or request).
     */
    const fetchReviews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await makeGetRequest<ApiResponse>(`/reviews/${type}/1/`);
            console.log("response", response);
            if (response?.status === 200 && response.data && 'averageRating' in response.data && 'totalReviews' in response.data) {
                setReviewData(response.data as ReviewFormData);
            } else {
                setError("Impossibile recuperare i dati delle recensioni");
                setReviewData(null);
            }
        } catch (error) {
            setError("Si è verificato un errore nel recupero dei dati delle recensioni");
            setReviewData(null);
        } finally {
            setLoading(false);
        }
    }, [type]);

    useEffect(() => {
        fetchReviews().catch(() => {});
    }, [fetchReviews]);

    return {
        reviewData,
        loading,
        error,
        refetch: fetchReviews
    };
};