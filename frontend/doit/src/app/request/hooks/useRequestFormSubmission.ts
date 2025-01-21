"use client"

import { makePostRequest } from '@/utils/apiUtils';
import { RequestFormData } from "@/types/formData";

export const useRequestFormSubmission = () => ({
    handleSubmit: (formData: RequestFormData) => makePostRequest('/request/new/', formData)
});