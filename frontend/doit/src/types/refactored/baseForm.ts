import { FormEvent, ReactNode } from "react";

/**
 * Interface representing the structure of a successful form submission response.
 *
 * This interface outlines the response structure after a form submission is processed.
 * It contains information about the success of the submission, an optional message,
 * and an optional URL for redirection.
 *
 * @interface SuccessResponse
 * @property {boolean} success - Indicates whether the form submission was successful.
 * @property {string | undefined} [message] - An optional message that provides more details on the result of the submission (e.g., success message or error description).
 * @property {string | undefined} [redirectUrl] - An optional URL where the user should be redirected after a successful submission (e.g., a confirmation or result page).
 */
export interface SuccessResponse {
    readonly success: boolean;
    readonly message?: string;
    readonly redirectUrl?: string;
}

/**
 * Props for the BaseForm component.
 *
 * This interface defines the properties that the BaseForm component expects when rendered.
 * It handles form submission, validation, and provides customizable options for child elements,
 * submit button text, and styling.
 *
 * @interface BaseFormProps
 * @property {(e: FormEvent) => Promise<SuccessResponse>} onSubmitAction - The callback function that handles the form submission. It should return a `SuccessResponse` indicating whether the submission was successful, along with an optional message or redirect URL.
 * @property {boolean} isValid - A boolean indicating whether the form is currently valid based on the validation logic. It is used to enable/disable the submit button.
 * @property {ReactNode} children - The content of the form, typically containing input fields, labels, and buttons. This allows the form to be flexible and reusable.
 * @property {string} [redirectTo] - An optional URL where the user will be redirected after a successful form submission. This is useful for confirming actions or navigating to a new page.
 * @property {string} [submitText] - Optional text to display on the submit button. Defaults to a standard "Submit" if not provided.
 * @property {string} [className] - Optional custom class name for styling the form container. It allows for easy customization of the form's outer appearance.
 * @property {string} [buttonClassName] - Optional custom class name for styling the submit button. It allows customization of the button's appearance.
 */

export interface BaseFormProps {
    readonly onSubmitAction: (e: FormEvent) => Promise<SuccessResponse>;
    readonly isValid: boolean;
    readonly children: ReactNode;
    readonly redirectTo?: string;
    readonly submitText?: string;
    readonly className?: string;
    readonly buttonClassName?: string;
}
