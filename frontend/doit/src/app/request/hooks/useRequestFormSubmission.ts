"use client"

import { makePostRequest, makeUpdateRequest } from '@/utils/refactored/api/apiUtils';
import {RequestFormData} from "@/types/refactored/form/requestFormData";

const makeRequestSubmission = async (formData: RequestFormData) => {
    return makePostRequest('/request/new/', formData);
};

const makeEditRequest = async (idRequest: string, formData: RequestFormData) => {
    const endpoint = `/request/${idRequest}/`;
    return makeUpdateRequest(endpoint, formData);
};

export const useRequestFormSubmission = (isEditing: boolean, idRequest?: string) => ({
    handleSubmit: async (formData: RequestFormData) => {
        if (isEditing && idRequest) {
            return await makeEditRequest(idRequest, formData);
        } else {
            return await makeRequestSubmission(formData);
        }
    }
});