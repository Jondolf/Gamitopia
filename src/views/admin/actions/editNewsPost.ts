import axios, { AxiosError } from 'axios';
import { News } from '../../../interfaces/News';
import { handleUnauthorized } from './handleUnauthorized';

export async function editNewsPost(
  id: string,
  title: string,
  body: string,
  date: string
) {
  try {
    const response = await axios.put<News>(
      `/api/news/${id}`,
      { title: title, body: body, date: date },
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
      `Something went wrong with editing #${id} news post. Here's the error: ${error}`
    );
  }
}
