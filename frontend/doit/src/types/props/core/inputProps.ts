import React from "react";

export interface InputProps extends React.ComponentProps<"input"> {
    isInvalid?: boolean;
    isFocused?: boolean;
    icon?: React.ReactNode;
}