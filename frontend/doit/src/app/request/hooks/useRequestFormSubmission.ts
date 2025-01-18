"use client"

import { makeApiRequest } from '@/utils/apiUtils';
import { RequestFormData } from "@/types/formData";

export const useRequestFormSubmission = () => ({
    handleSubmit: (formData: RequestFormData) => makeApiRequest('/request/new/', formData)
});