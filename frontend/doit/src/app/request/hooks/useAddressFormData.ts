"use client";

import { useState } from 'react';
import { AddressFormData } from '@/types/refactored/model/addressFormData';

const initialAddressData: AddressFormData = {
    street: "",
    number: "",
    city: "",
    postalCode: "",
    additionalInfo: "",
};

export const useAddressFormData = () => {
    const [addressData, setAddressData] = useState<AddressFormData>(initialAddressData);

    const updateField = <K extends keyof AddressFormData>(
        field: K,
        value: AddressFormData[K]
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