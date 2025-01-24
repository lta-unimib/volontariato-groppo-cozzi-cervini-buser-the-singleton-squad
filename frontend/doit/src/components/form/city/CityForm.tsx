import React, { useRef, ChangeEvent, useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/core/Card";
import { Input } from "@/components/core/Input";
import { CityList } from "./CityList";
import { useCitySearch } from "@/hooks/form/city/useCitySearch";
import { useKeyboardNavigation } from "@/hooks/form/city/useKeyboardNavigation";
import { CityPickerProps, CityFormData } from "@/types/form/city/cityFormData";

/**
 * Props for the `CityForm` component.
 * @param {string} value - The selected city value, initially passed as a prop.
 * @param - A callback function to handle city selection and optional postal code (CAP).
 * @param - A flag to indicate whether to show the postal code (CAP) on city selection.
 */
export function CityForm({ value, onChangeAction, showCap = false }: CityPickerProps) {
    const [selectedCity, setSelectedCity] = useState<string>(value);
    const inputRef = useRef<HTMLInputElement>(null);

    const { cities, error, searchQuery, setSearchQuery } = useCitySearch();

    useEffect(() => {
        if (value) {
            setSearchQuery(value);
            setSelectedCity(value);
        }
    }, [value, setSearchQuery]);

    /**
     * Handles the selection of a city from the list.
     * Updates the selected city and triggers the `onChangeAction` callback with city and postal code (if `showCap` is true).
     * @param {CityFormData} city - The selected city object.
     * @param {React.MouseEvent} [e] - The mouse event that triggered the selection (optional).
     */
    const handleCitySelection = useCallback((city: CityFormData, e?: React.MouseEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
        setSelectedCity(city.nome);
        setSearchQuery(city.nome);
        onChangeAction(city.nome, showCap ? city.cap : undefined);
        inputRef.current?.focus();
    }, [onChangeAction, showCap, setSearchQuery]);

    // Custom hook for handling keyboard navigation
    const { highlightedIndex, setHighlightedIndex, handleKeyDown } = useKeyboardNavigation({
        filteredCities: cities,
        onCitySelect: handleCitySelection,
        searchQuery,
        setSearchQuery,
        setSelectedCity
    });

    /**
     * Handles changes to the search input field by updating the search query and resetting the selected city.
     * @param {ChangeEvent<HTMLInputElement>} e - The change event from the input field.
     */
    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchQuery(newValue);
        if (newValue !== selectedCity) {
            setSelectedCity("");
        }
        setHighlightedIndex(-1);
    }, [selectedCity, setSearchQuery, setHighlightedIndex]);

    return (
        <Card className="w-full rounded-[24px]">
            <CardContent className="p-4 space-y-4">
                <Input
                    ref={inputRef}
                    placeholder="Cerca città..."
                    className="w-full px-4 text-sm rounded-full"
                    type="search"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                />
                <div className="p-4 rounded-2xl border">
                    <CityList
                        cities={cities}
                        selectedCity={selectedCity}
                        highlightedIndex={highlightedIndex}
                        onCitySelect={handleCitySelection}
                        setHighlightedIndex={setHighlightedIndex}
                        error={error}
                    />
                </div>
            </CardContent>
        </Card>
    );
}