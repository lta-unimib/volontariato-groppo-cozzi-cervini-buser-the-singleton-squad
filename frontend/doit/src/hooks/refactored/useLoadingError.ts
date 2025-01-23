import { useState } from 'react';
import { LoadingErrorState } from "@/types/refactored/login/loginTypes";

/**
 * Custom hook to manage loading and error states for asynchronous operations.
 *
 * @returns An object containing loading state, error message, and methods to update them
 */

export const useLoadingError = () => {
    const [state, setState] = useState<LoadingErrorState>({
        loading: false,
        error: null,
    });

    const setLoading = (isLoading: boolean) => setState(prev => ({ ...prev, loading: isLoading }));
    const setError = (errorMessage: string | null) => setState(prev => ({ ...prev, error: errorMessage }));

    return {
        loading: state.loading,
        error: state.error,
        setLoading,
        setError,
    };
};
