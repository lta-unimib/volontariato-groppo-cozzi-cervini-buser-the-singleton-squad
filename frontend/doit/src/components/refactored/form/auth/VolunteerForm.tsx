"use client";

import React from "react";
import { CityPicker } from "@/components/refactored/form/city/CityPicker";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { BaseForm } from "@/components/refactored/form/BaseForm";
import { useFormSubmission } from '@/hooks/refactored/form/useFormSubmission';
import { AvailabilityDialog } from '@/components/ui/AvailabilityPicker';
import { MdOutlineEmail, MdOutlinePassword, MdOutlinePerson } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useVolunteerFormValidation } from "@/hooks/refactored/form/validator/useVolunteerFormValidator";
import { useRegistrationFormFocus } from "@/hooks/refactored/form/useRegistrationFormFocus";
import { useFormInitialization } from '@/hooks/useFormInizialization';
import {Input} from "@/components/refactored/Input";
import {VolunteerFormData} from "@/types/refactored/form/auth/volunteerFormData";
import { useFormData } from "@/hooks/refactored/form/useFormData";

export function VolunteerForm() {

    const initialFormData: VolunteerFormData = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        availability: {mode: "daily", timeRange:[]},
        city: "",
        preferences: [],
        description: "",
        role: 'volunteer'
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

    const { handleSubmit: handleSubmitFn } = useFormSubmission("volunteer", isEditing ? "volunteer" : undefined);
    const { validationState, isValid } = useVolunteerFormValidation(formData, isEditing);
    const { focusState, handleFocus, handleBlur } = useRegistrationFormFocus();

    if (!initialDataLoaded && isEditing) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <BaseForm
                onSubmitAction={(e) => handleSubmit(e, handleSubmitFn)}
                isValid={isValid()}
                redirectTo={isEditing ? "../../../profile/volunteer" : "../../../dashboard/volunteer"}
            >
                <div className="flex flex-col w-full md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <Input
                        value={formData.firstName || ''}
                        onChange={(e) => updateField("firstName", e.target.value)}
                        placeholder="Nome"
                        icon={<MdOutlinePerson />}
                    />
                    <Input
                        value={formData.lastName || ''}
                        onChange={(e) => updateField("lastName", e.target.value)}
                        placeholder="Cognome"
                        icon={<MdOutlinePerson />}
                    />
                </div>

                {!isEditing && (
                    <>
                        <Input
                            value={formData.email || ''}
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
                                value={formData.password || ''}
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

                <AvailabilityDialog
                    onSaveAction={(availability) => updateField('availability', availability)}
                    initialSelected={formData.availability}
                />
                <CityPicker
                    value={formData.city || ''}
                    onChangeAction={(selectedCity) => updateField("city", selectedCity)}
                />
                <RoundCheckboxSelector
                    onChangeAction={(preferences: string[]) => updateField('preferences', preferences)}
                    initialSelected={formData.preferences}
                />
                <Textarea
                    placeholder="Descrizione dell'utente"
                    className="rounded-2xl min-h-[100px]"
                    value={formData.description || ''}
                    onChange={(e) => updateField('description', e.target.value)}
                />
            </BaseForm>
        </div>
    );
}
