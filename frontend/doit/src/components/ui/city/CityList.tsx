import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { CityData } from '@/types/cityData';

interface CityListProps {
    cities: CityData[];
    selectedCity: string;
    highlightedIndex: number;
    onCitySelect: (city: CityData, e?: React.MouseEvent) => void;
    setHighlightedIndex: (index: number) => void;
    error: string | null;
}

export function CityList({
                             cities,
                             selectedCity,
                             highlightedIndex,
                             onCitySelect,
                             setHighlightedIndex,
                             error
                         }: CityListProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);

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
                        <Button
                            key={city.nome}
                            type="button"
                            variant={isSelected ? "secondary" : "ghost"}
                            className={`w-full justify-start pl-4 text-left font-normal text-sm rounded-full
                                ${isSelected ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : ''}
                                ${shouldHighlight ? 'bg-secondary dark:bg-accent' : ''}`}
                            onClick={(e) => onCitySelect(city, e)}
                            onMouseEnter={() => !isSelected && setHighlightedIndex(index)}
                            onMouseLeave={() => !isSelected && setHighlightedIndex(-1)}
                        >
                            {city.nome}
                        </Button>
                    );
                })}
            </div>
        </ScrollArea>
    );
}