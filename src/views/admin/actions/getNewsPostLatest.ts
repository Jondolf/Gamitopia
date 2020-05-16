import Axios from 'axios';
import { News } from '@/interfaces/News';

export async function getLatestNewsPost() {
  try {
    const response = await Axios.get<News>('/api/news/latest');
    return response.data;
  } catch (error) {
    throw new Error(
      `Couldn't get latest news post. Here's the error: ${error}`
    );
  }
}
