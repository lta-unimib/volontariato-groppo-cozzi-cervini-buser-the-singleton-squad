/**
 * Represents a standard API response format.
 *
 * @template T The type of the data returned in the response.
 *
 * @param message A message describing the status of the response (e.g., success, error).
 *
 * @param data The actual data returned by the API. The type of `data` is determined by the generic parameter `T`.
 *
 * @param status The HTTP status code or a string representing the status of the response.
 */
export interface ApiResponse<T> {
    message: string;
    data: T;
    status: number | string;
}
