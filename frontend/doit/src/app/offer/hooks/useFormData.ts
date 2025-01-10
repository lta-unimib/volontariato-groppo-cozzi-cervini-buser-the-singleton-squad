"use client";

import { useState } from 'react';
import { OfferFormData } from '@/types/formData';

const initialFormData: OfferFormData = {
    id: "",
    date: "",
    address: "",
    categories: [],
    activities: [],
    description: "",
    volunteerCapacity: ""
};

export const useFormData = () => {
    const [formData, setFormData] = useState<OfferFormData>(initialFormData);

    const updateField = <K extends keyof OfferFormData>(
        field: K,
        value: OfferFormData[K]
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
