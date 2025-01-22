import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/Button";

interface FormHeaderProps {
    readonly title: string;
    readonly subtitle: string;
    readonly onBack: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle, onBack }) => {
    return (
        <div className="flex flex-col p-4 pt-16 bg-card shadow-md">
            <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center text-foreground w-fit [&_svg]:!size-6 p-0 hover:bg-transparent"
            >
                <ArrowLeft />
            </Button>
            <div className="flex flex-col mt-3">
                <h1 className="text-2xl font-semibold text-foreground pb-2">{title}</h1>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
        </div>
    );
};

export default FormHeader;