import { useState, useEffect } from 'react';
import { CityData } from '@/types/cityData';

export const useCitySearch = () => {
    const [cities, setCities] = useState<CityData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        let isMounted = true;

        const fetchCities = async () => {
            try {
                const response = await fetch(`https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni/lombardia`);

                if (!isMounted) return;

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
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

        fetchCities();
        return () => { isMounted = false; };
    }, []);

    const filteredCities = cities.filter((city) =>
        city.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
        cities: filteredCities,
        error,
        searchQuery,
        setSearchQuery
    };
};