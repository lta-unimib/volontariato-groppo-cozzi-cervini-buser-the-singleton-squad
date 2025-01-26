import { useState, useCallback } from "react";
import { makePostRequest } from "@/utils/api/apiUtils";
import { ApiResponse } from "@/types/request";
//volunteer | request
export const useReviewSubmission = (type: "volunteer" | "organization") => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const submitReview = useCallback(
        async (id: string, rating: number, email?: string) => {
            setLoading(true);
            setError(null);
            setSuccess(false);
            console.log( "ID DELLA RICHIESTA DEBUG ==> "+ id);
            try {
                const payload = { rating, ...(email ? { email } : {}) };
                const response = await makePostRequest<ApiResponse>(
                    `/feedback/${id}/`,
                    payload
                );
                console.log("response - FEEDBACK", response);
                if (response?.status === 201) {
                    setSuccess(true);
                } else {
                    setError("Impossibile inviare la recensione");
                }
            } catch (error) {
                setError("Si è verificato un errore durante l'invio della recensione");
            } finally {
                setLoading(false);
            }
        },
        [type]
    );

    return {
        submitReview,
        loading,
        error,
        success
    };
};