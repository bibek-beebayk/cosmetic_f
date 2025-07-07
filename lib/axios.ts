import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

// Extend AxiosRequestConfig to include _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

// Create the axios instance
export const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get tokens from localStorage
const getStoredTokens = () => {
    if (typeof window !== 'undefined') {
        const tokens = localStorage.getItem('auth_tokens');
        return tokens ? JSON.parse(tokens) : null;
    }
    return null;
};

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
        const tokens = getStoredTokens();
        
        const isProtectedRoute = !config.url?.includes('/auth/login') && 
                               !config.url?.includes('/auth/register');

        if (tokens?.access && isProtectedRoute) {
            config.headers.Authorization = `Bearer ${tokens.access}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        
        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const tokens = getStoredTokens();

            if (tokens?.refresh) {
                try {
                    const response = await axios.post(`${API_URL}/auth/refresh/`, {
                        refresh: tokens.refresh
                    });

                    const newTokens = {
                        access: response.data.access_token,
                        refresh: response.data.refresh_token
                    };

                    localStorage.setItem('auth_tokens', JSON.stringify(newTokens));
                    originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;

                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem('auth_tokens');
                    localStorage.removeItem('user_data');
                    
                    if (typeof window !== 'undefined') {
                        window.location.href = '/';
                    }
                    
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

// Custom error handler
export const handleAxiosError = (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            return {
                status: error.response.status,
                message: error.message || 'An error occurred',
                data: error.response.data
            };
        } else if (error.request) {
            return {
                status: 503,
                message: 'Service unavailable',
                data: null
            };
        }
    }
    
    return {
        status: 500,
        message: 'An unexpected error occurred',
        data: null
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiCall<T>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any
): Promise<T> {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      ...config,
    });

    return response.data;
    
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    throw handleAxiosError(error);
  }
}
