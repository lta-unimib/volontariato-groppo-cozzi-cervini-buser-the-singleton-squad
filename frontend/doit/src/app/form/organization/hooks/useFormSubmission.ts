import { OrganizationFormData } from "@/types/formData";
import React from "react";

export const useFormSubmission = (formData: OrganizationFormData) => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Qui potresti aggiungere la logica per inviare i dati a un'API
            console.log("Form Data:", JSON.stringify(formData, null, 2));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return {
        handleSubmit
    };
};