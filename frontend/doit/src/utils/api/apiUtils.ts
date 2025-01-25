"use client"

import { API_BASE_LINK } from "@/utils/constants";

/**
 * Generic API response type.
 */
interface ApiResponse<T> {
    status: number;
    data?: T;
    message?: string;
}

/**
 * Makes a POST request to the specified endpoint.
 *
 * @param endpoint The API endpoint to make the request to.
 * @param data Optional data to send in the request body.
 * @returns A promise that resolves to the API response.
 */
export async function makePostRequest<T>(
    endpoint: string,
    data?: unknown,
): Promise<ApiResponse<T>> {
    try {
        const token = sessionStorage.getItem('authToken');

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };

        const response = await fetch(`${API_BASE_LINK}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        return {
            status: response.status,
            data: responseData.data,
            message: responseData.message
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

        return {
            status: 500,
            message: errorMessage
        };
    }
}

/**
 * Makes a GET request to the specified endpoint.
 *
 * @param endpoint The API endpoint to make the request to.
 * @returns A promise that resolves to the API response.
 */
export async function makeGetRequest<T>(
    endpoint: string,
): Promise<ApiResponse<T>> {
    try {
        const token = sessionStorage.getItem('authToken');

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };

        const response = await fetch(`${API_BASE_LINK}${endpoint}`, {
            method: 'GET',
            headers
        });

        const responseData = await response.json();

        return {
            status: response.status,
            data: responseData.data,
            message: responseData.message
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

        return {
            status: 500,
            message: errorMessage
        };
    }
}

/**
 * Makes a PUT or PATCH request to the specified endpoint.
 *
 * @param endpoint The API endpoint to make the request to.
 * @param data Optional data to send in the request body.
 * @param method The HTTP method (PUT or PATCH). Default is PUT.
 * @returns A promise that resolves to the API response.
 */
export async function makeUpdateRequest<T>(
    endpoint: string,
    data?: unknown,
    method: 'PUT' | 'PATCH' = 'PUT',
): Promise<ApiResponse<T>> {
    try {
        const token = sessionStorage.getItem('authToken');

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };

        const response = await fetch(`${API_BASE_LINK}${endpoint}`, {
            method,
            headers,
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        return {
            status: response.status,
            data: responseData.data,
            message: responseData.message
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

        return {
            status: 500,
            message: errorMessage
        };
    }
}

/**
 * Makes a DELETE request to the specified endpoint.
 *
 * @param endpoint The API endpoint to make the request to.
 * @param data Optional data to send in the request body.
 * @returns A promise that resolves to the API response.
 */
export async function makeDeleteRequest<T>(
    endpoint: string,
    data?: unknown,
): Promise<ApiResponse<T>> {
    try {
        const token = sessionStorage.getItem('authToken');

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };

        const response = await fetch(`${API_BASE_LINK}${endpoint}`, {
            method: 'DELETE',
            headers,
            body: data ? JSON.stringify(data) : undefined
        });

        const responseData = await response.json();

        return {
            status: response.status,
            data: responseData.data,
            message: responseData.message
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

        return {
            status: 500,
            message: errorMessage
        };
    }
}