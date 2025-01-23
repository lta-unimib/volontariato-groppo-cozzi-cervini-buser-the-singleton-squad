"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { BaseFormProps, SuccessResponse } from "@/types/refactored/baseForm";

export function BaseForm({
                             onSubmitAction,
                             isValid,
                             children,
                             redirectTo,
                             submitText = "Submit",
                             className = "flex flex-col items-center justify-center min-h-screen",
                             buttonClassName = "w-full bg-primary text-white rounded-full py-2",
                         }: BaseFormProps) {
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

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex flex-col space-y-4 w-full max-w-xl h-full ${className}`}
            noValidate
        >
            {children}
            {error && (
                <div
                    role="alert"
                    className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded"
                >
                    {error}
                </div>
            )}
            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={buttonClassName}
                aria-busy={isSubmitting}
            >
                {isSubmitting ? "Inviando..." : submitText}
            </Button>
        </form>
    );
}