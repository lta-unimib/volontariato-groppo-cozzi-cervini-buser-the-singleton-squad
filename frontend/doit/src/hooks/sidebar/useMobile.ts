import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Custom hook that detects whether the current screen size is considered "mobile" based on the window width.
 * It listens to window resize events to update the state whenever the screen size crosses the mobile breakpoint.
 *
 * @returns A boolean indicating whether the screen width is less than the defined mobile breakpoint (768px).
 */
export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

        return () => mql.removeEventListener("change", onChange);
    }, []);

    return !!isMobile;
}
