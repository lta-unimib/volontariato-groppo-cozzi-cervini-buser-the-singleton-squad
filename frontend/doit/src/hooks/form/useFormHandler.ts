import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SuccessResponse } from "@/types/form/baseFormData";

/**
 * Custom hook to handle form submission with error handling, submission state, and redirection.
 *
 * @param {Function} onSubmitAction - The function that handles the form submission and returns a `SuccessResponse`.
 * @param {string} [redirectTo] - The optional URL to redirect to if the form submission is successful.
 * @returns - An object containing:
 *   - `handleSubmit`: A function to handle form submission.
 *   - `isSubmitting`: A boolean indicating whether the form is being submitted.
 *   - `error`: A string representing any error message or `null` if no error occurred.
 */
export const useFormHandler = (onSubmitAction: (e: React.FormEvent) => Promise<SuccessResponse>, redirectTo?: string) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Handles the form submission process, including setting the submission state,
     * handling errors, and redirection.
     *
     * @param {React.FormEvent} e - The form submit event.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const result: SuccessResponse = await onSubmitAction(e);

            const redirectUrl = result.redirectUrl || redirectTo;

            if (result.success && redirectUrl) {
                router.push(redirectUrl);
            } else if (!result.success && result.message) {
                setError(result.message);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setError(error instanceof Error ? error.message : "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        handleSubmit,
        isSubmitting,
        error,
    };
};