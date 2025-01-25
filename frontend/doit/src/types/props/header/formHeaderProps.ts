/**
 * Props for the `FormHeader` component.
 *
 * The `FormHeader` component is used to display the title and subtitle of a form along with a back navigation button.
 *
 * @param title The main title of the form header. This is typically displayed at the top of the form to give users
 * context about the form's purpose.
 *
 * @param subtitle The secondary description or subtitle that provides additional context to the form title.
 * This can be used to explain the form or give instructions to the user.
 *
 * @param onBack A callback function that gets triggered when the back button is clicked. This is commonly used
 * for navigation purposes, like returning to the previous page or form step.
 */
export interface FormHeaderProps {
    readonly title: string;
    readonly subtitle: string;
    readonly onBack: () => void;
}
