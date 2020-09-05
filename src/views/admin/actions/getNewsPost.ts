import { NewsPost } from '@/interfaces/NewsPost';
import axios from 'axios';

export async function getNewsPost(id: string) {
  try {
    const response = await axios.get<NewsPost>(`/api/news/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Something went wrong with the GET request. Here's the error: ${error}`
    );
  }
}
