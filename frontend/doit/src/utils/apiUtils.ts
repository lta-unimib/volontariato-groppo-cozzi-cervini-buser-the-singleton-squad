"use client"

import { API_BASE_LINK } from "@/utils/constants";

interface ApiResponse<T> {
    status: number;
    data?: T;
    message?: string;
}

export async function makeApiRequest<T>(
    endpoint: string,
    data: any,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        // Debug: Log the token from sessionStorage
        const token = sessionStorage.getItem('authToken');
        console.log('Auth Token:', token);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        // Debug: Log the full request details
        console.log('Making API request to:', `${API_BASE_LINK}${endpoint}`);
        console.log('Request Headers:', headers);
        console.log('Request Body:', JSON.stringify(data));

        const response = await fetch(`${API_BASE_LINK}${endpoint}`, {
            method: 'POST',
            ...options,
            headers,
            body: JSON.stringify(data)
        });

        // Debug: Log the response status and data
        const responseData = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', responseData);

        return {
            status: response.status,
            data: responseData.data,
            message: responseData.message
        };
    } catch (error) {
        // Debug: Log the error message
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        console.error('Error occurred:', errorMessage);

        return {
            status: 500,
            message: errorMessage
        };
    }
}