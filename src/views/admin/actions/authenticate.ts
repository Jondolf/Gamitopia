import Axios, { AxiosError } from 'axios';
import { AuthResponse } from '@/interfaces/AuthResponse';

export async function authenticate(
  url: string,
  username: string,
  password: string
) {
  try {
    const response = await Axios.post<AuthResponse>(url, {
      username: username,
      password: password
    });
    return response.data.access_token;
  } catch (err) {
    const error: AxiosError = err;
    if (error.response?.status === 401) {
      throw new Error('Wrong username or password');
    }
    throw new Error(
      `Something went wrong with the authentication. Here's the error: ${error}`
    );
  }
}
