import { Input } from "@/components/ui/Input";
import React from "react";

export interface IconInputProps {
    readonly value: string;
    readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly placeholder: string;
    readonly icon: React.ReactNode;
    readonly isInvalid?: boolean;
    readonly isFocused?: boolean;
    readonly onFocus?: () => void;
    readonly onBlur?: () => void;
    readonly type?: 'text' | 'email' | 'password';
}

export function IconInput({
                              value,
                              onChange,
                              placeholder,
                              icon,
                              isInvalid,
                              isFocused,
                              onFocus,
                              onBlur,
                              type = 'text'
                          }: IconInputProps) {

    const shouldShowError = value.trim().length > 0 && isInvalid;

    return (
        <div className="w-full relative">
            <Input
                placeholder={placeholder}
                className="rounded-3xl pl-12"
                onChange={onChange}
                value={value}
                isInvalid={shouldShowError}
                isFocused={isFocused}
                onFocus={onFocus}
                onBlur={onBlur}
                type={type}
            />
            <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                value.trim().length > 0 ? "text-foreground" : "text-muted-foreground"
            }`}>
                {icon}
            </div>
        </div>
    );
}