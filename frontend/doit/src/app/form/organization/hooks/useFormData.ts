import { useState } from "react";
import { OrganizationFormData } from "@/types/formData";

const initialFormData: OrganizationFormData = {
    id: "",
    organizationName: "",
    city: "",
    preferences: [],
    description: "",
    VATNumber: "",
    webSite: "",
};

export const useFormData = () => {
    const [formData, setFormData] = useState<OrganizationFormData>(initialFormData);

    const updateField = <K extends keyof OrganizationFormData>(
        field: K,
        value: OrganizationFormData[K]
    ) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return {
        formData,
        updateField,
        resetForm
    };
};