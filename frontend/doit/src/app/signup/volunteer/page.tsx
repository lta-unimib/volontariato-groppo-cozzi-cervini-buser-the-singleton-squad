"use client"

import React, { Suspense } from "react";
import { VolunteerForm } from "@/components/form/auth/VolunteerForm";
import FormHeader from "@/components/header/FormHeader";
import { useBack } from "@/hooks/header/useBack";

/**
 * Component for registering a new volunteer.
 * It displays a header with a title and subtitle on small screens, and a form for volunteer sign-up.
 * The form is wrapped with Suspense for lazy loading.
 *
 * @returns The VolunteerSignUp component.
 */
export default function VolunteerSignUp() {
    const handleBack = useBack();

    return (
        <div className={`w-full h-screen flex flex-col`}>
            {/* Header section for smaller screens */}
            <div className="block md:hidden">
                <FormHeader
                    title="Registra un volontario"
                    subtitle="Aggiungi un nuovo volontario e aiuta più organizzazioni possibili"
                    onBack={handleBack}
                />
            </div>

            {/* Suspense component for lazy loading the VolunteerForm */}
            <Suspense fallback={<div>Loading...</div>}>
                <VolunteerForm />
            </Suspense>
        </div>
    );
}
