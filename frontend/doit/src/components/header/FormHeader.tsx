import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/core/Button";
import { FormHeaderProps } from '@/types/props/header/formHeaderProps';

/**
 * FormHeader component renders the header of a form with a back button, title, and subtitle.
 *
 * The component consists of:
 * - A back button to navigate to the previous page.
 * - A title (usually the form name).
 * - A subtitle (optional description for the form).
 *
 * @component
 *
 * @param props - The props for the FormHeader component.
 * @param props.title - The title of the form (e.g., "Create Request").
 * @param props.subtitle - The subtitle or description of the form (e.g., "Please fill out the following details").
 * @param props.onBack - The callback function to handle the back button click event.
 *
 * @returns The rendered form header component.
 */
const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle, onBack }) => {
    return (
        <div className="flex flex-col pb-12 p-4 pt-16 bg-card shadow-md">
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
