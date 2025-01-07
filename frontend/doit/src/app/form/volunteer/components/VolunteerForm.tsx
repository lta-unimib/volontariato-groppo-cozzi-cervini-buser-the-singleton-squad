"use client";

import React from "react";
import { CityPicker } from "@/components/ui/CityPicker";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { BaseForm } from "@/components/ui/BaseForm";
import { useFormData } from '@/app/form/volunteer/hooks/useFormData';
import { useFormSubmission } from '@/app/form/volunteer/hooks/useFormSubmission';
import { isFormValid } from '@/app/form/volunteer/utils/formValidation';
import { AvailabilityDialog } from '@/app/form/volunteer/components/AvailabilityPicker';

export function VolunteerForm() {
    const { formData, updateField } = useFormData();
    const { handleSubmit } = useFormSubmission(formData);

    return (
        <BaseForm
            onSubmitAction={handleSubmit}
            isValid={isFormValid(formData)}
            redirectTo="../../../dashboard/volunteer"
        >
            <AvailabilityDialog
                onSaveAction={(availability) => updateField('availability', availability)}
            />
            <CityPicker
                value={formData.city}
                onChange={(city) => updateField('city', city)}
            />
            <RoundCheckboxSelector
                onChange={(preferences) => updateField('preferences', preferences)}
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