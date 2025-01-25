import React, { useRef, useEffect, useMemo } from 'react';
import { Button } from "@/components/core/Button";
import { ScrollArea } from "@/components/core/ScrollArea";
import { CityFormData } from '@/types/form/city/cityFormData';
import { CityListProps } from "@/types/props/cityListProps";

/**
 * A button component representing each city in the city list.
 * It is highlighted when hovered and is styled based on selection state.
 * @param {CityFormData} city - The city data object.
 * @param index - The index of the city in the list.
 * @param isSelected - Flag to indicate if the city is selected.
 * @param shouldHighlight - Flag to indicate if the city button should be highlighted.
 * @param onCitySelect - The callback function to handle city selection.
 * @param setHighlightedIndex - The function to set the index of the highlighted city.
 */
const CityButton = ({
                        city,
                        index,
                        isSelected,
                        shouldHighlight,
                        onCitySelect,
                        setHighlightedIndex
                    }: {
    city: CityFormData;
    index: number;
    isSelected: boolean;
    shouldHighlight: boolean;
    onCitySelect: (city: CityFormData, e?: React.MouseEvent) => void;
    setHighlightedIndex: (index: number) => void;
}) => {
    const buttonClass = useMemo(() => {
        return `w-full justify-start pl-4 text-left font-normal text-sm rounded-full
            ${isSelected ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : ''}
            ${shouldHighlight ? 'bg-secondary dark:bg-accent' : ''}`;
    }, [isSelected, shouldHighlight]);

    return (
        <Button
            key={city.nome}
            type="button"
            variant={isSelected ? "secondary" : "ghost"}
            className={buttonClass}
            onClick={(e) => onCitySelect(city, e)}
            onMouseEnter={() => !isSelected && setHighlightedIndex(index)}
            onMouseLeave={() => !isSelected && setHighlightedIndex(-1)}
            aria-selected={isSelected}
        >
            {city.nome}
        </Button>
    );
};

/**
 * Component to display a list of cities, with the ability to select and highlight cities.
 * It uses the `CityButton` component to represent each city and allows for smooth scrolling when highlighting.
 * @param cities - The list of cities to display.
 * @param selectedCity - The name of the currently selected city.
 * @param highlightedIndex - The index of the currently highlighted city.
 * @param onCitySelect - The callback function to handle city selection.
 * @param setHighlightedIndex - The function to set the index of the highlighted city.
 * @param error - An error message if applicable.
 * @returns The rendered list of cities.
 */
export function CityList({
                             cities,
                             selectedCity,
                             highlightedIndex,
                             onCitySelect,
                             setHighlightedIndex,
                             error
                         }: CityListProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Scroll the highlighted city button into view
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

    if (error) {
        return <p className="text-center text-destructive">{error}</p>;
    }

    if (cities.length === 0) {
        return <p className="text-center text-muted-foreground py-4 text-sm">Nessuna città trovata</p>;
    }

    return (
        <ScrollArea className="h-32">
            <div className="space-y-1 pr-4" ref={scrollAreaRef}>
                {cities.map((city, index) => {
                    const isSelected = selectedCity === city.nome;
                    const shouldHighlight = !isSelected && highlightedIndex === index;

                    return (
                        <CityButton
                            key={city.nome}
                            city={city}
                            index={index}
                            isSelected={isSelected}
                            shouldHighlight={shouldHighlight}
                            onCitySelect={onCitySelect}
                            setHighlightedIndex={setHighlightedIndex}
                        />
                    );
                })}
            </div>
        </ScrollArea>
    );
}