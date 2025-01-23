import { useState } from "react";

type FocusFields = "street" | "number" | "city" | "postalCode" | "additionalInfo"
    | "VATNumber" | "webSite" | "email" | "password";

export const useFormFocus = () => {
    const initialFocusState = {
        streetFocused: false,
        numberFocused: false,
        cityFocused: false,
        postalCodeFocused: false,
        additionalInfoFocused: false,
        VATNumberFocused: false,
        webSiteFocused: false,
        emailFocused: false,
        passwordFocused: false,
    };

    const [focusState, setFocusState] = useState(initialFocusState);

    const handleFocus = (field: FocusFields) => {
        setFocusState((prev) => ({ ...prev, [`${field}Focused`]: true }));
    };

    const handleBlur = (field: FocusFields) => {
        setFocusState((prev) => ({ ...prev, [`${field}Focused`]: false }));
    };

    return {
        focusState,
        handleFocus,
        handleBlur
    };
};