import { useState } from "react";

type VolunteerFocusFields = "email" | "password";
type OrganizationFocusFields = "VATNumber" | "webSite" | "email" | "password";
type FocusFields = VolunteerFocusFields | OrganizationFocusFields;
type FocusState = Record<`${FocusFields}Focused`, boolean>;

export const useRegistrationFormFocus = () => {
    const [focusState, setFocusState] = useState<FocusState>({
        VATNumberFocused: false,
        webSiteFocused: false,
        emailFocused: false,
        passwordFocused: false,
    });

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