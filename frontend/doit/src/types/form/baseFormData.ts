import { FormEvent, ReactNode } from "react";

/**
 * @interface BaseFormData
 * Represents the basic form data for user registration or login.
 *
 * Contains the user's email, password, and an optional description.
 *
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @property {string} description - A brief description of the user.
 */
export interface BaseFormData {
    readonly email: string;
    readonly password: string;
    readonly description: string;
}

/**
 * @interface BaseUserData
 * Extends `BaseFormData` by adding user-specific fields.
 *
 * Includes the user's city of residence and personal preferences.
 *
 * @property {string} city - The city where the user lives.
 * @property {string[]} preferences - An array of user-selected preferences.
 */
export interface BaseUserData extends BaseFormData {
    readonly city: string;
    readonly preferences: string[];
}

/**
 * @interface SuccessResponse
 * Represents the structure of a response after form submission.
 *
 * Contains information on whether the operation was successful,
 * an optional message, and an optional redirect URL in case of success.
 *
 * @property {boolean} success - Indicates whether the operation was successful.
 * @property {string} [message] - An optional message with details about the submission result.
 * @property {string} [redirectUrl] - An optional URL for redirection after a successful submission.
 */
export interface SuccessResponse {
    readonly success: boolean;
    readonly message?: string;
    readonly redirectUrl?: string;
}

/**
 * @interface BaseFormProps
 * Defines the properties accepted by the `BaseForm` component.
 *
 * This interface manages form validation, submission, and appearance customization.
 *
 * @property {(e: FormEvent) => Promise<SuccessResponse>} onSubmitAction - Callback function for form submission, returning a `SuccessResponse`.
 * @property {boolean} isValid - Indicates whether the form is valid (enables/disables the submit button).
 * @property {ReactNode} children - Form content, typically including input fields and buttons.
 * @property {string} [redirectTo] - Optional URL for redirection after a successful submission.
 * @property {string} [submitText] - Customizable text for the submit button (default: "Submit").
 * @property {string} [className] - Optional CSS class for styling the form container.
 * @property {string} [buttonClassName] - Optional CSS class for styling the submit button.
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

/**
 * @interface FormInitializationProps
 * Defines the properties required for form initialization.
 *
 * This interface is used to set the initial form data
 * and track changes to input fields.
 *
 * @property {(data: any) => void} setFormDataAction - Function to update the form data.
 * @property {any} formData - The current state of the form data.
 */
export interface FormInitializationProps {
    readonly setFormDataAction: (data: any) => void;
    readonly formData: any;
}
