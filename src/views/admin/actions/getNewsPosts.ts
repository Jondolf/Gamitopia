import axios from 'axios';
import { News } from '@/interfaces/News';

export async function getNewsPosts() {
  try {
    const response = await axios.get<News[]>('/api/news');
    return response.data;
  } catch (error) {
    throw new Error(
      `Something went wrong while getting the news posts. Here's the error: ${error}`
    );
  }
}
