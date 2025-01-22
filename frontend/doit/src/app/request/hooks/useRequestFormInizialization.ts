import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";

interface FormInitializationProps {
    setFormDataAction: (data: any) => void;
    formData: any;
}

export function useRequestFormInitialization({ setFormDataAction, formData }: FormInitializationProps) {
    const searchParams = useSearchParams();
    const isEditing = searchParams.get('mode') === 'edit';
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    useEffect(() => {
        if (isEditing && !initialDataLoaded) {
            const encodedData = searchParams.get('data');
            if (encodedData) {
                try {
                    const decodedData = JSON.parse(decodeURIComponent(encodedData));
                    setFormDataAction(decodedData);
                    setInitialDataLoaded(true);
                } catch (error) {
                    console.error("Error parsing request data:", error);
                    setInitialDataLoaded(true);
                }
            }
        }
    }, [isEditing, searchParams, setFormDataAction, initialDataLoaded]);

    const handleSubmit = async (e: React.FormEvent, handleSubmitFn: any) => {
        e.preventDefault();
        try {
            const response = await handleSubmitFn(formData);
            if (response.status === 200) {
                return { success: true };
            }
            return {
                success: false,
                message: response.message || `Error ${response.status}`
            };
        } catch (error) {
            console.error("Error during form submission:", error);
            return { success: false, message: "Submission failed" };
        }
    };

    return {
        isEditing,
        initialDataLoaded,
        handleSubmit
    };
}