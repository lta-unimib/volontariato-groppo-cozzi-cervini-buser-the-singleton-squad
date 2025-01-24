import React from "react";

/**
 * Interface representing the state of the login form.
 *
 * This includes the fields for email, password, and a flag to toggle password visibility.
 *
 * @interface LoginFormState
 */

export interface LoginFormState {
    readonly email: string;
    readonly password: string;
    readonly showPassword: boolean;
}

/**
 * Interface for the configuration properties required by the `useLoginForm` hook.
 *
 * @interface UseLoginFormProps
 */

export interface UseLoginFormProps {
    readonly loginApiLink: string;
    readonly redirectPath: string;
}

/**
 * Interface representing the structure of the response received from the login API.
 *
 * This includes an authentication token and optionally the user information.
 *
 * @interface LoginResponse
 */

export interface LoginResponse {
    readonly authToken: string;
    readonly user?: string;
}

/**
 * Interface representing the loading and error states used during asynchronous operations.
 *
 * This interface is used for tracking the loading state and any error messages that may occur.
 *
 * @interface LoadingErrorState
 */

export interface LoadingErrorState {
    loading: boolean;
    error: string | null;
}

/**
 * Props for the Login component.
 *
 * This interface defines the properties that can be passed to the `LoginForm` component.
 * It extends the standard `div` element props and includes additional optional properties for login functionality.
 *
 * @interface LoginTypes
 * @extends React.ComponentPropsWithoutRef<"div"> - Inherits all standard properties of a `<div>` element.
 */

export interface LoginTypes extends React.ComponentPropsWithoutRef<"div"> {
    readonly signUpHref?: string;
    readonly loginApiLink?: string;
    readonly redirectPath?: string;
}
