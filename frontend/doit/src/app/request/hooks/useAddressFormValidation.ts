import { AddressFormData } from "@/types/refactored/model/addressFormData";
import {
    validateStreet,
    validateNumber,
    validatePostalCode,
} from "@/app/request/utils/addressFormValidation";

export const useAddressFormValidation = (addressData: AddressFormData) => {
    const validationState = {
        isStreetValid: validateStreet(addressData.street),
        isNumberValid: validateNumber(addressData.number),
        isPostalCodeValid: validatePostalCode(addressData.postalCode),
    };

    const isValid = (): boolean => {
        return Object.values(validationState).every(value => value);
    };

    return {
        validationState,
        isValid
    };
};