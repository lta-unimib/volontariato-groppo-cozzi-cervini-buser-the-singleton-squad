import { useState, useCallback } from 'react';


export function useFormData<T extends object>(initialData: T) {
    const [formData, setFormDataState] = useState<T>(initialData);


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