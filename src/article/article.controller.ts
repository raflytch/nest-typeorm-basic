import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('article')
export class ArticleController {
  @Get()
  findAll(): Record<string, unknown>[] {
    return [
      { id: 1, title: 'NestJS Basics', content: 'Learn the basics of NestJS.' },
      {
        id: 2,
        title: 'Advanced NestJS',
        content: 'Dive deeper into NestJS features.',
      },
    ];
  }

  @Get(':id')
  findOne(@Param('id') id: string): Record<string, unknown> | null {
    const articles = this.findAll();
    return articles.find((article) => article.id === Number(id)) || null;
  }

  @Post()
  create(
    @Body() body: { title: string; content: string },
  ): Record<string, unknown> {
    const { title, content } = body;
    const newArticle = {
      id: Math.floor(Math.random() * 1000),
      title,
      content,
    };
    const articles = this.findAll();
    articles.push(newArticle);
    return newArticle;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; content?: string },
  ): Record<string, unknown> | null {
    const articles = this.findAll();
    const articleIndex = articles.findIndex(
      (article) => article.id === Number(id),
    );
    if (articleIndex === -1) return null;

    const updatedArticle = {
      ...articles[articleIndex],
      ...body,
    };
    articles[articleIndex] = updatedArticle;
    return updatedArticle;
  }

  @Delete(':id')
  delete(@Param('id') id: string): boolean {
    const articles = this.findAll();
    const articleIndex = articles.findIndex(
      (article) => article.id === Number(id),
    );
    if (articleIndex === -1) return false;

    articles.splice(articleIndex, 1);
    return true;
  }
}
