const prefix = 'pre';

export const localStorageManager = {
  set: <T>(name: string, value: T): void => {
    localStorage.setItem(prefix + name, JSON.stringify(value));
  },
  get: <T>(name: string): T | null => {
    const value = localStorage.getItem(prefix + name);
    return value ? JSON.parse(value) : null;
  },
  remove: (name: string): void => {
    localStorage.removeItem(prefix + name);
  },
};
