"use client";

import { OrganizationForm } from "@/components/form/auth/OrganizationForm";
import FormHeader from "@/components/header/FormHeader";
import { useBack } from "@/hooks/header/useBack";
import React, { Suspense } from "react";

/**
 * Component for registering a new organization.
 * It displays a header with a title and subtitle on small screens, and a form for organization sign-up.
 * The form is wrapped with Suspense for lazy loading.
 *
 * @returns The OrganizationSignUp component.
 */
export default function OrganizationSignUp() {
    const handleBack = useBack();

    return (
        <div className={`w-full h-screen flex flex-col`}>
            {/* Header section for smaller screens */}
            <div className="block lg:hidden">
                <FormHeader
                    title="Registra una organizzazione"
                    subtitle="Aggiungi una nuova organizzazione e raggiungi più volontari possibili"
                    onBack={handleBack}
                />
            </div>

            {/* Suspense component for lazy loading the OrganizationForm */}
            <Suspense fallback={<div>Loading...</div>}>
                <OrganizationForm />
            </Suspense>
        </div>
    );
}
