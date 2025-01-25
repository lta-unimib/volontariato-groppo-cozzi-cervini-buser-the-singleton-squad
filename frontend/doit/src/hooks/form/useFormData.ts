import { useState, useCallback } from 'react';

/**
 * Custom hook to manage form data with update, reset, and set functionality.
 *
 * @template T - The shape of the form data object.
 * @param {T} initialData - The initial data to set for the form.
 * @returns - An object containing the form data and functions to manipulate it.
 */
export function useFormData<T extends object>(initialData: T) {
    const [formData, setFormDataState] = useState<T>(initialData);

    /**
     * Updates a specific field in the form data.
     *
     * @param field - The field key to update.
     * @param value - The new value to set for the field.
     */
    const updateField = useCallback(<K extends keyof T>(
        field: K,
        value: T[K]
    ) => {
        setFormDataState(prev => {
            if (prev[field] === value) return prev;
            return { ...prev, [field]: value };
        });
    }, []);

    /**
     * Sets multiple fields in the form data.
     *
     * @param newData - The partial data to update the form with.
     */
    const setFormData = useCallback((newData: Partial<T>) => {
        setFormDataState(prev => ({ ...prev, ...newData }));
    }, []);

    /**
     * Resets the form data back to the initial data.
     */
    const resetForm = useCallback(() => {
        setFormDataState(initialData);
    }, [initialData]);

    return {
        formData,
        updateField,
        setFormData,
        resetForm
    };
}