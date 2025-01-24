"use client";

import { RequestFormData } from '@/types/refactored/model/requestFormData';
import { useState } from 'react';

const initialFormData: RequestFormData = {
    title: "",
    timeRange: ["", ""],
    address: {
        street: "",
        number: "",
        city: "",
        postalCode: "",
        additionalInfo: ""
    },
    categories: [],
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
        resetForm,
        setFormData
    };
};