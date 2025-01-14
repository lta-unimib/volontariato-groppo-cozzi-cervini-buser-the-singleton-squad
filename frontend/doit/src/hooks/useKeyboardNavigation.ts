import { KeyboardEvent, useState } from 'react';
import { CityData } from '@/types/cityData';

interface UseKeyboardNavigationProps {
    readonly filteredCities: CityData[];
    readonly handleCitySelection: (city: CityData) => void;
    readonly setSearchQuery: (query: string) => void;
    readonly setSelectedCity: (city: string) => void;
}

export const useKeyboardNavigation = ({
                                          filteredCities,
                                          handleCitySelection,
                                          setSearchQuery,
                                          setSelectedCity
                                      }: UseKeyboardNavigationProps) => {
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const maxIndex = filteredCities.length - 1;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => Math.min(prev + 1, maxIndex));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex <= maxIndex) {
                    handleCitySelection(filteredCities[highlightedIndex]);
                } else if (filteredCities.length === 1) {
                    handleCitySelection(filteredCities[0]);
                }
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
                    handleCitySelection(filteredCities[highlightedIndex]);
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