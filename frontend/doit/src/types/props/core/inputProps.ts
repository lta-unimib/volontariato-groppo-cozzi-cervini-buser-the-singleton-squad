import React from "react";

/**
 * Props for the `Input` component.
 *
 * The `Input` component is a customizable text input field with optional icons and validation states.
 *
 * @param isInvalid Optional. A boolean that indicates if the input is in an invalid state. When `true`,
 * it can be used to apply error styling (e.g., red borders) to indicate that the input is invalid.
 *
 * @param isFocused Optional. A boolean that indicates if the input field should be visually marked as focused.
 * This can be used to apply custom styles when the input is in focus (e.g., changing the border color).
 *
 * @param icon Optional. A React node (e.g., an icon component) that can be displayed inside the input field.
 * This can be used for showing icons like search or password visibility toggles.
 *
 * @param className Optional. A custom class name that can be applied to the input element for styling purposes.
 *
 * @param value Optional. The current value of the input. If passed, it will be controlled by the parent component.
 *
 * @param onChange Optional. A callback function triggered whenever the input value changes.
 *
 * @param otherProps Optional. Other standard input attributes such as `placeholder`, `type`, `name`, etc.
 * These are automatically inherited from the `React.ComponentProps<"input">` type.
 */
export interface InputProps extends React.ComponentProps<"input"> {
    isInvalid?: boolean;
    isFocused?: boolean;
    icon?: React.ReactNode;
}
