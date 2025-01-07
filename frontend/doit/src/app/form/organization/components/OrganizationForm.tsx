"use client";

import { useState, useEffect } from "react";
import { CityPicker } from "@/components/ui/CityPicker";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { MdOutlineBusiness } from "react-icons/md";
import React from "react";
import { OrganizationFormData } from "@/types/formTypes";
import { BaseForm } from "@/components/ui/BaseForm";
import { IconInput } from "@/components/ui/FormFields";
import { validateVATNumber, validateWebSite } from "@/utils/formValidation";

export function OrganizationForm() {
    const [formData, setFormData] = useState<OrganizationFormData>({
        organizationName: "",
        city: "",
        preferences: [],
        description: "",
        VATNumber: "",
        webSite: "",
    });

    const [validationState, setValidationState] = useState({
        isVATValid: true,
        isWebsiteValid: true
    });

    const [focusState, setFocusState] = useState({
        VATNumberFocused: false,
        webSiteFocused: false,
    });

    useEffect(() => {
        setValidationState({
            isVATValid: !formData.VATNumber || validateVATNumber(formData.VATNumber),
            isWebsiteValid: !formData.webSite || validateWebSite(formData.webSite)
        });
    }, [formData.VATNumber, formData.webSite]);

    const handleFocus = (field: string) => {
        setFocusState((prev) => ({ ...prev, [`${field}Focused`]: true }));
    };

    const handleBlur = (field: string) => {
        setFocusState((prev) => ({ ...prev, [`${field}Focused`]: false }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Form Data:", JSON.stringify(formData, null, 2));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isValid = (): boolean => {
        const hasRequiredFields = Boolean(
            formData.organizationName &&
            formData.preferences.length > 0 &&
            formData.description.trim().length > 0
        );

        const optionalFieldsValid =
            validationState.isVATValid &&
            validationState.isWebsiteValid;

        return hasRequiredFields && optionalFieldsValid;
    };

    return (
        <BaseForm onSubmit={handleSubmit} isValid={isValid()}>
            <IconInput
                value={formData.organizationName}
                onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                placeholder="Nome Organizzazione"
                icon={<MdOutlineBusiness />}
            />
            <CityPicker
                value={formData.city}
                onChange={(city) => setFormData({...formData, city})}
            />
            <RoundCheckboxSelector
                onChange={(preferences) => setFormData({...formData, preferences})}
            />
            <Textarea
                placeholder="Descrizione dell'organizzazione"
                className="rounded-2xl min-h-[100px]"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Input
                    placeholder="Partita IVA (opzionale)"
                    className="rounded-3xl pl-4 w-full md:w-1/2"
                    isInvalid={!validationState.isVATValid}
                    isFocused={focusState.VATNumberFocused}
                    onFocus={() => handleFocus("VATNumber")}
                    onBlur={() => handleBlur("VATNumber")}
                    onChange={(e) => setFormData({...formData, VATNumber: e.target.value})}
                    value={formData.VATNumber}
                />
                <Input
                    placeholder="Sito Web (opzionale)"
                    className="rounded-3xl pl-4 w-full md:w-1/2"
                    isInvalid={!validationState.isWebsiteValid}
                    isFocused={focusState.webSiteFocused}
                    onFocus={() => handleFocus("webSite")}
                    onBlur={() => handleBlur("webSite")}
                    onChange={(e) => setFormData({...formData, webSite: e.target.value})}
                    value={formData.webSite}
                />
            </div>
        </BaseForm>
    );
}
