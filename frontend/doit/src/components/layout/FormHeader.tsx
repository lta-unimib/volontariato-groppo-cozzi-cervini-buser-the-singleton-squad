import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface FormHeaderProps {
    readonly title: string;
    readonly subtitle: string;
    readonly onBack: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle, onBack }) => {
    return (
        <div className="flex items-center p-4 pt-12 bg-card shadow-md md:space-x-4">
            <button
                onClick={onBack}
                className="flex items-center text-foreground hover:text-primary"
            >
                <ArrowLeft size={20} />
            </button>
            <div className="flex flex-col ml-4 px-6">
                <h1 className="text-2xl font-semibold text-foreground pb-2">{title}</h1>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
        </div>
    );
};

export default FormHeader;