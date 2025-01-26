"use client"

import { useRouter } from "next/navigation";

export function useBack() {
    const router = useRouter();

    return () => {
        router.back();
    };
}
