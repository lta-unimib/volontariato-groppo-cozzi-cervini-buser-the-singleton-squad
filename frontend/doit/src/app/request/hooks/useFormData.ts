"use client";

import { useState } from 'react';
import { RequestFormData } from '@/types/formData';

const initialFormData: RequestFormData = {
    title: "",
    date: "",
    address: {
        street: "",
        number: "",
        city: "",
        postalCode: "",
        additionalInfo: ""
    },
    categories: [],
    frequency: [],
    description: "",
    volunteerCapacity: "",
    startTime: "",
    endTime: ""
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