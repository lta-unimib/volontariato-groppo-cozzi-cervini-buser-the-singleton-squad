"use client";

import React, { useState, useEffect } from 'react';
import bcryptjs from 'bcryptjs';
import { useSearchParams } from "next/navigation";
import {FormInitializationProps} from "@/types/refactored/form/baseFormData";

export function useFormInitialization({setFormDataAction, formData }: FormInitializationProps) {
    const searchParams = useSearchParams();
    const isEditing = searchParams.get('mode') === 'edit';
    const [showPassword, setShowPassword] = useState(false);
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    useEffect(() => {
        if (isEditing && !initialDataLoaded) {
            const encodedData = searchParams.get('data');
            if (encodedData) {
                try {
                    const decodedData = JSON.parse(decodeURIComponent(encodedData));
                    setFormDataAction({
                        ...decodedData,
                        password: null,
                    });
                    setInitialDataLoaded(true);
                } catch (error) {
                    console.error("Error parsing profile data:", error);
                    setInitialDataLoaded(true);
                }
            }
        }
    }, [isEditing, searchParams, setFormDataAction, initialDataLoaded]);

    const handleSubmit = async (e: React.FormEvent, handleSubmitFn: any) => {
        e.preventDefault();
        try {
            let finalFormData = { ...formData };

            if (!isEditing) {
                const salt = await bcryptjs.genSalt(10);
                finalFormData.password = await bcryptjs.hash(formData.password, salt);
            }

            const response = await handleSubmitFn(finalFormData);
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

    console.log(isEditing);

    return {
        isEditing,
        showPassword,
        setShowPassword,
        initialDataLoaded,
        handleSubmit
    };
}