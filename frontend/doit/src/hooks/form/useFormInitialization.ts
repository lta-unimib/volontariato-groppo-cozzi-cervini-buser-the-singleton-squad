"use client"

import React, { useState, useEffect } from 'react';
import * as bcryptjs from 'bcryptjs';
import { useSearchParams } from "next/navigation";
import { FormInitializationProps } from "@/types/form/baseFormData";
import { VolunteerFormData } from '@/types/form/auth/volunteerFormData';
import { OrganizationFormData } from '@/types/form/auth/organizationFormData';
import { RequestFormData } from "@/types/form/request/requestFormData";

// Type definitions for form data
type FormDataType = VolunteerFormData | OrganizationFormData | RequestFormData;

// Utility type to make properties of an object mutable
type Mutable<T> = { -readonly [P in keyof T]: T[P] };

// Function signature for handling form submission
type HandleSubmitFunction<T> = (data: T) => Promise<{
    status: number;
    message?: string;
}>;

/**
 * Custom hook to handle form initialization, editing state, and submission logic.
 * @param setFormDataAction Action to update form data
 * @param formData Initial form data
 * @returns Form state, handleSubmit function, and UI helpers
 */
export function useFormInitialization<T extends FormDataType>({
                                                                  setFormDataAction,
                                                                  formData
                                                              }: FormInitializationProps<T>) {
    const searchParams = useSearchParams();
    const isEditing = searchParams.get('mode') === 'edit'; // Check if the form is in edit mode
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const [initialDataLoaded, setInitialDataLoaded] = useState(false); // State for tracking if initial data is loaded

    /**
     * Effect hook to load the initial form data if the form is in edit mode.
     * Decodes the data passed in the URL parameters and sets the form data.
     */
    useEffect(() => {
        if (isEditing && !initialDataLoaded) {
            const encodedData = searchParams.get('data');
            if (encodedData) {
                try {
                    const decodedData = JSON.parse(decodeURIComponent(encodedData));
                    setFormDataAction({
                        ...decodedData,
                        password: null, // Ensure password is not included when loading initial data
                    });
                    setInitialDataLoaded(true);
                } catch (error) {
                    console.error("Error parsing profile data:", error);
                    setInitialDataLoaded(true);
                }
            }
        }
    }, [isEditing, searchParams, setFormDataAction, initialDataLoaded]);

    /**
     * Handles form submission, including password hashing if the form is not in edit mode.
     * @param e The form event
     * @param handleSubmitFn The function to handle the submission logic
     * @returns An object indicating the success or failure of the submission
     */
    const handleSubmit = async (
        e: React.FormEvent,
        handleSubmitFn: HandleSubmitFunction<T>
    ) => {
        e.preventDefault();
        try {
            const finalFormData = { ...formData } as Mutable<T> & { password?: string };

            // Hash the password if the form is not in edit mode and password is present
            if (!isEditing && formData.password) {
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

    return {
        isEditing,
        showPassword,
        setShowPassword,
        initialDataLoaded,
        handleSubmit
    };
}