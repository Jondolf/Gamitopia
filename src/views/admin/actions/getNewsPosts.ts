import { NewsPost } from '@/interfaces/NewsPost';
import axios from 'axios';

export async function getNewsPosts() {
  try {
    const response = await axios.get<NewsPost[]>('/api/news');
    return response.data;
  } catch (error) {
    throw new Error(
      `Something went wrong while getting the news posts. Here's the error: ${error}`
    );
  }
}
