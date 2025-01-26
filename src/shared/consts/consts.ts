import { localStorageManager } from 'utils/localeStorage';

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const LS_TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
export const isDev = import.meta.env.VITE_NODE_ENV === 'development';
export const isProd = import.meta.env.VITE_NODE_ENV === 'production';

export interface ClientInterface {
  accessToken: string;
  clientId: number;
  clientName: string;
  clientRole: string;
  clientFunctional: string[];
  email: string;
}

export const getUserInfo = (): ClientInterface | null => {
  const role = localStorageManager.get<string>('userInfo');
  return role ? JSON.parse(role) : null;
};
