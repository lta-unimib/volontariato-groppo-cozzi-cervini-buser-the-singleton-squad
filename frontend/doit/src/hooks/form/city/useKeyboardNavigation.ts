import { UseKeyboardNavigationProps } from '@/types/form/city/cityFormData';
import { useState, KeyboardEvent } from 'react';

/**
 * Custom hook to manage keyboard navigation for selecting cities.
 * Provides functionality for navigating through filtered cities using keyboard keys like ArrowUp, ArrowDown, Enter, and Escape.
 * @param {UseKeyboardNavigationProps} props - The props required for keyboard navigation, including filtered cities, city selection handlers, and setters.
 * @returns - The state and handlers for managing keyboard navigation.
 */
export const useKeyboardNavigation = ({
                                          filteredCities,
                                          onCitySelect,
                                          setSearchQuery,
                                          setSelectedCity
                                      }: UseKeyboardNavigationProps) => {
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const maxIndex = filteredCities.length - 1;

    /**
     * Updates the highlighted index based on the provided new index, ensuring it's within bounds.
     * @param {number} newIndex - The new index to be highlighted.
     */
    const updateHighlightedIndex = (newIndex: number) => {
        setHighlightedIndex(Math.max(0, Math.min(newIndex, maxIndex)));
    };

    /**
     * Handles the keydown events for navigating and selecting cities using the keyboard.
     * Supports ArrowDown, ArrowUp, Enter, Escape, and Tab keys for different interactions.
     * @param {KeyboardEvent<HTMLInputElement>} e - The keydown event triggered by the user.
     */
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                updateHighlightedIndex(highlightedIndex + 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                updateHighlightedIndex(highlightedIndex - 1);
                break;
            case 'Enter':
                e.preventDefault();
                const cityToSelect = filteredCities[highlightedIndex >= 0 ? highlightedIndex : 0];
                onCitySelect(cityToSelect);
                break;
            case 'Escape':
                e.preventDefault();
                setSearchQuery("");
                setSelectedCity("");
                setHighlightedIndex(-1);
                break;
            case 'Tab':
                if (highlightedIndex >= 0) {
                    e.preventDefault();
                    onCitySelect(filteredCities[highlightedIndex]);
                }
                break;
        }
    };

    return {
        highlightedIndex,
        setHighlightedIndex,
        handleKeyDown
    };
};