import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://dummyjson.com';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging/auth if needed
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isCancel(error)) {
            // Request was cancelled, don't treat as error
            return Promise.reject({ cancelled: true });
        }

        const message = error.response?.data?.message || error.message || 'An error occurred';
        return Promise.reject(new Error(message));
    }
);

// Helper to create abort controller for cancellable requests
export const createAbortController = (): AbortController => {
    return new AbortController();
};

// Generic request function with abort support
export const makeRequest = async <T>(
    config: AxiosRequestConfig
): Promise<T> => {
    const response = await api(config);
    return response.data;
};

export default api;
