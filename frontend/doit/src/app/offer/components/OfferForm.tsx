"use client";

import React from "react";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { BaseForm } from "@/components/ui/BaseForm";
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { DatePickerDialog } from "@/components/ui/DatePicker";
import { useFormData } from "@/app/offer/hooks/useFormData";
import AddressDialog from "@/components/ui/AddressDialog";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
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
            <DatePickerDialog
                onSaveAction={(date) => updateField("date", date.toDateString())}
            />

            <AddressDialog
                onSaveAction={(address) => updateField("address", JSON.stringify(address))}
            />
            <Card className="rounded-3xl border shadow-sm">
                <CardContent className="m-4 p-2 rounded-full border">
                    <p className="w-full px-4 text-sm rounded-full">Scegliere delle categorie</p>
                </CardContent>
                <CardContent className="px-4">
                    <RoundCheckboxSelector
                        onChangeAction={(categories) => updateField("categories", categories)}
                    />
                </CardContent>
            </Card>

            <Card className="rounded-3xl border shadow-sm">
                <CardContent className="m-4 p-2 rounded-full border">
                    <p className="w-full px-4 text-sm rounded-full">Scegliere delle attività</p>
                </CardContent>
                <CardContent className="px-4">
                    <RoundCheckboxSelector
                        onChangeAction={(activities) => updateField("activities", activities)}
                    />
                </CardContent>
            </Card>

            <Textarea
                placeholder="Descrizione dell'utente"
                className="rounded-2xl min-h-[100px]"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
            />

            <Input
                placeholder="Capacità massima di volontari"
                value={formData.volunteerCapacity}
                onChange={(e) => updateField("volunteerCapacity", e.target.value)}
            />
        </BaseForm>
    );
}