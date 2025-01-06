import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Button } from "@/components/ui/Button";

interface CityData {
    nome: string;
}

export function CityPicker() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [cities, setCities] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

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
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && filteredCities.length === 1) {
            handleCitySelection(filteredCities[0]);
        }
    };

    return (
        <Card className="w-full rounded-[24px]">
            <CardContent className="p-4 space-y-4">
                <Input
                    placeholder="Cerca città..."
                    className="w-full px-4 text-sm rounded-full"
                    type="search"
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="p-4 rounded-2xl border">
                    <ScrollArea className="h-32">
                        <div className="space-y-1 pr-4">
                            {error ? (
                                <p className="text-center text-red-500">{error}</p>
                            ) : filteredCities.length > 0 ? (
                                filteredCities.map((city) => (
                                    <Button
                                        key={city}
                                        variant={selectedCity === city ? "secondary" : "ghost"}
                                        className={`w-full justify-start pl-4 text-left font-normal text-sm rounded-full
        ${selectedCity === city ? 'bg-blue-500 text-white hover:bg-blue-500 hover:text-white' : ''}`}
                                        onClick={() => handleCitySelection(city)}
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