import { useState } from "react";

type FocusFields = "VATNumber" | "webSite" | "email" | "password";
type FocusState = Record<`${FocusFields}Focused`, boolean>;

export const useFormFocus = () => {
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
