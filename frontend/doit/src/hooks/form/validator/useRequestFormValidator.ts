import { RequestFormData } from "@/types/form/request/requestFormData";
import { validateCategories, validateDescription, validateVolunteerCapacity } from "@/utils/validation/requestFormValidation";

/**
 * Custom hook to validate the request form data.
 * It checks the validity of categories, description, and volunteer capacity fields.
 * @param {RequestFormData} formData - The request form data to validate.
 * @returns - The validation state (validity of categories, description, and capacity), and a function to check if the form is valid.
 */
export const useRequestFormValidation = (formData: RequestFormData) => {

    /**
     * The state representing the validity of different form fields.
     * @property {boolean} areCategoriesValid - Indicates if the selected categories are valid.
     * @property {boolean} isDescriptionValid - Indicates if the description is valid.
     * @property {boolean} isCapacityValid - Indicates if the volunteer capacity is valid.
     */
    const validationState = {
        areCategoriesValid: validateCategories(formData.categories),
        isDescriptionValid: validateDescription(formData.description),
        isCapacityValid: validateVolunteerCapacity(formData.volunteerCapacity)
    };

    /**
     * Checks if all fields in the form are valid.
     * @returns {boolean} - True if all fields are valid, otherwise false.
     */
    const isValid = (): boolean => {
        return Object.values(validationState).every(value => value);
    };

    return {
        validationState,
        isValid
    };
};
