import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsPostDto } from './newsPost.dto';
import { News } from 'src/entities/news.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNewsPosts(): Promise<News[]> {
    return await this.newsService.getNewsPosts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.newsService.getNewsPostById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createNewsPost(@Body() newsPostData: NewsPostDto) {
    const newsPost = await this.newsService.createNewsPost(newsPostData);
    return {
      message: 'Successfully created news post',
      newsPost
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateNewsPost(
    @Param('id') id: string,
    @Body() newsPostData: NewsPostDto
  ) {
    const newsPost = await this.newsService.updateNewsPost(id, newsPostData);
    return {
      message: `Successfully edited #${id} news post`,
      newsPost
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteNewsPost(@Param('id') id: string) {
    await this.newsService.deleteNewsPost(id);
    return {
      message: 'Successfully deleted news post'
    };
  }
}
