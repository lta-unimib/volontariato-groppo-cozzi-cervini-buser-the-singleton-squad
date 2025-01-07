import { Input } from "@/components/ui/Input";
import React, {ReactNode} from "react";

interface IconInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon: ReactNode;
}

export function IconInput({ value, onChange, placeholder, icon }: IconInputProps) {
    return (
        <div className="w-full relative">
            <Input
                placeholder={placeholder}
                className="rounded-3xl pl-12"
                onChange={onChange}
                value={value}
            />
            <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                value.trim().length > 0 ? "text-foreground" : "text-muted-foreground"
            }`}>
                {icon}
            </div>
        </div>
    );
}