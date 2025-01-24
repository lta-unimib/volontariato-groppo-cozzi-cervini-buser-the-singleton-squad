"use client"

import { Page } from '@/components/Page';
import {OrganizationForm} from "@/app/form/organization/components/OrganizationForm";
import FormHeader from "@/components/ui/FormHeader";
import {useBack} from "@/hooks/useBack";

export default function Home() {
    const handleBack = useBack();

    return (
        <Page>
            <div className="block lg:hidden">
                <FormHeader
                    title="Registra una organizzazione"
                    subtitle="Aggiungi una nuova organizzazione e raggiungi più volontari possibili"
                    onBack={handleBack}
                />
            </div>
            <OrganizationForm/>
        </Page>
    );
}