export interface CheckboxProps {
    readonly onChangeAction?: (selectedValues: string[]) => void;
    readonly initialSelected?: string[];
    readonly readOnly?: boolean;
    readonly isSingleSelect?: boolean;
}