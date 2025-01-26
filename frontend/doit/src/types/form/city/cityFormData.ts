
export interface UseKeyboardNavigationProps {
    filteredCities: CityFormData[];
    onCitySelect: (city: CityFormData) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setSelectedCity: (city: string) => void;
}


export interface CityFormData {
    readonly nome: string;
    readonly cap: string;
}

export interface CityPickerProps {
    readonly value: string;
    readonly onChangeAction: (selectedCity: string, selectedCap?: string) => void;
    readonly showCap?: boolean;
}