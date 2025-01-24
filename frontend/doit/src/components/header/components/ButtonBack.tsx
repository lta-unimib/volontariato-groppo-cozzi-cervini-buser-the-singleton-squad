import { Button } from "@/components/core/Button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { ButtonBackProps } from "@/types/props/core/buttonProps";

/**
 * ButtonBack component renders a button with a left arrow icon that triggers a `back` action when clicked.
 *
 * @component
 *
 * @param props - The props for the ButtonBack component.
 * @param props.onBack - The callback function to handle the back action when the button is clicked.
 *
 * @example
 * <ButtonBack onBack={() => window.history.back()} />
 */
export const ButtonBack: React.FC<ButtonBackProps> = ({ onBack }) => (
    <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center text-foreground w-fit [&_svg]:!size-6 p-0 hover:bg-transparent mt-8 mb-4 md:hidden"
    >
        <ArrowLeft />
    </Button>
);
