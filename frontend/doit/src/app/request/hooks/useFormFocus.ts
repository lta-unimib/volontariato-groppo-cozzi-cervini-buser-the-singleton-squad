import { useState } from "react";

type FocusFields = "title" | "description" | "volunteerCapacity" | "date" | "address" | "categories" | "activities";
type FocusState = Record<`${FocusFields}Focused`, boolean>;

export const useFormFocus = () => {
    const [focusState, setFocusState] = useState<FocusState>({
        titleFocused: false,
        descriptionFocused: false,
        volunteerCapacityFocused: false,
        dateFocused: false,
        addressFocused: false,
        categoriesFocused: false,
        activitiesFocused: false
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