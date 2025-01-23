"use client"

import { API_BASE_LINK } from "@/utils/constants";

interface ApiResponse<T> {
    status: number;
    data?: T;
    message?: string;
}

export async function makePostRequest<T>(
    endpoint: string,
    data?: unknown,
    options: RequestInit = {}//TODO REMOVE USE DATA INSTEAD
): Promise<ApiResponse<T>> {
    try {
        const token = sessionStorage.getItem('authToken');
        console.log('Auth Token:', token);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        console.log('Making API request to:', `${API_BASE_LINK}${endpoint}`);
        console.log('Request Headers:', headers);
        console.log('Request Body:', JSON.stringify(data));

        const response = await fetch(`${API_BASE_LINK}${endpoint}`, {
            method: 'POST',
            ...options,
            headers,
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', responseData);

        return {
            status: response.status,
            data: responseData.data,
            message: responseData.message
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        console.error('Error occurred:', errorMessage);

        return {
            status: 500,
            message: errorMessage
        };
    }
}

export async function makeGetRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const token = sessionStorage.getItem('authToken');
        console.log('Auth Token:', token);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        console.log('Making GET request to:', `${API_BASE_LINK}${endpoint}`);
        console.log('Request Headers:', headers);

        const response = await fetch(`${API_BASE_LINK}${endpoint}`, {
            method: 'GET',
            ...options,
            headers
        });

        const responseData = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', responseData);

        return {
            status: response.status,
            data: responseData.data,
            message: responseData.message
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        console.error('Error occurred:', errorMessage);

        return {
            status: 500,
            message: errorMessage
        };
    }
}

export async function makeUpdateRequest<T>(
    endpoint: string,
    data?: unknown,
    method: 'PUT' | 'PATCH' = 'PUT',
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const token = sessionStorage.getItem('authToken');
        console.log('Auth Token:', token);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        console.log(`Making ${method} request to:`, `${API_BASE_LINK}${endpoint}`);
        console.log('Request Headers:', headers);
        console.log('Request Body:', JSON.stringify(data));

        const response = await fetch(`${API_BASE_LINK}${endpoint}`, {
            method,
            ...options,
            headers,
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', responseData);

        return {
            status: response.status,
            data: responseData.data,
            message: responseData.message
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        console.error('Error occurred:', errorMessage);

        return {
            status: 500,
            message: errorMessage
        };
    }
}

export async function makeDeleteRequest<T>(
    endpoint: string,
    data?: unknown,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const token = sessionStorage.getItem('authToken');
        console.log('Auth Token:', token);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        console.log('Making DELETE request to:', `${API_BASE_LINK}${endpoint}`);
        console.log('Request Headers:', headers);
        console.log('Request Body:', JSON.stringify(data));

        const response = await fetch(`${API_BASE_LINK}${endpoint}`, {
            method: 'DELETE',
            ...options,
            headers,
            body: data ? JSON.stringify(data) : undefined
        });

        const responseData = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', responseData);

        return {
            status: response.status,
            data: responseData.data,
            message: responseData.message
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        console.error('Error occurred:', errorMessage);

        return {
            status: 500,
            message: errorMessage
        };
    }
}