"use client"

import {OrganizationForm} from "@/components/form/auth/OrganizationForm";
import FormHeader from "@/components/header/FormHeader";
import {useBack} from "@/hooks/useBack";

export default function OrganizationSignUp() {
    const handleBack = useBack();

    return (
        <div className={`w-full h-screen flex flex-col`}>
            <div className="block lg:hidden">
                <FormHeader
                    title="Registra una organizzazione"
                    subtitle="Aggiungi una nuova organizzazione e raggiungi più volontari possibili"
                    onBack={handleBack}
                />
            </div>
            <OrganizationForm/>
        </div>
    );
}