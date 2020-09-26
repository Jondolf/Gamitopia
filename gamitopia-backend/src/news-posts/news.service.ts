import { Injectable } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';
import { News } from 'src/entities/news.entity';
import { NewsPostDto } from './newsPost.dto';

const sanitizeHtmlConfig = {
  allowedTags: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'p',
    'span',
    'mark',
    'a',
    'ul',
    'ol',
    'li',
    'b',
    'i',
    'strong',
    'em',
    'strike',
    'abbr',
    'code',
    'hr',
    'br',
    'div',
    'img',
    'table',
    'thead',
    'caption',
    'tbody',
    'tr',
    'th',
    'td',
    'pre'
  ],
  allowedAttributes: {
    '*': ['style', 'class', 'href', 'alt'],
    'img': ['src']
  },
  allowedStyles: {
    '*': {
      color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
      'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
      'text-align': [/^left$/, /^right$/, /^center$/],
      'font-size': [/^\d+(?:px|em|%)$/],
      'font-family': [/^'Nunito'$/, /^'Nunito Sans'$/, /^'Fira Code'$/, /^'Merriweather'$/],
      'border-radius': [/^\d+(?:px|em|%)$/]
    }
  }
};

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
      bodyAsHTML: sanitizeHtml(newsPost.bodyAsHTML, sanitizeHtmlConfig),
      date: newsPost.date
    }).save();
  }

  async updateNewsPost(id: string, { tags, title, bodyAsMarkdown, bodyAsHTML, date }: NewsPostDto) {
    const newsPost = await News.findOneOrFail(id);
    return await News.merge(newsPost, { tags, title, bodyAsMarkdown, bodyAsHTML: sanitizeHtml(bodyAsHTML, sanitizeHtmlConfig), date }).save();
  }

  async deleteNewsPost(id: string) {
    const newsPost = await News.findOneOrFail(id);
    await newsPost.remove();
  }
}
