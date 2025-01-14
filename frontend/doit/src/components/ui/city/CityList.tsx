import { Button } from "@/components/ui/Button";
import { CityData } from '@/types/cityData';
import React from "react";

interface CityListProps {
    cities: CityData[];
    selectedCity: string;
    highlightedIndex: number;
    onCitySelect: (city: CityData, e?: React.MouseEvent) => void;
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
}

export const CityList: React.FC<CityListProps> = ({
                                                      cities,
                                                      selectedCity,
                                                      highlightedIndex,
                                                      onCitySelect,
                                                      onMouseEnter,
                                                      onMouseLeave
                                                  }) => {
    if (cities.length === 0) {
        return <p className="text-center text-muted-foreground py-4 text-sm">Nessuna città trovata</p>;
    }

    return (
        <>
            {cities.map((city, index) => (
                <Button
                    key={city.nome}
                    type="button"
                    variant={selectedCity === city.nome ? "secondary" : "ghost"}
                    className={`w-full justify-start pl-4 text-left font-normal text-sm rounded-full
                        ${selectedCity === city.nome ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : ''}
                        ${highlightedIndex === index ? 'bg-secondary dark:bg-accent' : ''}`}
                    onClick={(e) => onCitySelect(city, e)}
                    onMouseEnter={() => onMouseEnter(index)}
                    onMouseLeave={onMouseLeave}
                >
                    {city.nome}
                </Button>
            ))}
        </>
    );
};