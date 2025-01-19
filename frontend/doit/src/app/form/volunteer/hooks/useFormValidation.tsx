import { useState, useEffect } from "react";
import { VolunteerFormData} from "@/types/formData";
import { validateEmail, validatePassword } from "@/app/form/volunteer/utils/formValidation";

export const useFormValidation = (formData: VolunteerFormData) => {
    const [validationState, setValidationState] = useState({
        isEmailValid: true,
        isPasswordValid: true
    });

    useEffect(() => {
        setValidationState({
            isEmailValid: validateEmail(formData.email),
            isPasswordValid: validatePassword(formData.password)
        });
    }, [formData.email, formData.password]);

    const isValid = (): boolean => {
        const hasRequiredFields = Boolean(
            formData.email &&
            formData.password &&
            formData.preferences.length > 0 &&
            formData.description.trim().length > 0
        );

        return hasRequiredFields &&
            validationState.isEmailValid &&
            validationState.isPasswordValid;
    };

    return {
        validationState,
        isValid
    };
};