"use client";

import { useState } from 'react';

/**
 * Generic hook for managing form data with type-safe updates
 * @template T The type of form data
 * @param initialData Initial form data
 * @returns Form data management utilities
 */
export function useFormData<T extends object>(initialData: T) {
    const [formData, setFormDataState] = useState<T>(initialData);

    const updateField = <K extends keyof T>(
        field: K,
        value: T[K]
    ) => {
        setFormDataState(prev => ({ ...prev, [field]: value }));
    };

    const setFormData = (newData: Partial<T>) => {
        setFormDataState(prev => ({ ...prev, ...newData }));
    };

    const resetForm = () => {
        setFormDataState(initialData);
    };

    return {
        formData,
        updateField,
        setFormData,
        resetForm
    };
}