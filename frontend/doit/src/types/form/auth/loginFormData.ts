/**
 * Represents the data structure for login form submission.
 *
 * @interface LoginFormData
 */
export interface LoginFormData {
    /**
     * The email address of the user.
     * This is a required field and should be in a valid email format.
     */
    readonly email: string;

    /**
     * The password of the user.
     * This is a required field and should meet the password criteria (e.g., minimum length).
     */
    readonly password: string;
}

/**
 * Props for the login form component.
 *
 * @interface LoginFormProps
 */
export interface LoginFormProps {
    /**
     * Optional className to customize the form's CSS styling.
     */
    readonly className?: string;

    /**
     * The role of the user attempting to log in.
     * It determines the type of account, either 'volunteer' or 'organization'.
     */
    readonly role: "volunteer" | "organization";
}