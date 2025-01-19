import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { makeApiRequest } from "@/utils/apiUtils";

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

interface LoginResponse {
    authToken: string;
    user?: string;
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

        const { status, data, message } = await makeApiRequest<LoginResponse>(
            loginApiLink,
            {
                email: formState.email,
                password: formState.password
            }
        );

        if (status !== 200 || !data) {
            updateFormState('error', message || 'Login failed');
            updateFormState('loading', false);
            return;
        }

        if (data.authToken) {
            sessionStorage.setItem('authToken', data.authToken);
            if (data.user) {
                sessionStorage.setItem('userData', JSON.stringify(data.user));
            }
        }

        updateFormState('loading', false);
        router.push(redirectPath);
    };

    return {
        formState,
        updateFormState,
        handleSubmit,
    };
};