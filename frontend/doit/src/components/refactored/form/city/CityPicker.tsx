import React, { useRef, ChangeEvent, useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/refactored/Input";
import { CityList } from "./CityList";
import { useCitySearch } from "@/hooks/refactored/form/city/useCitySearch";
import { useKeyboardNavigation } from "@/hooks/refactored/form/city/useKeyboardNavigation";
import { CityPickerProps, CityFormData } from "@/types/refactored/form/city/cityFormData";

export function CityPicker({ value, onChangeAction, showCap = false }: CityPickerProps) {
    const [selectedCity, setSelectedCity] = useState<string>(value);
    const inputRef = useRef<HTMLInputElement>(null);

    const { cities, error, searchQuery, setSearchQuery } = useCitySearch();

    useEffect(() => {
        if (value) {
            setSearchQuery(value);
            setSelectedCity(value);
        }
    }, [value, setSearchQuery]);

    const handleCitySelection = useCallback((city: CityFormData, e?: React.MouseEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
        setSelectedCity(city.nome);
        setSearchQuery(city.nome);
        onChangeAction(city.nome, showCap ? city.cap : undefined);
        inputRef.current?.focus();
    }, [onChangeAction, showCap, setSearchQuery]);

    const { highlightedIndex, setHighlightedIndex, handleKeyDown } = useKeyboardNavigation({
        filteredCities: cities,
        onCitySelect: handleCitySelection,
        searchQuery,
        setSearchQuery,
        setSelectedCity
    });

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
