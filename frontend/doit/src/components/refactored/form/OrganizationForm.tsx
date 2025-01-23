"use client";

import React from "react";
import { MdOutlineBusiness, MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CityPicker } from "@/components/refactored/city/CityPicker";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { Input } from "@/components/refactored/Input";
import { BaseForm } from "@/components/refactored/form/BaseForm";
import { useOrganizationFormValidation } from "@/hooks/refactored/useOrganizationFormValidator";
import { useRegistrationFormFocus } from "@/hooks/refactored/useRegistrationFormFocus";
import { useFormSubmission } from "@/hooks/refactored/useFormSubmission";
import { useFormInitialization } from '@/hooks/useFormInizialization';
import {OrganizationFormData} from "@/types/refactored/model/organizationFormData";
import { useFormData } from "@/hooks/refactored/useFormData";

export function OrganizationForm() {

    const initialFormData: OrganizationFormData = {
        organizationName: "",
        email: "",
        password: "",
        city: "",
        preferences: [],
        description: "",
        VATNumber: "",
        website: "",
        role: 'organization'
    };

    const { formData, updateField, setFormData } = useFormData(initialFormData);

    const {
        isEditing,
        showPassword,
        setShowPassword,
        initialDataLoaded,
        handleSubmit
    } = useFormInitialization({
        setFormDataAction: setFormData,
        formData
    });

    const { handleSubmit: handleSubmitFn } = useFormSubmission("organization", isEditing ? "organization" : undefined);
    const { validationState, isValid } = useOrganizationFormValidation(formData, isEditing);
    const { focusState, handleFocus, handleBlur } = useRegistrationFormFocus();


    if (!initialDataLoaded && isEditing) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <BaseForm
                onSubmitAction={(e) => handleSubmit(e, handleSubmitFn)}
                isValid={isValid()}
                redirectTo={isEditing ? "../../../profile/organization" : "../../../dashboard/organization"}
            >
                <Input
                    value={formData.organizationName || ""}
                    onChange={(e) => updateField("organizationName", e.target.value)}
                    placeholder="Nome Organizzazione"
                    icon={<MdOutlineBusiness />}
                />

                {!isEditing && (
                    <>
                        <Input
                            value={formData.email || ""}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="Email"
                            type="email"
                            icon={<MdOutlineEmail />}
                            isInvalid={!validationState.isEmailValid}
                            isFocused={focusState.emailFocused}
                            onFocus={() => handleFocus("email")}
                            onBlur={() => handleBlur("email")}
                        />

                        <div className="relative w-full">
                            <Input
                                value={formData.password || ""}
                                onChange={(e) => updateField("password", e.target.value)}
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                icon={<MdOutlinePassword />}
                                isInvalid={!validationState.isPasswordValid}
                                isFocused={focusState.passwordFocused}
                                onFocus={() => handleFocus("password")}
                                onBlur={() => handleBlur("password")}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible size={20} className="text-muted-foreground" />
                                ) : (
                                    <AiOutlineEye size={20} className="text-muted-foreground" />
                                )}
                            </button>
                        </div>
                    </>
                )}

                <CityPicker
                    value={formData.city || ""}
                    onChangeAction={(city: string) => updateField("city", city)}
                />

                <RoundCheckboxSelector
                    onChangeAction={(preferences: string[]) => updateField("preferences", preferences)}
                    initialSelected={formData.preferences}
                />

                <Textarea
                    placeholder="Descrizione dell'organizzazione"
                    className="rounded-2xl min-h-[100px]"
                    value={formData.description || ""}
                    onChange={(e) => updateField("description", e.target.value)}
                />

                <div className="flex flex-col w-full md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <Input
                        placeholder="Partita IVA (opzionale)"
                        className="rounded-3xl pl-4"
                        isInvalid={!validationState.isVATValid}
                        isFocused={focusState.VATNumberFocused}
                        onFocus={() => handleFocus("VATNumber")}
                        onBlur={() => handleBlur("VATNumber")}
                        onChange={(e) => updateField("VATNumber", e.target.value)}
                        value={formData.VATNumber || ""}
                    />
                    <Input
                        placeholder="Sito Web (opzionale)"
                        className="rounded-3xl pl-4"
                        isInvalid={!validationState.isWebsiteValid}
                        isFocused={focusState.webSiteFocused}
                        onFocus={() => handleFocus("webSite")}
                        onBlur={() => handleBlur("webSite")}
                        onChange={(e) => updateField("website", e.target.value)}
                        value={formData.website || ""}
                    />
                </div>
            </BaseForm>
        </div>
    );
}