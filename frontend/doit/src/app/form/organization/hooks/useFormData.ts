"use client"

import { OrganizationFormData } from "@/types/refactored/model/organizationFormData";
import { useState } from "react";

const initialFormData: OrganizationFormData = {
    organizationName: "",
    email: "",
    password: "",
    city: "",
    preferences: [],
    description: "",
    VATNumber: "",
    website: "",
    role: 'organization'
};

export const useFormData = () => {
    const [formData, setFormDataState] = useState<OrganizationFormData>(initialFormData);

    const updateField = <K extends keyof OrganizationFormData>(
        field: K,
        value: OrganizationFormData[K]
    ) => {
        setFormDataState(prev => ({ ...prev, [field]: value }));
    };

    const setFormData = (newData: Partial<OrganizationFormData>) => {
        setFormDataState(prev => ({ ...prev, ...newData }));
    };

    const resetForm = () => {
        setFormDataState(initialFormData);
    };

    return {
        formData,
        updateField,
        setFormData,
        resetForm
    };
};