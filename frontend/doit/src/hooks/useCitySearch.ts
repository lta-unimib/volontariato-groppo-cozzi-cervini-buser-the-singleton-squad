import { useState, useEffect } from 'react';
import { CityData } from '@/types/cityData';

export const useCitySearch = () => {
    const [cities, setCities] = useState<CityData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const fetchCities = async () => {
            try {
                const response = await fetch(
                    'https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni/lombardia',
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    setError(`HTTP error! status: ${response.status}, message: ${errorText}`);
                    return;
                }

                const data: CityData[] = await response.json();
                if (isMounted) {
                    setCities(data);
                }
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError' && isMounted) {
                    const errorMessage = err.message || "Failed to fetch cities. Please try again later.";
                    console.error("Error fetching cities:", err);
                    setError(errorMessage);
                }
            }
        };

        void fetchCities();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return { cities, error };
};