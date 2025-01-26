import { FormEvent, ReactNode } from "react";


export interface BaseFormData {
    readonly email: string;
    readonly password: string;
    readonly description: string;
}


export interface BaseUserData extends BaseFormData {
    readonly city: string;
    readonly preferences: string[];
}


export interface SuccessResponse {
    readonly success: boolean;
    readonly message?: string;
    readonly redirectUrl?: string;
}

export interface BaseFormProps {
    readonly onSubmitAction: (e: FormEvent) => Promise<SuccessResponse>;
    readonly isValid: boolean;
    readonly children: ReactNode;
    readonly redirectTo?: string;
    readonly submitText?: string;
    readonly className?: string;
    readonly buttonClassName?: string;
}

export interface FormInitializationProps<T> {
    setFormDataAction: (data: T) => void;
    formData: T;
}