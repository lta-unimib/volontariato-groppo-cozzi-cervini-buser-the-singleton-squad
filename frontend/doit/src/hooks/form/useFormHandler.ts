import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SuccessResponse } from "@/types/form/baseFormData";

export const useFormHandler = (onSubmitAction: (e: React.FormEvent) => Promise<SuccessResponse>, redirectTo?: string) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

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