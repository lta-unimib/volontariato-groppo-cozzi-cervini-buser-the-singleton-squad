import { OrganizationFormData } from "@/types/form/auth/organizationFormData";
import {
    validateEmail,
    validatePassword,
    validateVATNumber,
    validateWebSite
} from "@/utils/validation/registrationFormValidation";

/**
 * Custom hook to validate organization form data.
 * It checks if the required fields are filled, and if the provided values for email, password, VAT number, and website are valid.
 * @param {OrganizationFormData} formData - The organization form data to validate.
 * @param {boolean} isEditing - A flag indicating whether the form is being used for editing an existing organization.
 * @returns - The validation state (validity of VAT, website, email, password, and missing fields), and a function to check if the form is valid.
 */
export const useOrganizationFormValidation = (formData: OrganizationFormData, isEditing: boolean) => {

    /**
     * Validates the required fields and returns an array of missing field names.
     * @returns - An array of missing field names.
     */
    const validateRequiredFields = () => {
        const missingFields: string[] = [];

        if (!formData.organizationName) missingFields.push('Nome Organizzazione');
        if (!formData.city) missingFields.push('Città');
        if (formData.preferences.length === 0) missingFields.push('Preferenze');
        if (!formData.description?.trim()) missingFields.push('Descrizione');
        if (!isEditing) {
            if (!formData.email) missingFields.push('Email');
            if (!formData.password) missingFields.push('Password');
        }

        return missingFields;
    };

    const isVATValid = !formData.VATNumber || validateVATNumber(formData.VATNumber);
    const isWebsiteValid = !formData.website || validateWebSite(formData.website);
    const isEmailValid = formData.email ? validateEmail(formData.email) : true;
    const isPasswordValid = formData.password ? validatePassword(formData.password) : true;

    /**
     * Checks if the form is valid by ensuring all required fields are filled
     * and that all provided field values are valid.
     * @returns {boolean} - True if the form is valid, otherwise false.
     */
    const isValid = (): boolean => {
        const missingFields = validateRequiredFields();
        return (
            missingFields.length === 0 &&
            (isEditing || (isVATValid && isWebsiteValid && isEmailValid && isPasswordValid))
        );
    };

    return {
        validationState: {
            isVATValid,
            isWebsiteValid,
            isEmailValid,
            isPasswordValid,
            missingFields: validateRequiredFields()
        },
        isValid
    };
};
