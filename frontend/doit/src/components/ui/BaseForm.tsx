"use client";

import React, { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface BaseFormProps {
    readonly onSubmitAction: (e: React.FormEvent) => Promise<void>;
    readonly isValid: boolean;
    readonly children: ReactNode;
    readonly redirectTo?: string;
}

export function BaseForm({ onSubmitAction, isValid, children, redirectTo }: BaseFormProps) {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        await onSubmitAction(e);
        if (redirectTo) {
            router.push(redirectTo);
        }
    };

    return (
        <div className="w-full mx-auto p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                {children}
                <Button type="submit" className="w-full" disabled={!isValid}>
                    Submit
                </Button>
            </form>
        </div>
    );
}
