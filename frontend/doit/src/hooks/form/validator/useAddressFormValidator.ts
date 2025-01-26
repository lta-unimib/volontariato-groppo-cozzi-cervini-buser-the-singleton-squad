import { AddressFormData } from "@/types/form/city/addressFormData";
import {
    validateStreet,
    validateNumber,
    validatePostalCode
} from "@/utils/validation/addressFormValidation";

export const useAddressFormValidator = (formData: AddressFormData) => {
    const validationState = {
        isStreetValid: validateStreet(formData.street),
        isNumberValid: validateNumber(formData.number),
        isPostalCodeValid: validatePostalCode(formData.postalCode),
        isCityValid: !!formData.city.trim(),
    };

    const isValid = (): boolean => {
        return Object.values(validationState).every(value => value);
    };

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