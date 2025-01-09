"use client";

import React from "react";
import { CityPicker } from "@/components/ui/CityPicker";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { BaseForm } from "@/components/ui/BaseForm";
import { useFormData } from '@/app/form/volunteer/hooks/useFormData';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { isFormValid } from '@/app/form/volunteer/utils/formValidation';
import { AvailabilityDialog } from '@/app/form/volunteer/components/AvailabilityPicker';

export function VolunteerForm() {
    const { formData, updateField } = useFormData();
    const { handleSubmit } = useFormSubmission(formData, "volunteer");

    return (
        <BaseForm
            onSubmitAction={handleSubmit}
            isValid={isFormValid(formData)}
            redirectTo={"../../../dashboard/volunteer"}
        >
            <AvailabilityDialog
                onSaveAction={(availability) => updateField('availability', availability)}
            />
            <CityPicker
                value={formData.city}
                onChangeAction={(selectedCity) => updateField("city", selectedCity)}
            />
            <RoundCheckboxSelector
                onChangeAction={(preferences: string[]) => updateField('preferences', preferences)}
            />
            <Textarea
                placeholder="Descrizione dell'utente"
                className="rounded-2xl min-h-[100px]"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
            />
        </BaseForm>
    );
}