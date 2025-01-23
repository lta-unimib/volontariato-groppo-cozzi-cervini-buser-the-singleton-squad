"use client"

import {OrganizationForm} from "@/components/refactored/form/OrganizationForm";
import FormHeader from "@/components/ui/FormHeader";
import {useBack} from "@/hooks/refactored/useBack";

export default function OrganizationSignUp() {
    const handleBack = useBack();

    return (
        <div>
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