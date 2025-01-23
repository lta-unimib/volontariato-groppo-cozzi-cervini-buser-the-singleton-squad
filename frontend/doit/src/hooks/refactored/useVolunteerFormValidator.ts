import { VolunteerFormData } from "@/types/refactored/model/volunteerFormData";
import {validateEmail, validatePassword} from "@/utils/refactored/validation/registrationFormValidation";

export const useVolunteerFormValidation = (formData: VolunteerFormData, isEditing: boolean) => {
    const validateRequiredFields = () => {
        const missingFields: string[] = [];

        if (!formData.firstName) missingFields.push('Nome');
        if (!formData.lastName) missingFields.push('Cognome');
        if (!formData.city) missingFields.push('Città');
        if (formData.preferences.length === 0) missingFields.push('Preferenze');
        if (!formData.description?.trim()) missingFields.push('Descrizione');
        if (!isEditing) {
            if (!formData.email) missingFields.push('Email');
            if (!formData.password) missingFields.push('Password');
        }

        return missingFields;
    };

    const isEmailValid = formData.email ? validateEmail(formData.email) : true;
    const isPasswordValid = formData.password ? validatePassword(formData.password) : true;

    const isValid = (): boolean => {
        const missingFields = validateRequiredFields();
        return missingFields.length === 0 && (isEditing || (isEmailValid && isPasswordValid));
    };

    return {
        validationState: {
            isEmailValid,
            isPasswordValid,
            missingFields: validateRequiredFields()
        },
        isValid
    };
};