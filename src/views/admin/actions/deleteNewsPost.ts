import axios, { AxiosError } from 'axios';
import { handleUnauthorized } from './handleUnauthorized';

export async function deleteNewsPost(id: number) {
  try {
    await axios.delete(`http://localhost:3000/api/news/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    });
  } catch (err) {
    let error: AxiosError = err;
    handleUnauthorized(error);
    throw new Error(
      `Something went wrong with deleting #${id} news post. Here's the error: ${error}`
    );
  }
}
