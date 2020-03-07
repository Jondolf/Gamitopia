import axios from 'axios';
import { INews } from '@/interfaces/INews';

export async function getNewsPosts() {
  try {
    const response = await axios.get<INews[]>('/api/news');
    return response.data;
  } catch (error) {
    throw new Error(
      `Something went wrong while getting the news posts. Here's the error: ${error}`
    );
  }
}
