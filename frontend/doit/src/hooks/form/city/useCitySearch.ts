import { useState, useEffect } from 'react';
import { CityFormData } from '@/types/form/city/cityFormData';

export const useCitySearch = () => {
    const [cities, setCities] = useState<CityFormData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(`https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni/lombardia`);

                if (!response.ok) {
                    setError(`HTTP error! status: ${response.status}`);
                    return;
                }

                const data: CityFormData[] = await response.json();
                setCities(data);
            } catch (err) {
                const errorMessage = err instanceof Error
                    ? err.message
                    : "Failed to fetch cities. Please try again later.";
                console.error("Error fetching cities:", err);
                setError(errorMessage);
            }
        };

        fetchCities().catch(err => {
            console.error('Error during fetching cities:', err);
        });

        return () => {
            setCities([]);
            setError(null);
        };
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
