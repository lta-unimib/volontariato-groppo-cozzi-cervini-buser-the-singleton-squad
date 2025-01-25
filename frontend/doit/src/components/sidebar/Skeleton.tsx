import {cn} from "@/utils/cnUtils";

/**
 * `Skeleton` is a placeholder component used to display a loading state or skeleton screen.
 * It uses a pulsating animation to simulate content being loaded.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Optional additional class names to apply to the skeleton element.
 * @returns The rendered skeleton element.
 */
function Skeleton({
                      className,
                      ...props
                  }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted", className)}
            {...props}
        />
    );
}

export { Skeleton }
