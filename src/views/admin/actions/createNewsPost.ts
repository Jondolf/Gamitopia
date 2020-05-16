import axios, { AxiosError } from 'axios';
import { handleUnauthorized } from './handleUnauthorized';
import { News } from '@/interfaces/News';

export async function createNewsPost(
  title: string,
  body: string,
  date: string
) {
  try {
    const response = await axios.post<News>(
      '/api/news',
      {
        title: title,
        body: body,
        date: date
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        }
      }
    );

    return response.data;
  } catch (err) {
    const error: AxiosError = err;
    handleUnauthorized(error);
    throw new Error(
      `Something went wrong with creating a news post. Here's the error: ${error}`
    );
  }
}
