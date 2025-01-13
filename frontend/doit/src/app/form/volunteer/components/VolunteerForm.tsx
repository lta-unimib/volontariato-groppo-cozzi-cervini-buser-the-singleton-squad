"use client";

import React, { useState } from "react";
import { CityPicker } from "@/components/ui/CityPicker";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { BaseForm } from "@/components/ui/BaseForm";
import { IconInput } from "@/components/ui/FormFields";
import { useFormData } from '@/app/form/volunteer/hooks/useFormData';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { AvailabilityDialog } from '@/app/form/volunteer/components/AvailabilityPicker';
import {MdOutlinePerson, MdOutlineEmail, MdOutlinePassword} from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {useFormValidation} from "@/app/form/volunteer/hooks/useFormValidation";
import {useFormFocus} from "@/app/form/volunteer/hooks/useFormFocus";

export function VolunteerForm() {
    const { formData, updateField } = useFormData();
    const { handleSubmit } = useFormSubmission("volunteer");
    const { validationState, isValid } = useFormValidation(formData);
    const { focusState, handleFocus, handleBlur } = useFormFocus();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleSubmit(formData);
    };

    return (
        <BaseForm
            onSubmitAction={onSubmit}
            isValid={isValid()}
            redirectTo={"../../../dashboard/volunteer"}
        >
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <IconInput
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="Nome"
                    icon={<MdOutlinePerson />}
                />
                <IconInput
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Cognome"
                    icon={<MdOutlinePerson />}
                />
            </div>

            <IconInput
                value={formData.email}
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
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    icon={<MdOutlinePassword/>}
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
                        <AiOutlineEyeInvisible size={20} className="text-muted-foreground"/>
                    ) : (
                        <AiOutlineEye size={20} className="text-muted-foreground"/>
                    )}
                </button>
            </div>

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