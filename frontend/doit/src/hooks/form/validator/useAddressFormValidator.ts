import { AddressFormData } from "@/types/form/city/addressFormData";
import {
    validateStreet,
    validateNumber,
    validatePostalCode
} from "@/utils/validation/addressFormValidation";

/**
 * Custom hook to validate address form data.
 * It checks the validity of the street, number, postal code, and city fields.
 * @param {AddressFormData} formData - The address form data to validate.
 * @returns - The validation state, a function to check if the form is valid, and a function to get error messages.
 */
export const useAddressFormValidator = (formData: AddressFormData) => {
    const validationState = {
        isStreetValid: validateStreet(formData.street),
        isNumberValid: validateNumber(formData.number),
        isPostalCodeValid: validatePostalCode(formData.postalCode),
        isCityValid: !!formData.city.trim(),
    };

    /**
     * Checks if the entire form is valid by ensuring all fields are valid.
     * @returns {boolean} - True if all fields are valid, otherwise false.
     */
    const isValid = (): boolean => {
        return Object.values(validationState).every(value => value);
    };

    /**
     * Gets the error messages for any invalid fields.
     * @returns {Record<string, string>} - An object with error messages for each invalid field.
     */
    const getErrorMessages = (): Record<string, string> => {
        const errors: Record<string, string> = {};

        if (!validationState.isStreetValid) {
            errors.street = "Via non valida";
        }
        if (!validationState.isNumberValid) {
            errors.number = "Numero civico non valido";
        }
        if (!validationState.isPostalCodeValid) {
            errors.postalCode = "CAP non valido";
        }
        if (!validationState.isCityValid) {
            errors.city = "Città richiesta";
        }

        return errors;
    };

    return {
        validationState,
        isValid,
        getErrorMessages
    };
};