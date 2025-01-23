/**
 * @interface AddressFormData
 * Represents the address data.
 * Contains the street name, street number, city, postal code, and optional additional information.
 *
 * @param street The name of the street.
 * @param number The street number.
 * @param city The city where the address is located.
 * @param postalCode The postal code of the address.
 * @param additionalInfo (Optional) Any additional information about the address.
 */
export interface AddressFormData {
    street: string;
    number: string;
    city: string;
    postalCode: string;
    additionalInfo?: string;
}

export interface AddressDialogProps {
    onSaveAction: (data: AddressFormData) => void;
    initialAddress?: AddressFormData;
}