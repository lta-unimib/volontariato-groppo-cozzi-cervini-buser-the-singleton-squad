import { VolunteerFormData } from "@/types/formData";
import { validateEmail, validatePassword } from "@/app/form/volunteer/utils/formValidation";

export const useFormValidation = (formData: VolunteerFormData) => {
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    const isValid = (): boolean => {
        const hasRequiredFields = Boolean(
            formData.email &&
            formData.password &&
            formData.preferences.length > 0 &&
            formData.description.trim().length > 0
        );

        return hasRequiredFields && isEmailValid && isPasswordValid;
    };

    return {
        validationState: {
            isEmailValid,
            isPasswordValid
        },
        isValid
    };
};