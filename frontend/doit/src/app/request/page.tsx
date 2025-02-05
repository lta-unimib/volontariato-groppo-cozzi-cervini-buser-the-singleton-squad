"use client";

import { RequestForm } from "@/components/form/request/RequestForm";
import FormHeader from "@/components/header/FormHeader";
import { useBack } from "@/hooks/header/useBack";
import React, { Suspense } from "react";

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

            <Suspense fallback={<div>Loading...</div>}>
                <RequestForm />
            </Suspense>
        </div>
    );
}
