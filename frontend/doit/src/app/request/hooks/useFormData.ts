"use client";

import { useState } from 'react';
import { RequestFormData } from '@/types/formData';

const initialFormData: RequestFormData = {
    title: "",
    date: "",
    address: "",
    categories: [],
    activities: [],
    description: "",
    volunteerCapacity: "",
    email: "",
    password: "",
};

export const useFormData = () => {
    const [formData, setFormData] = useState<RequestFormData>(initialFormData);

    const updateField = <K extends keyof RequestFormData>(
        field: K,
        value: RequestFormData[K]
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
