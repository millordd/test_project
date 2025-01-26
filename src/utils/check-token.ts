import { jwtDecode } from 'jwt-decode';

export const isValidToken = (token: string | null): boolean => {
  if (!token) return false;

  const currentTime = new Date().getTime() / 1000;

  try {
    const { exp } = jwtDecode(token);
    return Number(currentTime) < Number(exp);
  } catch (error) {
    return false;
  }
};
