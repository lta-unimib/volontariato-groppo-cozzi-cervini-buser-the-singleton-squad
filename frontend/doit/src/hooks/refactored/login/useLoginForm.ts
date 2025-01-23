import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { makePostRequest } from "@/utils/apiUtils";
import { useLoadingError } from "@/hooks/refactored/useLoadingError";
import { saveAuthData } from "@/utils/refactored/login/authUtils";
import { LoginFormState, UseLoginFormProps, LoginResponse } from "@/types/refactored/login/loginTypes";

/**
 * Custom hook for managing login form state and submission logic.
 *
 * @param props - Configuration properties for the login form.
 * @returns An object containing form state, methods, and loading/error states.
 */

export const useLoginForm = ({ loginApiLink, redirectPath }: UseLoginFormProps) => {
    const [formState, setFormState] = useState<LoginFormState>({
        email: "",
        password: "",
        showPassword: false,
    });

    const { loading, error, setLoading, setError } = useLoadingError();
    const router = useRouter();

    const updateFormState = (field: keyof LoginFormState, value: string | boolean) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { status, data, message } = await makePostRequest<LoginResponse>(
            loginApiLink,
            { email: formState.email, password: formState.password }
        );

        if (status !== 200 || !data) {
            setError(message || "Login failed");
            setLoading(false);
            return;
        }

        if (data.authToken) {
            saveAuthData(data.authToken, data.user);
        }

        setLoading(false);
        router.push(redirectPath);
    };

    return {
        formState,
        updateFormState,
        handleSubmit,
        loading,
        error,
    };
};