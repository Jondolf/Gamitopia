import axios from 'axios';
import News from '../interfaces/newsInterface';

export async function getNewsPost(id: string) {
  try {
    const response = await axios.get<News>(
      `http://localhost:3000/api/news/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Something went wrong with the GET request. Here's the error: ${error}`
    );
  }
}
