import { useState, KeyboardEvent } from 'react';
import { CityData } from '@/types/cityData';

interface UseKeyboardNavigationProps {
    filteredCities: CityData[];
    onCitySelect: (city: CityData) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setSelectedCity: (city: string) => void;
}

export const useKeyboardNavigation = ({
                                          filteredCities,
                                          onCitySelect,
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
                    onCitySelect(filteredCities[highlightedIndex]);
                } else if (filteredCities.length === 1) {
                    onCitySelect(filteredCities[0]);
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