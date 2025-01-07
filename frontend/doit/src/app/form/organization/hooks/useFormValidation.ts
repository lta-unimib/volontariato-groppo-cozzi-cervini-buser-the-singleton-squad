import { useState, useEffect } from "react";
import { OrganizationFormData } from "@/types/formData";
import { validateVATNumber, validateWebSite } from "@/app/form/organization/utils/formValidation";

export const useFormValidation = (formData: OrganizationFormData) => {
    const [validationState, setValidationState] = useState({
        isVATValid: true,
        isWebsiteValid: true
    });

    useEffect(() => {
        setValidationState({
            isVATValid: !formData.VATNumber || validateVATNumber(formData.VATNumber),
            isWebsiteValid: !formData.webSite || validateWebSite(formData.webSite)
        });
    }, [formData.VATNumber, formData.webSite]);

    const isValid = (): boolean => {
        const hasRequiredFields = Boolean(
            formData.organizationName &&
            formData.preferences.length > 0 &&
            formData.description.trim().length > 0
        );

        return hasRequiredFields && validationState.isVATValid && validationState.isWebsiteValid;
    };

    return {
        validationState,
        isValid
    };
};