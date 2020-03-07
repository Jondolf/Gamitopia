import axios from 'axios';
import { INews } from '@/interfaces/INews';

export async function getNewsPost(id: string) {
  try {
    const response = await axios.get<INews>(`/api/news/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Something went wrong with the GET request. Here's the error: ${error}`
    );
  }
}
