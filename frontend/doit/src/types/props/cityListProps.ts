import {CityFormData} from "@/types/form/city/cityFormData";
import React from "react";

/**
 * Props for the `CityList` component.
 *
 * The `CityList` component is used to display a list of cities, with functionality for
 * highlighting a city and selecting one. It manages the selection and highlighting of cities
 * and also handles potential errors.
 *
 * @param cities A list of cities to be displayed in the component.
 *
 * @param selectedCity The name of the currently selected city.
 *
 * @param highlightedIndex The index of the city currently highlighted in the list.
 *
 * @param onCitySelect A callback function to handle the selection of a city. It is called
 * with the selected city and an optional event object.
 *
 * @param setHighlightedIndex A function to update the highlighted city index.
 *
 * @param error (Optional) A string representing an error message, or `null` if there is no error.
 */
export interface CityListProps {
    cities: CityFormData[];
    selectedCity: string;
    highlightedIndex: number;
    onCitySelect: (city: CityFormData, e?: React.MouseEvent) => void;
    setHighlightedIndex: (index: number) => void;
    error: string | null;
}
