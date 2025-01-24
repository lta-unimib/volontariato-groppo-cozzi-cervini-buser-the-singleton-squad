
import {RequestFormData} from "@/types/form/request/requestFormData";
import { validateCategories, validateDescription, validateVolunteerCapacity } from "@/utils/validation/requestFormValidation";

export const useRequestFormValidation = (formData: RequestFormData) => {
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