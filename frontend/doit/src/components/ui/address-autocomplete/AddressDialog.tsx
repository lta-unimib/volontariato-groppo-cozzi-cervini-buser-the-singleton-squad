"use client";

import { Button } from "@/components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import type React from "react";
import { type FormEvent, useEffect, useState } from "react";
import { type ZodError, z } from "zod";
import { FormMessages } from "@/components/ui/FormMessage";
import { Loader2 } from "lucide-react";
import { AddressType } from "@/components/ui/address-autocomplete/index";

interface AddressDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    address: AddressType;
    setAddress: (address: AddressType) => void;
    adrAddress: string;
    dialogTitle: string;
    isLoading: boolean;
}

interface AddressFields {
    address1?: string;
    address2?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string; // Added country field
}

export function createAddressSchema(address: AddressFields) {
    let schema = {};

    if (address.address1 !== "") {
        schema = {
            ...schema,
            address1: z.string().min(1, {
                message: "Indirizzo 1 è richiesto",
            }),
        };
    }

    schema = {
        ...schema,
        address2: z.string().optional(),
    };

    if (address.city !== "") {
        schema = {
            ...schema,
            city: z.string().min(1, {
                message: "Città è richiesto",
            }),
        };
    }

    if (address.region !== "") {
        schema = {
            ...schema,
            region: z.string().min(1, {
                message: "Stato è richiesto",
            }),
        };
    }

    if (address.postalCode !== "") {
        schema = {
            ...schema,
            postalCode: z.string().min(1, {
                message: "Codice postale è richiesto",
            }),
        };
    }

    if (address.country !== "") {
        schema = {
            ...schema,
            country: z.string().min(1, {
                message: "Paese è richiesto",
            }),
        };
    }

    return z.object(schema);
}

export default function AddressDialog(
    props: React.PropsWithChildren<AddressDialogProps>,
) {
    const {
        children,
        dialogTitle,
        open,
        setOpen,
        address,
        setAddress,
        adrAddress,
        isLoading,
    } = props;

    const [address1, setAddress1] = useState(address.address1 || "");
    const [address2, setAddress2] = useState(address.address2 || "");
    const [city, setCity] = useState(address.city || "");
    const [region, setRegion] = useState(address.region || "");
    const [postalCode, setPostalCode] = useState(address.postalCode || "");
    const [country, setCountry] = useState(address.country || ""); // Added country
    const [errorMap, setErrorMap] = useState<Record<string, string>>({});

    const addressSchema = createAddressSchema({
        address1,
        address2,
        city,
        region,
        postalCode,
        country, // Added country for validation
    });

    // Function to update address components as an array
    function handleAddressChange() {
        const addressArray = [address1, address2, city, region, postalCode, country];
        console.log("Indirizzo come array:", addressArray); // Log for debugging
        return addressArray;
    }

    // Function to update and format the address string
    function updateAndFormatAddress(
        addressString: string,
        addressComponents: {
            "street-address": string;
            address2: string;
            locality: string;
            region: string;
            "postal-code": string;
            country: string;
        },
    ) {
        let updatedAddressString = addressString;

        Object.entries(addressComponents).forEach(([key, value]) => {
            if (key !== "address2") {
                const regex = new RegExp(`(<span class="${key}">)[^<]*(</span>)`, "g");
                updatedAddressString = updatedAddressString.replace(
                    regex,
                    `$1${value}$2`,
                );
            }
        });

        updatedAddressString = updatedAddressString.replace(/<\/?span[^>]*>/g, "");

        if (addressComponents.address2) {
            const address1Regex = new RegExp(`${addressComponents["street-address"]}`);
            updatedAddressString = updatedAddressString.replace(
                address1Regex,
                `${addressComponents["street-address"]}, ${addressComponents.address2}`,
            );
        }

        updatedAddressString = updatedAddressString
            .replace(/,\s*,/g, ",")
            .trim()
            .replace(/\s\s+/g, " ")
            .replace(/,\s*$/, "");

        return updatedAddressString;
    }

    // Handle form submission and validation
    const handleSave = (e: FormEvent) => {
        e.preventDefault();
        try {
            addressSchema.parse({
                address1,
                address2,
                city,
                region,
                postalCode,
                country, // Added country validation
            });
        } catch (error) {
            const zodError = error as ZodError;
            const errorMap = zodError.flatten().fieldErrors;

            setErrorMap({
                address1: errorMap.address1?.[0] ?? "",
                address2: errorMap.address2?.[0] ?? "",
                city: errorMap.city?.[0] ?? "",
                region: errorMap.region?.[0] ?? "",
                postalCode: errorMap.postalCode?.[0] ?? "",
                country: errorMap.country?.[0] ?? "", // Added country error handling
            });

            return;
        }

        if (
            address2 !== address.address2 ||
            postalCode !== address.postalCode ||
            address1 !== address.address1 ||
            city !== address.city ||
            region !== address.region ||
            country !== address.country // Added country change check
        ) {
            const newFormattedAddress = updateAndFormatAddress(adrAddress, {
                "street-address": address1,
                address2,
                locality: city,
                region,
                "postal-code": postalCode,
                country,
            });

            setAddress({
                ...address,
                city,
                region,
                address2,
                address1,
                postalCode,
                country,
                formattedAddress: newFormattedAddress,
            });
        }
        setOpen(false);
    };

    useEffect(() => {
        setAddress1(address.address1 || "");
        setAddress2(address.address2 || "");
        setPostalCode(address.postalCode || "");
        setCity(address.city || "");
        setRegion(address.region || "");
        setCountry(address.country || ""); // Added country reset

        if (!open) {
            setErrorMap({});
        }
    }, [address, open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="h-52 flex items-center justify-center">
                        <Loader2 className="size-6 animate-spin" />
                    </div>
                ) : (
                    <form onSubmit={handleSave}>
                        <div className="space-y-4 py-7">
                            <div className="space-y-0.5">
                                <Label htmlFor="address1">Indirizzo 1</Label>
                                <Input
                                    value={address1}
                                    onChange={(e) => {
                                        setAddress1(e.currentTarget.value);
                                        handleAddressChange();
                                    }}
                                    id="address1"
                                    name="address1"
                                    placeholder="Indirizzo 1"
                                />
                                {errorMap.address1 && (
                                    <FormMessages
                                        type="error"
                                        className="pt-1 text-sm"
                                        messages={[errorMap.address1]}
                                    />
                                )}
                            </div>

                            <div className="space-y-0.5">
                                <Label htmlFor="address2">
                                    Indirizzo 2{" "}
                                    <span className="text-xs text-secondary-foreground">
                                        (Opzionale)
                                    </span>
                                </Label>
                                <Input
                                    value={address2}
                                    onChange={(e) => {
                                        setAddress2(e.currentTarget.value);
                                        handleAddressChange();
                                    }}
                                    id="address2"
                                    name="address2"
                                    placeholder="Indirizzo 2"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 space-y-0.5">
                                    <Label htmlFor="city">Città</Label>
                                    <Input
                                        value={city}
                                        onChange={(e) => {
                                            setCity(e.currentTarget.value);
                                            handleAddressChange();
                                        }}
                                        id="city"
                                        name="city"
                                        placeholder="Città"
                                    />
                                    {errorMap.city && (
                                        <FormMessages
                                            type="error"
                                            className="pt-1 text-sm"
                                            messages={[errorMap.city]}
                                        />
                                    )}
                                </div>
                                <div className="flex-1 space-y-0.5">
                                    <Label htmlFor="region">Regione</Label>
                                    <Input
                                        value={region}
                                        onChange={(e) => {
                                            setRegion(e.currentTarget.value);
                                            handleAddressChange();
                                        }}
                                        id="region"
                                        name="region"
                                        placeholder="Regione"
                                    />
                                    {errorMap.region && (
                                        <FormMessages
                                            type="error"
                                            className="pt-1 text-sm"
                                            messages={[errorMap.region]}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 space-y-0.5">
                                    <Label htmlFor="postalCode">Codice postale</Label>
                                    <Input
                                        value={postalCode}
                                        onChange={(e) => {
                                            setPostalCode(e.currentTarget.value);
                                            handleAddressChange();
                                        }}
                                        id="postalCode"
                                        name="postalCode"
                                        placeholder="Codice postale"
                                    />
                                    {errorMap.postalCode && (
                                        <FormMessages
                                            type="error"
                                            className="pt-1 text-sm"
                                            messages={[errorMap.postalCode]}
                                        />
                                    )}
                                </div>
                                <div className="flex-1 space-y-0.5">
                                    <Label htmlFor="country">Paese</Label>
                                    <Input
                                        value={country}
                                        onChange={(e) => {
                                            setCountry(e.currentTarget.value);
                                            handleAddressChange();
                                        }}
                                        id="country"
                                        name="country"
                                        placeholder="Paese"
                                    />
                                    {errorMap.country && (
                                        <FormMessages
                                            type="error"
                                            className="pt-1 text-sm"
                                            messages={[errorMap.country]}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="submit" variant="default">
                                Salva
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
