"use client"

import { API_BASE_LINK } from "@/utils/constants";

interface ApiResponse<T> {
    status: number;
    data?: T;
    message?: string;
}

export async function makeApiRequest<T>(
    endpoint: string,
    data: any
): Promise<ApiResponse<T>> {
    try {
        const fullUrl = `${API_BASE_LINK}${endpoint}`;
        console.log('🚀 Making API request to:', fullUrl);
        console.log('📦 Request payload:', JSON.stringify(data, null, 2));

        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        console.log('📫 Response status:', response.status);
        const responseData = await response.json();
        console.log('📄 Response data:', JSON.stringify(responseData, null, 2));

        return {
            status: response.status,
            data: responseData.data,
            message: responseData.message
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        console.error('💥 Exception caught:', errorMessage);
        return {
            status: 500,
            message: errorMessage
        };
    }
}