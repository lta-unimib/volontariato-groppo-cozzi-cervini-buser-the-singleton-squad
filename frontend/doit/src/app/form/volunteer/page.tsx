"use client"

import { Page } from '@/components/Page';
import {VolunteerForm} from "@/app/form/volunteer/components/VolunteerForm";
import FormHeader from "@/components/ui/FormHeader";
import {useBack} from "@/hooks/refactored/useBack";

export default function Home() {
    const handleBack = useBack();

    return (
        <Page>
            <div className="block md:hidden">
                <FormHeader
                    title="Registra un volontario"
                    subtitle="Aggiungi un nuovo volontario e aiuta più organizzazioni possibili"
                    onBack={handleBack}
                />
            </div>
            <VolunteerForm/>
        </Page>
    );
}