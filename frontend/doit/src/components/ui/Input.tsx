import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
    isInvalid?: boolean;
    isFocused?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, isInvalid, isFocused, onChange, ...props }, ref) => {
        const [, setValue] = React.useState("");
        const [shouldShowError, setShouldShowError] = React.useState(false);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setValue(newValue);
            setShouldShowError(newValue.length > 0);

            if (onChange) {
                onChange(e);
            }
        };

        const showError = isInvalid && shouldShowError;

        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    showError && isFocused && "text-destructive focus-visible:ring-destructive",
                    showError && !isFocused && "text-destructive border-destructive",
                    className
                )}
                ref={ref}
                onChange={handleChange}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };