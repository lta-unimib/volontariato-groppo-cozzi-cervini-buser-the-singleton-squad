import { OrganizationFormData } from "@/types/form/auth/organizationFormData";
import {
    validateEmail,
    validatePassword,
    validateVATNumber,
    validateWebSite
} from "@/utils/validation/registrationFormValidation";

export const useOrganizationFormValidation = (formData: OrganizationFormData, isEditing: boolean) => {
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