import Axios, { AxiosError } from 'axios';
import { IAuthResponse } from '@/interfaces/IAuthResponse';

export async function authenticate(
  url: string,
  username: string,
  password: string
) {
  try {
    const response = await Axios.post<IAuthResponse>(url, {
      username: username,
      password: password
    });
    return response.data.access_token;
  } catch (err) {
    let error: AxiosError = err;
    if (error.response?.status === 401) {
      throw new Error('Wrong username or password');
    }
    throw new Error(
      `Something went wrong with the authentication. Here's the error: ${error}`
    );
  }
}
