import { Injectable } from '@nestjs/common';
import { NewsPost } from './newsPost.interface';
import { News } from 'src/entities/news.entity';
import { NewsPostDto } from './newsPost.dto';

@Injectable()
export class NewsService {
  async getNewsPosts(): Promise<News[]> {
    return await News.find({
      order: { id: 'ASC' }
    });
  }

  async getNewsPostById(id: string): Promise<News> {
    return await News.findOneOrFail(id);
  }

  async getLatestNewsPost(): Promise<News> {
    const latest = await News.find({
      order: { id: 'DESC' },
      take: 1
    });
    return latest[0];
  }

  async createNewsPost(newsPost: NewsPostDto) {
    return await News.create({
      title: newsPost.title,
      body: newsPost.body,
      date: newsPost.date
    }).save();
  }

  async updateNewsPost(id: string, { title, body, date }: NewsPostDto) {
    const newsPost = await News.findOneOrFail(id);
    return await News.merge(newsPost, { title, body, date }).save();
  }

  async deleteNewsPost(id: string) {
    const newsPost = await News.findOneOrFail(id);
    await newsPost.remove();
  }
}
