"use client"

import { useRouter } from "next/navigation";

/**
 * Custom hook that provides a function to navigate back to the previous page.
 * It uses Next.js's `useRouter` to access the router's `back` method.
 *
 * @returns A function that, when called, will navigate the user back to the previous page in the browser history.
 */
export function useBack() {
    const router = useRouter();

    return () => {
        router.back();
    };
}
