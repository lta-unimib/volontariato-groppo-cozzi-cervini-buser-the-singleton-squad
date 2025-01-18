"use client";

import React, { FormEvent, ReactNode, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface SuccessResponse {
    readonly success: boolean;
    readonly message?: string;
}

interface BaseFormProps {
    readonly onSubmitAction: (e: FormEvent) => Promise<SuccessResponse>;
    readonly isValid: boolean;
    readonly children: ReactNode;
    readonly redirectTo?: string;
    readonly submitText?: string;
    readonly className?: string;
    readonly buttonClassName?: string;
}

export function BaseForm({
                             onSubmitAction,
                             isValid,
                             children,
                             redirectTo,
                             submitText = "Submit",
                             className = "flex flex-col items-center justify-start lg:justify-center sm:min-h-screen",
                             buttonClassName = "w-full bg-primary text-white rounded-full py-2",
                         }: BaseFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await onSubmitAction(e);
            console.log("Form Submission Result:", result);

            if (result.success && redirectTo) {
                router.push(redirectTo);
            } else if (!result.success && result.message) {
                setError(result.message);
            }
        } catch (error) {
            console.error("Error in base form submission:", error);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={className}>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-xl p-6">
                {children}
                {error && (
                    <div className="text-destructive text-sm text-center">
                        {error}
                    </div>
                )}
                <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={buttonClassName}
                >
                    {isSubmitting ? "Submitting..." : submitText}
                </Button>
            </form>
        </div>
    );
}