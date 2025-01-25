"use client";

import { RequestForm } from "@/components/form/request/RequestForm";
import FormHeader from "@/components/header/FormHeader";
import { useBack } from "@/hooks/header/useBack";
import React, { Suspense } from "react";

/**
 * Component for creating a new request.
 * It displays a header and a form for submitting a new request.
 * The header is hidden on small screens, and the form is wrapped with Suspense for lazy loading.
 *
 * @returns The NewRequest component.
 */
export default function NewRequest() {
    const handleBack = useBack();

    return (
        <div className={`w-full h-screen flex flex-col`}>
            {/* Header section for smaller screens */}
            <div className="block lg:hidden">
                <FormHeader
                    title="Nuova richiesta"
                    subtitle="Aggiungi una nuova offerta e raggiungi più volontari possibili"
                    onBack={handleBack}
                />
            </div>

            {/* Suspense component for lazy loading the RequestForm */}
            <Suspense fallback={<div>Loading...</div>}>
                <RequestForm />
            </Suspense>
        </div>
    );
}
