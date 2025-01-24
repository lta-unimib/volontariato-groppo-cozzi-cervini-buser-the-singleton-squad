export interface LoginFormData {
    readonly email: string;
    readonly password: string;
}

export interface LoginFormProps {
    readonly className?: string;
    readonly role: "volunteer" | "organization";
}
