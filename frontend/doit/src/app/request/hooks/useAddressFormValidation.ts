import { AddressData } from "@/types/addressData";
import {
    validateStreet,
    validateNumber,
    validatePostalCode,
} from "@/app/request/utils/addressFormValidation";

export const useAddressFormValidation = (addressData: AddressData) => {
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