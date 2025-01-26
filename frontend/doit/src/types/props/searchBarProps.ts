import type React from "react";

export interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    onSubscribedToggle?: (enabled: boolean) => void;
    label?: string;
    showToggle?: boolean;
    showFilters?: boolean;
    filters?: string[];
    onFilterClick?: (filter: string) => void;
    onSearch?: (query: string) => SearchResult[];
    disabled?: boolean;
}

export interface SearchResult {
    label: string;
    value: never;
    description?: string;
}

