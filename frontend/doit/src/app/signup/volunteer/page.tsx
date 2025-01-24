"use client"

import {VolunteerForm} from "@/components/form/auth/VolunteerForm";
import FormHeader from "@/components/header/FormHeader";
import {useBack} from "@/hooks/useBack";

export default function VolunteerSignUp() {
    const handleBack = useBack();

    return (
        <div className={`w-full h-screen flex flex-col`}>
            <div className="block md:hidden">
                <FormHeader
                    title="Registra un volontario"
                    subtitle="Aggiungi un nuovo volontario e aiuta più organizzazioni possibili"
                    onBack={handleBack}
                />
            </div>
            <VolunteerForm/>
        </div>
    );
}