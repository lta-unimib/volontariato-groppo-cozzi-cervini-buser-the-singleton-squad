import { useState } from "react";

type FocusFields = "email" | "password";

export const useFormFocus = () => {
    const [focusState, setFocusState] = useState({
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
