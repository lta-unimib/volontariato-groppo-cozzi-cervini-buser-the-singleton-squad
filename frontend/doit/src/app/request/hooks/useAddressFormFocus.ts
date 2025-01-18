import { useState } from "react";

type AddressFocusFields = "street" | "number" | "city" | "postalCode" | "additionalInfo";
type AddressFocusState = Record<`${AddressFocusFields}Focused`, boolean>;

export const useAddressFormFocus = () => {
    const [focusState, setFocusState] = useState<AddressFocusState>({
        streetFocused: false,
        numberFocused: false,
        cityFocused: false,
        postalCodeFocused: false,
        additionalInfoFocused: false
    });

    const handleFocus = (field: AddressFocusFields) => {
        setFocusState((prev) => ({ ...prev, [`${field}Focused`]: true }));
    };

    const handleBlur = (field: AddressFocusFields) => {
        setFocusState((prev) => ({ ...prev, [`${field}Focused`]: false }));
    };

    return {
        focusState,
        handleFocus,
        handleBlur
    };
};