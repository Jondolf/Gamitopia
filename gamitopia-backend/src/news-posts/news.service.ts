import { Injectable } from '@nestjs/common';
import { News } from 'src/entities/news.entity';
import { NewsPostDto } from './newsPost.dto';

@Injectable()
export class NewsService {
  async getNewsPosts(): Promise<News[]> {
    return await News.find({ order: { id: 'ASC' } });
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
      tags: newsPost.tags,
      title: newsPost.title,
      bodyAsMarkdown: newsPost.bodyAsMarkdown,
      bodyAsHTML: newsPost.bodyAsHTML,
      date: newsPost.date
    }).save();
  }

  async updateNewsPost(id: string, { tags, title, bodyAsMarkdown, bodyAsHTML, date }: NewsPostDto) {
    const newsPost = await News.findOneOrFail(id);
    return await News.merge(newsPost, { tags, title, bodyAsMarkdown, bodyAsHTML, date }).save();
  }

  async deleteNewsPost(id: string) {
    const newsPost = await News.findOneOrFail(id);
    await newsPost.remove();
  }
}
