import { useState, useEffect } from "react";
import { OrganizationFormData } from "@/types/formData";
import { validateVATNumber, validateWebSite, validateEmail, validatePassword } from "@/app/form/organization/utils/formValidation";

export const useFormValidation = (formData: OrganizationFormData) => {
    const [validationState, setValidationState] = useState({
        isVATValid: true,
        isWebsiteValid: true,
        isEmailValid: true,
        isPasswordValid: true
    });

    useEffect(() => {
        setValidationState({
            isVATValid: !formData.VATNumber || validateVATNumber(formData.VATNumber),
            isWebsiteValid: !formData.webSite || validateWebSite(formData.webSite),
            isEmailValid: validateEmail(formData.email),
            isPasswordValid: validatePassword(formData.password)
        });
    }, [formData.VATNumber, formData.webSite, formData.email, formData.password]);

    const isValid = (): boolean => {
        const hasRequiredFields = Boolean(
            formData.organizationName &&
            formData.email &&
            formData.password &&
            formData.preferences.length > 0 &&
            formData.description.trim().length > 0
        );

        return hasRequiredFields &&
            validationState.isVATValid &&
            validationState.isWebsiteValid &&
            validationState.isEmailValid &&
            validationState.isPasswordValid;
    };

    return {
        validationState,
        isValid
    };
};