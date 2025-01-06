import React, { useState, useEffect, KeyboardEvent, ChangeEvent, useRef } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Button } from "@/components/ui/Button";

interface CityData {
    nome: string;
}

interface CityPickerProps {
    onChange: (selectedCity: string) => void;
}

export function CityPicker({ onChange }: CityPickerProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [cities, setCities] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchCities = async () => {
            try {
                const response = await fetch(`https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni/lombardia`);
                if (!isMounted) return;
                if (!response.ok) {
                    setError(`HTTP error! status: ${response.status}`);
                    return;
                }
                const data: CityData[] = await response.json();
                if (!isMounted) return;
                const nomi: string[] = data.map((item: CityData) => item.nome);
                setCities(nomi);
            } catch (err) {
                if (!isMounted) return;
                const errorMessage = err instanceof Error
                    ? err.message
                    : "Failed to fetch cities. Please try again later.";
                console.error("Error fetching cities:", err);
                setError(errorMessage);
            }
        };

        fetchCities().catch(err => {
            if (isMounted) {
                const errorMessage = err instanceof Error
                    ? err.message
                    : "Failed to initialize city fetching. Please try again later.";
                console.error("Error initializing fetchCities:", err);
                setError(errorMessage);
            }
        });

        return () => { isMounted = false; };
    }, []);

    const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCitySelection = (city: string) => {
        setSelectedCity(city);
        setSearchQuery(city);
        setHighlightedIndex(-1);
        onChange(city); // Pass selected city to parent
        inputRef.current?.focus();
    };

    const scrollHighlightedIntoView = () => {
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
    };

    useEffect(() => {
        scrollHighlightedIntoView();
    }, [highlightedIndex]);

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

    const handleMouseEnter = (index: number) => {
        if (index >= 0 && index < filteredCities.length) {
            setHighlightedIndex(index);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchQuery(newValue);
        if (newValue !== selectedCity) {
            setSelectedCity("");
        }
        setHighlightedIndex(-1);
    };

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
                                <p className="text-center text-red-500">{error}</p>
                            ) : filteredCities.length > 0 ? (
                                filteredCities.map((city, index) => (
                                    <Button
                                        key={city}
                                        variant={selectedCity === city ? "secondary" : "ghost"}
                                        className={`w-full justify-start pl-4 text-left font-normal text-sm rounded-full
                                            ${selectedCity === city ? 'bg-blue-500  hover:bg-blue-500 hover:text-white' : ''}
                                            ${highlightedIndex === index ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                                        onClick={() => handleCitySelection(city)}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                    >
                                        {city}
                                    </Button>
                                ))
                            ) : (
                                <p className="text-center text-muted-foreground py-4 text-sm">
                                    Nessuna città trovata
                                </p>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </CardContent>
        </Card>
    );
}

export default CityPicker;