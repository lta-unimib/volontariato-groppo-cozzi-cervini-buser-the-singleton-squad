/**
 * Props for the `Checkbox` component.
 *
 * The `Checkbox` component is used to allow the user to select one or more options.
 *
 * @param onChangeAction Optional. A callback function that is triggered when the selected values change.
 * This function receives the array of selected values as a parameter.
 *
 * @param initialSelected Optional. An array of selected values to initialize the checkbox with.
 * This can be used for pre-selecting certain options.
 *
 * @param readOnly Optional. A boolean that, when set to `true`, disables interaction with the checkbox,
 * making it non-editable. Default is `false`.
 *
 * @param isSingleSelect Optional. A boolean that, when set to `true`, restricts the checkbox to a single
 * selection (similar to a radio button). Default is `false`, allowing multiple selections.
 */
export interface CheckboxProps {
    readonly onChangeAction?: (selectedValues: string[]) => void;
    readonly initialSelected?: string[];
    readonly readOnly?: boolean;
    readonly isSingleSelect?: boolean;
}
