"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { useFormHandler } from "@/hooks/refactored/useFormHandler";
import { BaseFormProps } from "@/types/refactored/baseForm";

export function BaseForm({
                             onSubmitAction,
                             isValid,
                             children,
                             redirectTo,
                             submitText = "Submit",
                             className = "flex flex-col items-center justify-center min-h-screen",
                             buttonClassName = "w-full bg-primary text-white rounded-full py-2",
                         }: BaseFormProps) {
    const { handleSubmit, isSubmitting, error } = useFormHandler(onSubmitAction, redirectTo);

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