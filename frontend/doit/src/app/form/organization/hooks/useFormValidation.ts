import { validateVATNumber, validateWebSite, validateEmail, validatePassword } from "@/app/form/organization/utils/formValidation";
import {OrganizationFormData} from "@/types/refactored/model/organizationFormData";

export const useFormValidation = (formData: OrganizationFormData, isEditing: boolean) => {
    const isVATValid = !formData.VATNumber || validateVATNumber(formData.VATNumber);
    const isWebsiteValid = !formData.website || validateWebSite(formData.website);
    const isEmailValid = formData.email ? validateEmail(formData.email) : true; // Allow any email if editing
    const isPasswordValid = formData.password ? validatePassword(formData.password) : true; // Allow any password if editing

    const isValid = (): boolean => {
        const hasRequiredFields = Boolean(
            formData.organizationName &&
            formData.preferences.length > 0 &&
            formData.description.trim().length > 0
        );

        return hasRequiredFields && (isEditing || (isVATValid && isWebsiteValid && isEmailValid && isPasswordValid));
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
