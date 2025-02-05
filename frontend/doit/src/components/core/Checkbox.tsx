"use client";
import { Card, CardContent } from "@/components/core/Card";
import { Label } from "@/components/core/Label";
import { ScrollArea } from "@/components/core/ScrollArea";
import { CheckboxProps } from "@/types/props/core/checkboxProps";
import { useState, useCallback } from "react";
import { useCategories } from "@/hooks/useCategories";

export function Checkbox({
                             onChangeAction,
                             initialSelected = [],
                             readOnly = false,
                             isSingleSelect = false,
                         }: CheckboxProps) {
    const { categories } = useCategories();
    const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelected);

    const handleCheckboxChange = useCallback(
        (optionLabel: string) => {
            if (readOnly) return;

            let updatedSelected: string[];
            if (isSingleSelect) {
                updatedSelected = selectedOptions[0] === optionLabel ? [] : [optionLabel];
            } else {
                updatedSelected = selectedOptions.includes(optionLabel)
                    ? selectedOptions.filter((label) => label !== optionLabel)
                    : [...selectedOptions, optionLabel];
            }

            setSelectedOptions(updatedSelected);
            onChangeAction?.(updatedSelected);
        },
        [selectedOptions, readOnly, isSingleSelect, onChangeAction]
    );

    return (
        <Card className="w-full rounded-[24px]">
            <CardContent className="p-4">
                <ScrollArea className="h-28">
                    <div className="space-y-1">
                        {categories.map((option) => {
                            const isSelected = selectedOptions.includes(option.label);

                            return (
                                <div
                                    key={option.label}
                                    className={`flex items-center space-x-2 py-2 ${readOnly ? "" : "cursor-pointer"}`}
                                >
                                    <input
                                        type="checkbox"
                                        id={option.label}
                                        checked={isSelected}
                                        onChange={() => handleCheckboxChange(option.label)}
                                        className="hidden peer"
                                        disabled={readOnly}
                                        aria-label={option.label}
                                    />
                                    <label
                                        htmlFor={option.label}
                                        className={`relative w-4 h-4 rounded-full border ${
                                            readOnly
                                                ? isSelected
                                                    ? "border-primary"
                                                    : "border-gray-200"
                                                : "border-gray-200 hover:border-gray-300"
                                        } transition-colors peer-checked:border-primary flex items-center justify-center`}
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full transition-colors ${
                                                isSelected ? "bg-primary" : "bg-transparent"
                                            }`}
                                        />
                                    </label>
                                    <Label
                                        htmlFor={option.label}
                                        className={`${readOnly ? "" : "cursor-pointer"} text-sm font-normal`}
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}