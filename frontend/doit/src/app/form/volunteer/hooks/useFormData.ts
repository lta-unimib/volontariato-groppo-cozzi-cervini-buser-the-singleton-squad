"use client";

import { useState } from 'react';
import { VolunteerFormData } from '@/types/formData';

const initialFormData: VolunteerFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    availability: undefined,
    city: "",
    preferences: [],
    description: "",
    role: 'volunteer'
};

export const useFormData = () => {
    const [formData, setFormDataState] = useState<VolunteerFormData>(initialFormData);

    const updateField = <K extends keyof VolunteerFormData>(
        field: K,
        value: VolunteerFormData[K]
    ) => {
        setFormDataState(prev => ({ ...prev, [field]: value }));
    };

    const setFormData = (newData: Partial<VolunteerFormData>) => {
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
