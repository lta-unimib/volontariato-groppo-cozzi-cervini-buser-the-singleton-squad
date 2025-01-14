"use client";

import { Page } from "@/components/layout/Page";
import { RequestForm } from "@/app/request/components/RequestForm";
import FormHeader from "@/components/layout/FormHeader";
import { useBack } from "@/hooks/useBack";

export default function Home() {
    const handleBack = useBack();

    return (
        <Page>
            <div className="block lg:hidden">
                <FormHeader
                    title="Nuova richiesta"
                    subtitle="Aggiungi una nuova offerta e raggiungi più volontari possibili"
                    onBack={handleBack}
                />
            </div>
            <RequestForm />
        </Page>
    );
}
