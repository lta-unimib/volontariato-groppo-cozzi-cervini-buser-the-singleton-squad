import React, { useState, useEffect, KeyboardEvent, ChangeEvent, useRef } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Button } from "@/components/ui/Button";

interface CityData {
    nome: string;
    cap: string;
}

interface CityPickerProps {
    value: string;
    onChange: (selectedCity: string, selectedCap?: string) => void;
    showCap?: boolean;
}

export function CityPicker({ value, onChange, showCap = false }: CityPickerProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>(value);
    const [cities, setCities] = useState<CityData[]>([]);
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
                setCities(data);
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
        city.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCitySelection = (city: CityData, e?: React.MouseEvent) => {
        e?.preventDefault();
        e?.stopPropagation();

        setSelectedCity(city.nome);
        setSearchQuery(city.nome);
        setHighlightedIndex(-1);
        onChange(city.nome, showCap ? city.cap : undefined);
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
    });

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
        if (index >= 0 && index < filteredCities.length && filteredCities[index].nome !== selectedCity) {
            setHighlightedIndex(index);
        }
    };

    const handleMouseLeave = () => {
        setHighlightedIndex(-1);
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
                                <p className="text-center text-destructive">{error}</p>
                            ) : filteredCities.length > 0 ? (
                                filteredCities.map((city, index) => (
                                    <Button
                                        key={city.nome}
                                        type="button"
                                        variant={selectedCity === city.nome ? "secondary" : "ghost"}
                                        className={`w-full justify-start pl-4 text-left font-normal text-sm rounded-full
                                            ${selectedCity === city.nome ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : ''}
                                            ${highlightedIndex === index ? 'bg-secondary dark:bg-accent' : ''}`}
                                        onClick={(e) => handleCitySelection(city, e)}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {city.nome}
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