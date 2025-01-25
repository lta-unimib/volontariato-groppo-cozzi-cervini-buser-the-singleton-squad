"use client";

import React from "react";
import { MdOutlineBusiness, MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CityForm } from "@/components/form/city/CityForm";
import { Textarea } from "@/components/core/Textarea";
import { Checkbox } from "@/components/core/Checkbox";
import { Input } from "@/components/core/Input";
import { BaseForm } from "@/components/form/BaseForm";
import { useOrganizationFormValidation } from "@/hooks/form/validator/useOrganizationFormValidator";
import { useFormFocus } from "@/hooks/form/useFormFocus";
import { useFormSubmission } from "@/hooks/form/useFormSubmission";
import { useFormInitialization } from '@/hooks/form/useFormInitialization';
import { OrganizationFormData } from "@/types/form/auth/organizationFormData";
import { useFormData } from "@/hooks/form/useFormData";

/**
 * `OrganizationForm` component for creating or editing an organization's profile.
 *
 * This component includes fields for organization name, email, password, city, preferences,
 * description, VAT number, and website. It handles form submission, validation, and conditional
 * rendering based on whether the form is in "edit" or "create" mode.
 *
 * It uses hooks for form initialization, submission, validation, focus management, and data storage.
 *
 * @returns - The rendered form for creating or editing an organization.
 */
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
    console.log("Initial FormData:", formData);

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

    const { handleSubmit: handleSubmitFn } = useFormSubmission("organization", undefined, isEditing);
    const { validationState, isValid } = useOrganizationFormValidation(formData, isEditing);
    const { focusState, handleFocus, handleBlur } = useFormFocus();

    if (!initialDataLoaded && isEditing) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center px-4">
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

                <CityForm
                    value={formData.city || ""}
                    onChangeAction={(city: string) => updateField("city", city)}
                />

                <Checkbox
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
