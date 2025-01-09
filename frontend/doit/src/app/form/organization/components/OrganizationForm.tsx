"use client";

import React from "react";
import { MdOutlineBusiness } from "react-icons/md";
import { CityPicker } from "@/components/ui/CityPicker";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { BaseForm } from "@/components/ui/BaseForm";
import { IconInput } from "@/components/ui/FormFields";
import { useFormData } from "@/app/form/organization/hooks/useFormData";
import { useFormValidation } from "@/app/form/organization/hooks/useFormValidation";
import { useFormFocus } from "@/app/form/organization/hooks/useFormFocus";
import { useFormSubmission } from "@/app/form/organization/hooks/useFormSubmission";

export function OrganizationForm() {
    const { formData, updateField } = useFormData();
    const { validationState, isValid } = useFormValidation(formData);
    const { focusState, handleFocus, handleBlur } = useFormFocus();
    const { handleSubmit } = useFormSubmission(formData);

    return (
        <BaseForm
            onSubmitAction={handleSubmit}
            isValid={isValid()}
            redirectTo={"../../../dashboard/organization"}
        >
            <IconInput
                value={formData.organizationName}
                onChange={(e) => updateField("organizationName", e.target.value)}
                placeholder="Nome Organizzazione"
                icon={<MdOutlineBusiness />}
            />
            <CityPicker
                value={formData.city}
                onChangeAction={(city: string) => updateField("city", city)}
            />
            <RoundCheckboxSelector
                onChangeAction={(preferences: string[]) => updateField("preferences", preferences)}
            />
            <Textarea
                placeholder="Descrizione dell'organizzazione"
                className="rounded-2xl min-h-[100px]"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
            />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Input
                    placeholder="Partita IVA (opzionale)"
                    className="rounded-3xl pl-4 w-full md:w-1/2"
                    isInvalid={!validationState.isVATValid}
                    isFocused={focusState.VATNumberFocused}
                    onFocus={() => handleFocus("VATNumber")}
                    onBlur={() => handleBlur("VATNumber")}
                    onChange={(e) => updateField("VATNumber", e.target.value)}
                    value={formData.VATNumber}
                />
                <Input
                    placeholder="Sito Web (opzionale)"
                    className="rounded-3xl pl-4 w-full md:w-1/2"
                    isInvalid={!validationState.isWebsiteValid}
                    isFocused={focusState.webSiteFocused}
                    onFocus={() => handleFocus("webSite")}
                    onBlur={() => handleBlur("webSite")}
                    onChange={(e) => updateField("webSite", e.target.value)}
                    value={formData.webSite}
                />
            </div>
        </BaseForm>
    );
}
