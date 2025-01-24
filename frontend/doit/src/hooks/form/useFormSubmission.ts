"use client"

import { makePostRequest, makeUpdateRequest } from '@/utils/api/apiUtils';
import { VolunteerFormData } from "@/types/form/auth/volunteerFormData";
import { OrganizationFormData } from "@/types/form/auth/organizationFormData";
import { LoginFormData } from "@/types/form/auth/loginFormData";
import { RequestFormData } from "@/types/form/request/requestFormData";

// Define possible form types and data structure
type FormType = "volunteer" | "organization" | "login" | "request";
type LoginType = "volunteer" | "organization";
type FormData = VolunteerFormData | OrganizationFormData | LoginFormData | RequestFormData;

interface AuthResponse {
    authToken: string;
    user?: string;
}

/**
 * Service class for handling different types of form submissions
 * including registration, profile updates, login, and request submissions.
 */
class FormSubmissionService {
    private static endpoints = {
        registration: (formType: FormType) => `/registration/${formType}/`,
        profile: (formType: FormType) => `/profile/${formType}/`,
        login: (loginType: LoginType) => `/login/${loginType}/`,
        request: {
            new: () => '/request/new/',
            edit: (idRequest: string) => `/request/${idRequest}/`
        }
    };

    /**
     * Makes a POST request to register a user.
     * @param formType The type of user form (volunteer, organization, etc.)
     * @param formData The form data to be sent in the request.
     * @returns A promise with the response of the request, which contains the authentication token.
     */
    static async makeRegistrationRequest(formType: FormType, formData: FormData) {
        return makePostRequest<AuthResponse>(this.endpoints.registration(formType), formData);
    }

    /**
     * Makes an UPDATE request to update the user profile.
     * @param formType The type of user form (volunteer, organization, etc.)
     * @param formData The form data to be updated.
     * @returns A promise with the response of the request, which may contain an authentication token.
     */
    static async makeEditRequest(formType: FormType, formData: FormData) {
        return makeUpdateRequest<AuthResponse>(this.endpoints.profile(formType), formData);
    }

    /**
     * Makes a POST request to log a user.
     * @param loginUserType The type of user trying to log in (volunteer, organization).
     * @param formData The login data (username, password, etc.)
     * @returns A promise with the response, which contains the authentication token if successful.
     */
    static async makeLoginRequest(loginUserType: LoginType, formData: LoginFormData) {
        return makePostRequest<AuthResponse>(this.endpoints.login(loginUserType), formData);
    }

    /**
     * Makes a POST request to submit a new request.
     * @param formData The request data to be submitted.
     * @returns A promise with the response of the request.
     */
    static async makeRequestSubmission(formData: RequestFormData) {
        return makePostRequest(this.endpoints.request.new(), formData);
    }

    /**
     * Makes an UPDATE request to edit an existing request.
     * @param idRequest The ID of the request to be edited.
     * @param formData The data to be updated for the request.
     * @returns A promise with the response of the request.
     */
    static async makeEditRequestForRequest(idRequest: string, formData: RequestFormData) {
        return makeUpdateRequest(this.endpoints.request.edit(idRequest), formData);
    }

    /**
     * Handles form submission based on form type and editing status.
     * It decides whether to register, update, login, or submit a request.
     * @param options An object containing the form type, form data, and optional parameters like loginUserType or idRequest.
     * @returns A promise with the response, possibly containing an authentication token.
     */
    static async handleSubmit(options: {
        formType: FormType;
        formData: FormData;
        loginUserType?: LoginType;
        isEditing?: boolean;
        idRequest?: string;
    }) {
        const { formType, formData, loginUserType, isEditing, idRequest } = options;

        let response;

        switch (formType) {
            case "login":
                if (!loginUserType) {
                    throw new Error("loginUserType is required for login.");
                }
                response = await this.makeLoginRequest(loginUserType, formData as LoginFormData);
                break;
            case "request":
                response = isEditing && idRequest
                    ? await this.makeEditRequestForRequest(idRequest, formData as RequestFormData)
                    : await this.makeRequestSubmission(formData as RequestFormData);
                break;
            default:
                response = isEditing
                    ? await this.makeEditRequest(formType, formData)
                    : await this.makeRegistrationRequest(formType, formData);
        }

        // Add authentication token handling
        if (response.status === 200 && this.isAuthResponse(response.data)) {
            const { authToken, user } = response.data;
            if (authToken) {
                sessionStorage.setItem('authToken', authToken);
                if (user) {
                    sessionStorage.setItem('userData', JSON.stringify(user));
                }
            }
        }

        return response;
    }

    /**
     * Type guard to check if the response data is of type AuthResponse.
     * @param data The data to check.
     * @returns True if the data has the authToken field, indicating it is an AuthResponse.
     */
    private static isAuthResponse(data: unknown): data is AuthResponse {
        return (
            typeof data === 'object' &&
            data !== null &&
            'authToken' in data
        );
    }
}

/**
 * Custom hook for handling form submissions with a given form type and optional parameters.
 * @param formType The type of form being submitted (volunteer, organization, login, request).
 * @param loginUserType Optional, required only for login forms to indicate the type of login.
 * @param isEditing Optional, indicates if the form is in edit mode.
 * @param idRequest Optional, used for editing requests to specify the request ID.
 * @returns An object containing a handleSubmit function to handle form submission.
 */
export const useFormSubmission = <T extends FormData>(formType: FormType, loginUserType?: LoginType, isEditing?: boolean, idRequest?: string) => ({
    handleSubmit: async (formData: T) => {
        console.log('handleSubmit chiamato', formData); // Aggiungi questo log
        return FormSubmissionService.handleSubmit({ formType, formData, loginUserType, isEditing, idRequest });
    }
});