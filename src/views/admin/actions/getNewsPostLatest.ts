import Axios from 'axios';
import { INews } from '@/interfaces/INews';

export async function getLatestNewsPost() {
  try {
    const response = await Axios.get<INews>('/api/news/latest');
    return response.data;
  } catch (error) {
    throw new Error(
      `Couldn't get latest news post. Here's the error: ${error}`
    );
  }
}
