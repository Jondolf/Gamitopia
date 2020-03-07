import axios, { AxiosError } from 'axios';
import { INews } from '../../../interfaces/INews';
import { handleUnauthorized } from './handleUnauthorized';

export async function editNewsPost(
  id: string,
  title: string,
  body: string,
  date: string
) {
  try {
    const response = await axios.put<INews>(
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
    let error: AxiosError = err;
    handleUnauthorized(error);
    throw new Error(
      `Something went wrong with editing #${id} news post. Here's the error: ${error}`
    );
  }
}
