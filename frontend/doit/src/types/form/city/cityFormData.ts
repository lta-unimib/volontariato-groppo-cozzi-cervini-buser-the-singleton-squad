/**
 * Props for the `useKeyboardNavigation` custom hook.
 *
 * This hook is used for handling keyboard navigation when selecting a city from a filtered list.
 *
 * @param filteredCities The list of cities that match the search query.
 * @param onCitySelect Callback function to handle the selection of a city.
 * @param searchQuery The current search query entered by the user.
 * @param setSearchQuery Callback function to update the search query.
 * @param setSelectedCity Callback function to update the selected city.
 */
export interface UseKeyboardNavigationProps {
    filteredCities: CityFormData[];
    onCitySelect: (city: CityFormData) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setSelectedCity: (city: string) => void;
}

/**
 * Represents a city's data.
 *
 * This interface is used to define the structure of a city object, which includes its name and postal code.
 *
 * @param nome The name of the city.
 * @param cap The postal code (CAP) of the city.
 */
export interface CityFormData {
    readonly nome: string;
    readonly cap: string;
}

/**
 * Props for the `CityPicker` component.
 *
 * The `CityPicker` component is used to allow users to select a city from a list.
 *
 * @param value The currently selected city.
 * @param onChangeAction Callback function to handle the change of selected city and optionally the postal code.
 * @param showCap Optional flag to indicate whether the postal code (CAP) should be displayed.
 */
export interface CityPickerProps {
    readonly value: string;
    readonly onChangeAction: (selectedCity: string, selectedCap?: string) => void;
    readonly showCap?: boolean;
}