/**
 * @interface BaseFormData
 * Represents the basic form data for user registration or login.
 * Contains the user's email, password, and a description.
 *
 * @param email The user's email address.
 * @param password The user's password.
 * @param description A brief description of the user.
 */
export interface BaseFormData {
    readonly description: string;
    readonly email: string;
    readonly password: string;
}

/**
 * @interface BaseUserData
 * Extends BaseFormData with additional user-specific fields.
 * Includes the user's city and preferences.
 *
 * @param city The city where the user lives.
 * @param preferences The user's preferences as an array of strings.
 */
export interface BaseUserData extends BaseFormData {
    readonly city: string;
    readonly preferences: string[];
}