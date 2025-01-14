"use client";

import React, { FormEvent, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface SuccessResponse {
    success: boolean;
    message?: string;
}

interface BaseFormProps {
    readonly onSubmitAction: (e: FormEvent) => Promise<SuccessResponse>;
    readonly isValid: boolean;
    readonly children: ReactNode;
    readonly redirectTo?: string;
}

export function BaseForm({ onSubmitAction, isValid, children, redirectTo }: BaseFormProps) {
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        try {
            const result = await onSubmitAction(e);

            if (result && result.success && redirectTo) {
                router.push(redirectTo);
            }
        } catch (error) {
            console.error("Error in base form submission:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-xl p-6">
                {children}
                <Button
                    type="submit"
                    disabled={!isValid}
                    className="w-full bg-primary text-white rounded-full py-2"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}
