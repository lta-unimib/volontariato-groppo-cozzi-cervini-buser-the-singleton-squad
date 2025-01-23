"use client";

import { RequestForm } from "@/app/request/components/RequestForm";
import FormHeader from "@/components/ui/FormHeader";
import { useBack } from "@/hooks/refactored/useBack";

export default function NewRequest() {
    const handleBack = useBack();

    return (
        <div className={`w-full h-screen flex flex-col`}>
            <div className="block lg:hidden">
                <FormHeader
                    title="Nuova richiesta"
                    subtitle="Aggiungi una nuova offerta e raggiungi più volontari possibili"
                    onBack={handleBack}
                />
            </div>
            <RequestForm />
        </div>
    );
}
