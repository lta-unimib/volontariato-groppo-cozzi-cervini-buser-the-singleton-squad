"use client"

import { makePostRequest, makeUpdateRequest } from '@/utils/apiUtils';
import {VolunteerFormData} from "@/types/refactored/model/volunteerFormData";
import {OrganizationFormData} from "@/types/refactored/model/organizationFormData";

type FormType = "volunteer" | "organization";
type FormData = VolunteerFormData | OrganizationFormData;

interface RegistrationResponse {
    authToken: string;
    user?: string;
}

const makeRegistrationRequest = async (formType: FormType, formData: FormData) => {
    const endpoint = `/registration/${formType}/`;
    return makePostRequest<RegistrationResponse>(endpoint, formData);
};

const makeEditRequest = async (formType: FormType, formData: FormData) => {
    const endpoint = `/profile/${formType}/`;
    return makeUpdateRequest<RegistrationResponse>(endpoint, formData);
};

export const useFormSubmission = (formType: FormType, isEditing: boolean) => ({
    handleSubmit: async (formData: FormData) => {
        const response = isEditing
            ? await makeEditRequest(formType, formData)
            : await makeRegistrationRequest(formType, formData);

        if (!isEditing && response.status === 200 && response.data) {
            if (response.data.authToken) {
                sessionStorage.setItem('authToken', response.data.authToken);
                if (response.data.user) {
                    sessionStorage.setItem('userData', JSON.stringify(response.data.user));
                }
            }
        }

        return response;
    }
});
