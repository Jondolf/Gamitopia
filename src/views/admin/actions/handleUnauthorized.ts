import { AxiosError } from 'axios';

export function handleUnauthorized(error: AxiosError) {
  if (error.response?.status === 401) {
    localStorage.removeItem('jwt');
    confirm('You are unauthorized and have been logged out.');
    throw new Error(`You are unauthorized and have been logged out.`);
  }
}