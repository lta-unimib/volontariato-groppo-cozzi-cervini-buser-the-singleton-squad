import {
    validateCategories,
    validateDescription,
    validateVolunteerCapacity
} from "@/app/request/utils/formValidation";
import {RequestFormData} from "@/types/refactored/model/requestFormData";

export const useFormValidation = (formData: RequestFormData) => {
    const validationState = {
        areCategoriesValid: validateCategories(formData.categories),
        isDescriptionValid: validateDescription(formData.description),
        isCapacityValid: validateVolunteerCapacity(formData.volunteerCapacity)
    };

    const isValid = (): boolean => {
        return Object.values(validationState).every(value => value);
    };

    return {
        validationState,
        isValid
    };
};