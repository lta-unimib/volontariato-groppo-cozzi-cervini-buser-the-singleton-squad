import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_LINK } from "@/utils/constants";

interface LoginFormState {
    readonly email: string;
    readonly password: string;
    readonly showPassword: boolean;
    readonly error: string | null;
    readonly loading: boolean;
}

interface UseLoginFormProps {
    readonly loginApiLink: string;
    readonly redirectPath: string;
}

export const useLoginForm = ({ loginApiLink, redirectPath }: UseLoginFormProps) => {
    const [formState, setFormState] = useState<LoginFormState>({
        email: "",
        password: "",
        showPassword: false,
        error: null,
        loading: false,
    });

    const router = useRouter();

    const updateFormState = (field: keyof LoginFormState, value: string | boolean | null) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateFormState('loading', true);
        updateFormState('error', null);

        try {
            const fullUrl = `${API_BASE_LINK}${loginApiLink}`;
            console.log("API Request URL:", fullUrl);
            console.log("Request Payload:", { email: formState.email, password: formState.password });

            const response = await fetch(fullUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formState.email,
                    password: formState.password
                }),
            });

            console.log("Response Status:", response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.log("Error Response Data:", errorData);
                const errorMessage = errorData.message || `Login failed: ${response.statusText}`;
                updateFormState('error', errorMessage);
                return;
            }

            const data = await response.json();
            console.log("Success Response Data:", data);
            router.push(redirectPath);

        } catch (err) {
            console.error("Error during login:", err);
            updateFormState('error', "An unexpected error occurred. Please try again later.");
        } finally {
            updateFormState('loading', false);
        }
    };

    return {
        formState,
        updateFormState,
        handleSubmit,
    };
};