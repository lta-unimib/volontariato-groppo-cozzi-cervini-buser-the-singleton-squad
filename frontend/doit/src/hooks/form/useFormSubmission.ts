"use client"

import { makePostRequest, makeUpdateRequest } from '@/utils/api/apiUtils';
import { VolunteerFormData } from "@/types/form/auth/volunteerFormData";
import { OrganizationFormData } from "@/types/form/auth/organizationFormData";
import { LoginFormData } from "@/types/form/auth/loginFormData";
import { RequestFormData } from "@/types/form/request/requestFormData";

type FormType = "volunteer" | "organization" | "login" | "request";
type LoginType = "volunteer" | "organization";
type FormData = VolunteerFormData | OrganizationFormData | LoginFormData | RequestFormData;

interface AuthResponse {
    authToken: string;
    user?: string;
}

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

    static async makeRegistrationRequest(formType: FormType, formData: FormData) {
        return makePostRequest<AuthResponse>(this.endpoints.registration(formType), formData);
    }

    static async makeEditRequest(formType: FormType, formData: FormData) {
        return makeUpdateRequest<AuthResponse>(this.endpoints.profile(formType), formData);
    }

    static async makeLoginRequest(loginUserType: LoginType, formData: LoginFormData) {
        return makePostRequest<AuthResponse>(this.endpoints.login(loginUserType), formData);
    }

    static async makeRequestSubmission(formData: RequestFormData) {
        return makePostRequest(this.endpoints.request.new(), formData);
    }

    static async makeEditRequestForRequest(idRequest: string, formData: RequestFormData) {
        return makeUpdateRequest(this.endpoints.request.edit(idRequest), formData);
    }

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

    private static isAuthResponse(data: unknown): data is AuthResponse {
        return (
            typeof data === 'object' &&
            data !== null &&
            'authToken' in data
        );
    }
}

export const useFormSubmission = <T extends FormData>(formType: FormType, loginUserType?: LoginType, isEditing?: boolean, idRequest?: string) => ({
    handleSubmit: async (formData: T) => {
        console.log('handleSubmit chiamato', formData); // Aggiungi questo log
        return FormSubmissionService.handleSubmit({ formType, formData, loginUserType, isEditing, idRequest });
    }
});
