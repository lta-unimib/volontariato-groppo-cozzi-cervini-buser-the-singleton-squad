import { useState } from "react";

type FocusFields = "VATNumber" | "webSite";

export const useFormFocus = () => {
    const [focusState, setFocusState] = useState({
        VATNumberFocused: false,
        webSiteFocused: false,
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