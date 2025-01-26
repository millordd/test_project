/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

import { getRefreshToken } from '@app/pages/SignIn/components/api';
import { BASE_URL } from '@shared/consts/consts';

import { toCamelCase } from './case-transformer';
import { localStorageManager } from './localeStorage';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const instance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to handle token and snake_case transformation
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorageManager.get<string>('accessToken') || '';

  // Convert request data to snake_case | camelCase , based on API requirements
  const newConfig: InternalAxiosRequestConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    ...(config.data && { data: toCamelCase(config.data) }),
  };

  return newConfig;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refresh token from localStorage
        const refreshToken = localStorageManager.get<string>('refreshToken');
        if (!refreshToken) {
          localStorageManager.remove('accessToken');
          localStorageManager.remove('refreshToken');
          return Promise.reject(error);
        }

        const response = await getRefreshToken({ refreshToken });

        const { accessToken } = response;

        localStorageManager.set('accessToken', accessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return instance(originalRequest);
      } catch (refreshError) {
        if (refreshError instanceof AxiosError && refreshError.response?.status === 403) {
          localStorageManager.remove('accessToken');
          localStorageManager.remove('refreshToken');
        }
        return Promise.reject(refreshError);
      }
    }
    handleAxiosError(error);
    return Promise.reject(error);
  }
);

/**
 * Centralized Axios error handler
 */
const handleAxiosError = (error: AxiosError) => {
  const status = error.response?.status;
  const message = (error.response?.data as { Message?: string })?.Message || 'An unexpected error occurred';

  if (!error.response) {
    // Handle network error
    toast.error('Network error. Please check your connection and try again.');
  } else if (status === 403) {
    // Forbidden (User has no permission)
    toast.error('You do not have permission to perform this action.');
  } else if (status !== undefined && status >= 400 && status < 500) {
    // Client errors (excluding 401 because interceptor handles it)
    toast.error(`Error: ${message}`);
  } else if (status !== undefined && status >= 500) {
    // Server errors
    toast.error('Server Error. Please try again later.');
  } else {
    // Default fallback error message
    toast.error(typeof message === 'string' ? message : 'An unexpected error occurred');
  }
};

/**
 * Extracts response body
 */
const responseBody = (response: AxiosResponse): any => {
  return response;
};

// HTTP methods
const get = (url: string, config?: AxiosRequestConfig) => instance.get(url, config).then(responseBody);

const post = (url: string, body?: any, config?: AxiosRequestConfig) => {
  return instance.post(url, body, config).then(responseBody);
};

const put = (url: string, body?: any) => instance.put(url, body).then(responseBody);

const del = <T>(url: string, body?: T) => instance.delete(url, { data: body }).then(responseBody);

const patch = (url: string, body?: any) => instance.patch(url, body).then(responseBody);

export const request = { get, post, put, del, patch };
