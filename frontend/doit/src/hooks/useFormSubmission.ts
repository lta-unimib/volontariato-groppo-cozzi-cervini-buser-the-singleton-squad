import { VolunteerFormData, OrganizationFormData } from "@/types/formData";
import React, { useEffect, useState } from "react";
import { API_BASE_LINK } from "@/utils/constants";

type FormType = "volunteer" | "organization";
type FormData = VolunteerFormData | OrganizationFormData;

export const useFormSubmission = (formData: FormData, formType: FormType) => {
    const [userId, setUserId] = useState<string>('');
    const [authToken, setAuthToken] = useState<string>('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userIdParam = urlParams.get('userId');
        const tokenParam = urlParams.get('authToken');

        if (userIdParam) setUserId(userIdParam);
        if (tokenParam) setAuthToken(tokenParam);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const completeFormData = {
            ...formData,
            id: userId,
        };

        try {
            console.log("Form Data:", JSON.stringify(completeFormData, null, 2));

            const endpoint = `${API_BASE_LINK}/register/${formType}/`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(completeFormData)
            });

            const data = await response.json();
            console.log("API Response:", JSON.stringify(data, null, 2));

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return {
        handleSubmit,
        userId,
        authToken
    };
};