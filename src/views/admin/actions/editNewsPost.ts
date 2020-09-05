import { NewsPost } from '@/interfaces/NewsPost';
import axios, { AxiosError } from 'axios';
import { handleUnauthorized } from './handleUnauthorized';

export async function editNewsPost(newsPost: NewsPost) {
  try {
    const response = await axios.put<NewsPost>(
      `/api/news/${newsPost.id}`,
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
      `Something went wrong with editing #${newsPost.id} news post. Here's the error: ${error}`
    );
  }
}
