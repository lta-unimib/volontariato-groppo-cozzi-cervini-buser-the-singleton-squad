import { UseKeyboardNavigationProps } from '@/types/form/city/cityFormData';
import { useState, KeyboardEvent } from 'react';

export const useKeyboardNavigation = ({
                                          filteredCities,
                                          onCitySelect,
                                          setSearchQuery,
                                          setSelectedCity
                                      }: UseKeyboardNavigationProps) => {
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const maxIndex = filteredCities.length - 1;

    const updateHighlightedIndex = (newIndex: number) => {
        setHighlightedIndex(Math.max(0, Math.min(newIndex, maxIndex)));
    };

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