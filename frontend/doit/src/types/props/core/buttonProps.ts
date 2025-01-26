import * as React from "react";
import type {VariantProps} from "class-variance-authority";
import {buttonVariants} from "@/utils/components/core/buttonUtils";


export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}


export interface ButtonBackProps {
    onBack: () => void;
}
