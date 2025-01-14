"use client";

import React from "react";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { BaseForm } from "@/components/ui/form/BaseForm";
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { DatePickerDialog } from "@/app/offer/components/DatePicker";
import { useFormData } from "@/app/offer/hooks/useFormData";
import AddressDialog from "@/app/offer/components/AddressDialog";
import { Input } from "@/components/ui/Input";
import { isFormValid } from "@/app/offer/utils/formValidation";

export function OfferForm() {
    const { formData, updateField } = useFormData();
    const { handleSubmit } = useFormSubmission("offer");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleSubmit(formData);
            return { success: true };
        } catch (error) {
            console.error("Error during form submission:", error);
            return { success: false, message: "Submission failed" };
        }
    };

    return (
        <BaseForm
            onSubmitAction={onSubmit}
            isValid={isFormValid(formData)}
            redirectTo={"../../../dashboard/organization"}
        >
            <div className="flex flex-col space-y-4">
                <DatePickerDialog
                    onSaveAction={(date) => updateField("date", date.toDateString())}
                />

                <AddressDialog
                    onSaveAction={(address) => updateField("address", JSON.stringify(address))}
                />

                <RoundCheckboxSelector
                    onChangeAction={(categories) => updateField("categories", categories)}
                />

                <RoundCheckboxSelector
                    onChangeAction={(activities) => updateField("activities", activities)}
                />

                <Textarea
                    placeholder="Descrizione dell'utente"
                    className="rounded-2xl min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                />

                <Input
                    placeholder="Capacità massima di volontari"
                    className="rounded-full"
                    value={formData.volunteerCapacity}
                    onChange={(e) => updateField("volunteerCapacity", e.target.value)}
                />
            </div>
        </BaseForm>
    );
}