import { Button } from "@/components/core/Button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import {ButtonBackProps} from "@/types/props/core/buttonProps";

export const ButtonBack: React.FC<ButtonBackProps> = ({ onBack }) => (
    <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center text-foreground w-fit [&_svg]:!size-6 p-0 hover:bg-transparent mt-8 mb-4 md:hidden"
    >
        <ArrowLeft />
    </Button>
);
