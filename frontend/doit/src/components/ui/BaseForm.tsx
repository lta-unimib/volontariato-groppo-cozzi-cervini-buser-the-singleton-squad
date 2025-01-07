import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/Button";

interface BaseFormProps {
    onSubmit: (e: React.FormEvent) => Promise<void>;
    isValid: boolean;
    children: ReactNode;
}

export function BaseForm({ onSubmit, isValid, children }: BaseFormProps) {
    return (
        <div className="w-full mx-auto p-6 sm:p-8 md:p-10">
            <form onSubmit={onSubmit} className="space-y-4">
                {children}
                <Button type="submit" className="w-full" disabled={!isValid}>
                    Submit
                </Button>
            </form>
        </div>
    );
}