import { NewsPost } from '@/interfaces/NewsPost';
import Axios from 'axios';

export async function getLatestNewsPost() {
  try {
    const response = await Axios.get<NewsPost>('/api/news/latest');
    return response.data;
  } catch (error) {
    throw new Error(
      `Couldn't get latest news post. Here's the error: ${error}`
    );
  }
}
