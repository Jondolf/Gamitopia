import { NewsPost } from '@/interfaces/NewsPost';
import axios, { AxiosError } from 'axios';
import { handleUnauthorized } from './handleUnauthorized';

export async function createNewsPost(newsPost: NewsPost) {
  try {
    const response = await axios.post<NewsPost>(
      '/api/news',
      newsPost,
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
