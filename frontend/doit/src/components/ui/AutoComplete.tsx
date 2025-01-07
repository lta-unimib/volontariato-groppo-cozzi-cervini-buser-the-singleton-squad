"use client";
import AddressAutoComplete, {
    AddressType,
} from "@/components/ui/address-autocomplete"
import { useState, useCallback } from "react";

interface AutocompleteComponentProps {
    onChange: (selectedValues: string[]) => void;
    key?: string;
}

interface LabeledAddress {
    label: string;
    value: string;
}

export const AutocompleteComponent = ({ onChange }: AutocompleteComponentProps) => {
    const [address, setAddress] = useState<AddressType>({
        address1: "",
        address2: "",
        formattedAddress: "",
        city: "",
        region: "",
        postalCode: "",
        country: "",
        lat: 0,
        lng: 0,
    });
    const [searchInput, setSearchInput] = useState("");

    // Memoize the address change handler
    const handleAddressChange = useCallback((newAddress: AddressType) => {
        setAddress(newAddress);

        if (newAddress.formattedAddress) {
            const labeledAddressComponents: LabeledAddress[] = [
                {
                    label: "Indirizzo Completo",
                    value: newAddress.formattedAddress
                }
            ];

            // Add additional components only if they exist and aren't empty
            if (newAddress.address1) {
                labeledAddressComponents.push({
                    label: "Indirizzo 1",
                    value: newAddress.address1
                });
            }

            if (newAddress.address2) {
                labeledAddressComponents.push({
                    label: "Indirizzo 2",
                    value: newAddress.address2
                });
            }

            if (newAddress.city) {
                labeledAddressComponents.push({
                    label: "Città",
                    value: newAddress.city
                });
            }

            if (newAddress.region) {
                labeledAddressComponents.push({
                    label: "Regione",
                    value: newAddress.region
                });
            }

            if (newAddress.postalCode) {
                labeledAddressComponents.push({
                    label: "CAP",
                    value: newAddress.postalCode
                });
            }

            if (newAddress.country) {
                labeledAddressComponents.push({
                    label: "Paese",
                    value: newAddress.country
                });
            }

            // Convert to array of strings with labels prefixed
            const formattedArray = labeledAddressComponents.map(
                component => `${component.label}: ${component.value}`
            );

            onChange(formattedArray);
        }
    }, [onChange]);

    return (
        <AddressAutoComplete
            address={address}
            setAddress={handleAddressChange}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            dialogTitle="Enter Address"
        />
    );
};