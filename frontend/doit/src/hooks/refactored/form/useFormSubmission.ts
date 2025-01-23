import { makePostRequest, makeUpdateRequest } from '@/utils/refactored/api/apiUtils';
import { VolunteerFormData } from "@/types/refactored/form/auth/volunteerFormData";
import { OrganizationFormData } from "@/types/refactored/form/auth/organizationFormData";
import { LoginFormData } from "@/types/refactored/form/auth/loginFormData";

type FormType = "volunteer" | "organization" | "login";
type LoginType = "volunteer" | "organization";
type FormData = VolunteerFormData | OrganizationFormData | LoginFormData;

interface AuthResponse {
    authToken: string;
    user?: string;
}

const makeRegistrationRequest = async (formType: FormType, formData: FormData) => {
    const endpoint = `/registration/${formType}/`;
    return makePostRequest<AuthResponse>(endpoint, formData);
};

const makeEditRequest = async (formType: FormType, formData: FormData) => {
    const endpoint = `/profile/${formType}/`;
    return makeUpdateRequest<AuthResponse>(endpoint, formData);
};

const makeLoginRequest = async (loginUserType: LoginType, formData: LoginFormData) => {
    const endpoint = `/login/${loginUserType}/`;
    return makePostRequest<AuthResponse>(endpoint, formData);
};

export const useFormSubmission = (formType: FormType, loginUserType?: LoginType, isEditing?: boolean) => ({
    handleSubmit: async (formData: FormData) => {
        let response;

        console.log("isEditing value:", isEditing);
        console.log("loginType value:", loginUserType);
        console.log("formData:", formData);

        if (formType === "login") {
            if (!loginUserType) {
                throw new Error("loginUserType is required when formType is 'login'.");
            }
            response = await makeLoginRequest(loginUserType, formData as LoginFormData);
        } else {
            response = isEditing
                ? await makeEditRequest(formType, formData)
                : await makeRegistrationRequest(formType, formData);

        }

        if (response.status === 200 && response.data) {
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
});