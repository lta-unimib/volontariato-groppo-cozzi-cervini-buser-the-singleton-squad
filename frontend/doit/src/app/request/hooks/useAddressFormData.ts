"use client";

import { useState } from 'react';
import { AddressData } from '@/types/addressData';

const initialAddressData: AddressData = {
    street: "",
    number: "",
    city: "",
    postalCode: "",
    additionalInfo: "",
};

export const useAddressFormData = () => {
    const [addressData, setAddressData] = useState<AddressData>(initialAddressData);

    const updateField = <K extends keyof AddressData>(
        field: K,
        value: AddressData[K]
    ) => {
        setAddressData(prev => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setAddressData(initialAddressData);
    };

    return {
        addressData,
        updateField,
        setAddressData,
        resetForm
    };
};