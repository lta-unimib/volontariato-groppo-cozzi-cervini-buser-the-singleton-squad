"use client"

import { makeApiRequest } from '@/utils/apiUtils';
import { VolunteerFormData, OrganizationFormData } from "@/types/formData";

type FormType = "volunteer" | "organization";
type FormData = VolunteerFormData | OrganizationFormData;

interface RegistrationResponse {
    authToken: string;
    user?: string;
}

export const useFormSubmission = (formType: FormType, isEditing: boolean) => ({
    handleSubmit: async (formData: FormData) => {
        const endpoint = isEditing ? `/update/${formType}/` : `/registration/${formType}/`;
        const response = await makeApiRequest<RegistrationResponse>(endpoint, formData);

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