import type React from "react";

export interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    onRegisteredToggle?: (enabled: boolean) => void;
    label?: string;
    showToggle?: boolean;
    showFilters?: boolean;
    filters?: string[];
    onFilterClick?: (filter: string) => void;
    disabled?: boolean;
}
