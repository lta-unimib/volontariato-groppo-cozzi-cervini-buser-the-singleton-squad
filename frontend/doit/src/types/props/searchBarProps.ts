import type React from "react";

/**
 * Props for the `SearchBar` component.
 *
 * The `SearchBar` component provides a UI for searching and filtering through data, with options
 * to toggle registered state, apply filters, and customize its appearance and behavior.
 *
 * @param className (Optional) A custom CSS class name to apply to the root div element of the search bar.
 *
 * @param onRegisteredToggle (Optional) A callback function that is triggered when the registered toggle is changed.
 * Receives a boolean value (`enabled`) indicating if the toggle is on or off.
 *
 * @param label (Optional) A label to display inside the search bar.
 * This can be used for adding custom text or instructions.
 *
 * @param showToggle (Optional) A boolean that determines whether a toggle for registered state is shown.
 *
 * @param showFilters (Optional) A boolean that determines whether filters are shown in the search bar.
 *
 * @param filters (Optional) An array of filter strings to be displayed in the search bar.
 *
 * @param onFilterClick (Optional) A callback function that is called when a filter is clicked.
 * Receives the filter string that was clicked.
 *
 * @param onSearch (Optional) A callback function for handling search queries.
 * Receives the search query string and returns an array of search results.
 *
 * @param disabled (Optional) A boolean that determines whether the search bar is disabled.
 */
export interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    onRegisteredToggle?: (enabled: boolean) => void;
    label?: string;
    showToggle?: boolean;
    showFilters?: boolean;
    filters?: string[];
    onFilterClick?: (filter: string) => void;
    onSearch?: (query: string) => SearchResult[];
    disabled?: boolean;
}

/**
 * Represents a single search result item.
 */
export interface SearchResult {
    label: string;
    value: never;
    description?: string;
}

