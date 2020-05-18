import { AxiosError } from 'axios';
import { store } from '@/store';

export function handleUnauthorized(error: AxiosError) {
  if (error.response?.status === 401) {
    localStorage.removeItem('jwt');
    confirm('You are unauthorized and have been logged out.');
    store.commit('changeIsAdmin', false);
    window.location.href = '/admin/login';
  }
}
