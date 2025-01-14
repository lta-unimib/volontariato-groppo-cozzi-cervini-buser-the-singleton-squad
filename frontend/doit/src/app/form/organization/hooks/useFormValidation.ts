import { OrganizationFormData } from "@/types/formData";
import { validateVATNumber, validateWebSite, validateEmail, validatePassword } from "@/app/form/organization/utils/formValidation";

export const useFormValidation = (formData: OrganizationFormData) => {
    const isVATValid = !formData.VATNumber || validateVATNumber(formData.VATNumber);
    const isWebsiteValid = !formData.webSite || validateWebSite(formData.webSite);
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    const isValid = (): boolean => {
        const hasRequiredFields = Boolean(
            formData.organizationName &&
            formData.email &&
            formData.password &&
            formData.preferences.length > 0 &&
            formData.description.trim().length > 0
        );

        return hasRequiredFields && isVATValid && isWebsiteValid && isEmailValid && isPasswordValid;
    };

    return {
        validationState: {
            isVATValid,
            isWebsiteValid,
            isEmailValid,
            isPasswordValid
        },
        isValid
    };
};