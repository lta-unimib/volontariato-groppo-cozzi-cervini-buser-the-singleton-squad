export interface CityData {
    readonly nome: string;
    readonly cap: string;
}

export interface CityPickerProps {
    readonly value: string;
    readonly onChangeAction: (selectedCity: string, selectedCap?: string) => void;
    readonly showCap?: boolean;
}