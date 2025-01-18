import { RequestFormData } from "@/types/formData";
import {
    validateDate,
    validateCategories,
    validateActivities,
    validateDescription,
    validateVolunteerCapacity
} from "@/app/request/utils/formValidation";

export const useFormValidation = (formData: RequestFormData) => {
    const validationState = {
        isDateValid: validateDate(formData.date),
        areCategoriesValid: validateCategories(formData.categories),
        areActivitiesValid: validateActivities(formData.activities),
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