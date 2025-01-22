import { RequestFormData } from "@/types/formData";
import {
    validateCategories,
    validateDescription,
    validateVolunteerCapacity
} from "@/app/request/utils/formValidation";

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