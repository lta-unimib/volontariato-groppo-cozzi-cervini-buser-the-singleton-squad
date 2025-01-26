import { useState } from "react";

type FocusFields = "street" | "number" | "city" | "postalCode" | "additionalInfo"
    | "VATNumber" | "webSite" | "email" | "password" | "volunteerCapacity";

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
        titleFocused: false,
        descriptionFocused: false,
        volunteerCapacityFocused: false,
        dateFocused: false,
        addressFocused: false,
        categoriesFocused: false,
        activitiesFocused: false
    };

    const [focusState, setFocusState] = useState(initialFocusState);

    /**
     * Handles focus event for a specific field and updates its focus state to true.
     *
     * @param {FocusFields} field - The field that is being focused.
     */
    const handleFocus = (field: FocusFields) => {
        setFocusState((prev) => ({ ...prev, [`${field}Focused`]: true }));
    };

    /**
     * Handles blur event for a specific field and updates its focus state to false.
     *
     * @param {FocusFields} field - The field that is losing focus.
     */
    const handleBlur = (field: FocusFields) => {
        setFocusState((prev) => ({ ...prev, [`${field}Focused`]: false }));
    };

    return {
        focusState,
        handleFocus,
        handleBlur
    };
};