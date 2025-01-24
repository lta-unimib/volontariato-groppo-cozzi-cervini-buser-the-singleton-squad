import React, { useState, useEffect } from 'react';
import * as bcryptjs from 'bcryptjs';
import { useSearchParams } from "next/navigation";
import { FormInitializationProps } from "@/types/form/baseFormData";
import { VolunteerFormData } from '@/types/form/auth/volunteerFormData';
import { OrganizationFormData } from '@/types/form/auth/organizationFormData';
import {RequestFormData} from "@/types/form/request/requestFormData";

type FormDataType = VolunteerFormData | OrganizationFormData | RequestFormData;

type HandleSubmitFunction<T> = (data: T) => Promise<{
    status: number;
    message?: string;
}>;

export function useFormInitialization<T extends FormDataType>({
                                                                  setFormDataAction,
                                                                  formData
                                                              }: FormInitializationProps<T>) {
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

    const handleSubmit = async (
        e: React.FormEvent,
        handleSubmitFn: HandleSubmitFunction<T>
    ) => {
        e.preventDefault();
        try {
            const finalFormData = { ...formData } as T & { password?: string };

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