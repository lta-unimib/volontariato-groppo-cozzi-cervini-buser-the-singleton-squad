import { useState, useEffect } from 'react';
import { CityFormData } from '@/types/form/city/cityFormData';

/**
 * Custom hook to manage the city search functionality.
 * Fetches cities from an API and filters them based on the search query.
 * @returns - The city data, error, search query, and setter for the search query.
 */
export const useCitySearch = () => {
    const [cities, setCities] = useState<CityFormData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    /**
     * Fetches cities data from the API on mount and handles errors.
     * Clears cities and error when the component is unmounted.
     */
    useEffect(() => {
        const fetchCities = async () => {
            try {
                // Fetching city data from the API
                const response = await fetch(`https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni/lombardia`);

                // If the response is not OK, set the error state
                if (!response.ok) {
                    setError(`HTTP error! status: ${response.status}`);
                    return;
                }

                // Parsing the fetched data into CityFormData type
                const data: CityFormData[] = await response.json();
                setCities(data);
            } catch (err) {
                // Handling any errors during the fetch
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

        // Cleanup function to reset cities and error on unmount
        return () => {
            setCities([]);
            setError(null);
        };
    }, []);

    /**
     * Filters the cities list based on the search query.
     * @returns {CityFormData[]} - The filtered list of cities matching the search query.
     */
    const filteredCities = cities.filter((city) =>
        city.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
        cities: filteredCities,  // The filtered list of cities
        error,                   // Error message if fetching fails
        searchQuery,             // The current search query
        setSearchQuery           // Function to set the search query
    };
};