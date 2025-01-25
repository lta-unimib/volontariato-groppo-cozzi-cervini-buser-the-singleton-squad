"use client";

import React from "react";
import { Button } from "@/components/core/Button";
import { useFormHandler } from "@/hooks/form/useFormHandler";
import { BaseFormProps } from "@/types/form/baseFormData";

/**
 * A reusable base form component for handling form submissions. It accepts various props to customize the form behavior
 * such as the submit action, validation state, error display, and button appearance.
 *
 * @param {Object} props - The props for the form.
 * @param {Function} props.onSubmitAction - The callback function that handles the form submission.
 * @param {boolean} props.isValid - A boolean indicating whether the form is valid or not.
 * @param {React.ReactNode} props.children - The form fields or components to be rendered inside the form.
 * @param {string} [props.redirectTo] - The URL to redirect after a successful form submission (optional).
 * @param {string} [props.submitText="Submit"] - The text displayed on the submit button (optional).
 * @param {string} [props.className="flex flex-col items-center justify-center md:min-h-screen"] - Additional classes for styling the form (optional).
 * @param {string} [props.buttonClassName="w-full bg-primary text-white rounded-full py-2"] - Classes for styling the submit button (optional).
 *
 * @returns The rendered form component.
 */
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