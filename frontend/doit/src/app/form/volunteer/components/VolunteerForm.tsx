"use client";

import React from "react";
import { CityPicker } from "@/components/ui/city/CityPicker";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { BaseForm } from "@/components/ui/form/BaseForm";
import { IconInput } from "@/components/ui/form/FormFields";
import { useFormData } from '@/app/form/volunteer/hooks/useFormData';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { AvailabilityDialog } from '@/app/form/volunteer/components/AvailabilityPicker';
import { MdOutlineEmail, MdOutlinePassword, MdOutlinePerson } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormValidation } from "@/app/form/volunteer/hooks/useFormValidation";
import { useFormFocus } from "@/app/form/volunteer/hooks/useFormFocus";
import { useFormInitialization } from '@/hooks/useFormInizialization';

export function VolunteerForm() {
    const { formData, updateField, setFormData } = useFormData();

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

    const { handleSubmit: handleSubmitFn } = useFormSubmission("volunteer", isEditing);
    const { validationState, isValid } = useFormValidation(formData, isEditing);
    const { focusState, handleFocus, handleBlur } = useFormFocus();


    if (!initialDataLoaded && isEditing) {
        return <div>Loading...</div>;
    }

    return (
        <BaseForm
            onSubmitAction={(e) => handleSubmit(e, handleSubmitFn)}
            isValid={isValid()}
            redirectTo={isEditing ? "../../../profile/volunteer" : "../../../dashboard/volunteer"}
        >
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <IconInput
                    value={formData.firstName || ''}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="Nome"
                    icon={<MdOutlinePerson />}
                />
                <IconInput
                    value={formData.lastName || ''}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Cognome"
                    icon={<MdOutlinePerson />}
                />
            </div>

            {!isEditing && (
                <>
                    <IconInput
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

                    <div className="relative">
                        <IconInput
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
    );
}