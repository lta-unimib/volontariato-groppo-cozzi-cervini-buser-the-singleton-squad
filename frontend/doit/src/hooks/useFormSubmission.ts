"use client"

import { makeApiRequest } from '@/utils/apiUtils';
import { VolunteerFormData, OrganizationFormData } from "@/types/formData";

type FormType = "volunteer" | "organization";
type FormData = VolunteerFormData | OrganizationFormData;

export const useFormSubmission = (formType: FormType) => ({
    handleSubmit: (formData: FormData) => makeApiRequest(`/registration/${formType}/`, formData)
});
