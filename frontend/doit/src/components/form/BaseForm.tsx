"use client";

import React from "react";
import { Button } from "@/components/core/Button";
import { useFormHandler } from "@/hooks/form/useFormHandler";
import { BaseFormProps } from "@/types/form/baseFormData";

export function BaseForm({
                             onSubmitAction,
                             isValid,
                             children,
                             redirectTo,
                             submitText = "Submit",
                             className = "flex flex-col items-center justify-center md:min-h-screen",
                             buttonClassName = "w-full bg-primary text-white rounded-full py-2",
                         }: BaseFormProps) {
    const { handleSubmit, isSubmitting, error } = useFormHandler(onSubmitAction, redirectTo);

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex flex-col pb-12 md:pb-0 space-y-4 w-full max-w-xl ${className}`}
            noValidate
        >
            {children}
            {error && (
                <div
                    role="alert"
                    className="text-destructive text-sm text-center p-2"
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