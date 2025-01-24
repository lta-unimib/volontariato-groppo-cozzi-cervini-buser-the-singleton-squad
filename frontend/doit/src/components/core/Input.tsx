import * as React from "react";
import { cn } from "@/utils/cnUtils";
import { InputProps } from "@/types/props/core/inputProps";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
         className,
         type = 'text',
         isInvalid,
         isFocused,
         onChange,
         icon,
         value,
         ...props
     }, ref) => {
        const shouldShowError = typeof value === 'string'
            ? value.trim().length > 0 && isInvalid
            : false;

        return (
            <div className="w-full relative">
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-3xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        icon ? "pl-12" : "pl-4",
                        shouldShowError && isFocused && "text-destructive focus-visible:ring-destructive",
                        shouldShowError && !isFocused && "text-destructive border-destructive",
                        className
                    )}
                    ref={ref}
                    onChange={onChange}
                    value={value}
                    {...props}
                />
                {icon && (
                    <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                        typeof value === 'string' && value.trim().length > 0
                            ? "text-foreground"
                            : "text-muted-foreground"
                    }`}>
                        {icon}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };