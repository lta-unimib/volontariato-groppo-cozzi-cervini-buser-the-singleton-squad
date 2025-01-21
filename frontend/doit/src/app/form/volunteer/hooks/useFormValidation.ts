import { VolunteerFormData } from "@/types/formData";
import { validateEmail, validatePassword } from "@/app/form/volunteer/utils/formValidation";

export const useFormValidation = (formData: VolunteerFormData, isEditing: boolean) => {
    const isEmailValid = formData.email ? validateEmail(formData.email) : true; // Allow any email if editing
    const isPasswordValid = formData.password ? validatePassword(formData.password) : true; // Allow any password if editing

    const isValid = (): boolean => {
        const hasRequiredFields = Boolean(
            formData.preferences.length > 0 &&
            formData.description.trim().length > 0
        );

        return hasRequiredFields && (isEditing || (isEmailValid && isPasswordValid));
    };

    return {
        validationState: {
            isEmailValid,
            isPasswordValid
        },
        isValid
    };
};
