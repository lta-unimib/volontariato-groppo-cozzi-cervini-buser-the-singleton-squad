"use client"

import { useState } from 'react';
import { VolunteerFormData } from '@/types/formData';

const initialFormData: VolunteerFormData = {
    availability: null,
    city: "",
    preferences: [],
    description: "",
};

export const useFormData = () => {
    const [formData, setFormData] = useState<VolunteerFormData>(initialFormData);

    const updateField = <K extends keyof VolunteerFormData>(
        field: K,
        value: VolunteerFormData[K]
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