import { VolunteerFormData } from "@/types/form/auth/volunteerFormData";
import { validateEmail, validatePassword } from "@/utils/validation/registrationFormValidation";

export const useVolunteerFormValidation = (formData: VolunteerFormData, isEditing: boolean) => {

    const validateRequiredFields = (): string[] => {
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

    // Validate the email if it's provided.
    const isEmailValid = formData.email ? validateEmail(formData.email) : true;

    // Validate the password if it's provided.
    const isPasswordValid = formData.password ? validatePassword(formData.password) : true;

    /**
     * Check if the form data is valid based on required fields and email/password validation.
     *
     * @returns {boolean} - True if the form is valid, false otherwise.
     */
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