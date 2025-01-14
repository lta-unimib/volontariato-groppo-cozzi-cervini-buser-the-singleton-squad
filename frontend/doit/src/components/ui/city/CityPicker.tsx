"use client";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { CityPickerProps, CityData } from '@/types/cityData';
import { useCitySearch } from '@/hooks/useCitySearch';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { CityList } from '@/components/ui/city/CityList';

export function CityPicker({ value, onChangeAction, showCap = false }: CityPickerProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>(value);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { cities, error } = useCitySearch();

    const filteredCities = cities.filter((city) =>
        city.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCitySelection = (city: CityData, e?: React.MouseEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
        setSelectedCity(city.nome);
        setSearchQuery(city.nome);
        setHighlightedIndex(-1);
        onChangeAction(city.nome, showCap ? city.cap : undefined);
        inputRef.current?.focus();
    };

    const { highlightedIndex, setHighlightedIndex, handleKeyDown } = useKeyboardNavigation({
        filteredCities,
        handleCitySelection,
        setSearchQuery,
        setSelectedCity
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchQuery(newValue);
        if (newValue !== selectedCity) {
            setSelectedCity("");
        }
        setHighlightedIndex(-1);
    };

    useEffect(() => {
        if (highlightedIndex >= 0 && scrollAreaRef.current) {
            const buttons = scrollAreaRef.current.getElementsByTagName('button');
            const highlightedButton = buttons[highlightedIndex];

            if (highlightedButton) {
                highlightedButton.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth'
                });
            }
        }
    }, [highlightedIndex]);

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
                    <ScrollArea className="h-32">
                        <div className="space-y-1 pr-4" ref={scrollAreaRef}>
                            {error ? (
                                <p className="text-center text-destructive">{error}</p>
                            ) : (
                                <CityList
                                    cities={filteredCities}
                                    selectedCity={selectedCity}
                                    highlightedIndex={highlightedIndex}
                                    onCitySelect={handleCitySelection}
                                    onMouseEnter={(index) => setHighlightedIndex(index)}
                                    onMouseLeave={() => setHighlightedIndex(-1)}
                                />
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </CardContent>
        </Card>
    );
}