"use client"

import { API_BASE_LINK } from "@/utils/constants";
import { VolunteerFormData, OrganizationFormData, OfferFormData } from "@/types/formData";

type FormType = "volunteer" | "organization" | "offer";
type FormData = VolunteerFormData | OrganizationFormData | OfferFormData;

export const useFormSubmission = (formType: FormType) => {
    const handleSubmit = async (formData: FormData) => {
        try {
            console.log("Form Data:", JSON.stringify(formData, null, 2));

            const endpoint = `${API_BASE_LINK}/register/${formType}`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("API Response:", JSON.stringify(data, null, 2));

            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, error: data.message || 'Unknown error' };
            }
        } catch (error) {
            console.error('Error:', error);

            let errorMessage = "An unexpected error occurred.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            return { success: false, error: errorMessage };
        }
    };

    return {
        handleSubmit,
    };
};
