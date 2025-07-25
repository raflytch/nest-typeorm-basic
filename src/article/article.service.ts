import { Injectable } from '@nestjs/common';
import { IArticle } from './interfaces/article.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindOneArticleDto } from './dto/find-article.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ArticleService {
  private readonly articles: IArticle[] = [];

  create(createArticleDto: CreateArticleDto): IArticle {
    const newArticle: IArticle = {
      id: randomUUID(),
      ...createArticleDto,
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  findAll(): IArticle[] {
    return this.articles;
  }

  findOne(findOneArticleDto: FindOneArticleDto): IArticle | null {
    return (
      this.articles.find((article) => article.id === findOneArticleDto.id) ||
      null
    );
  }

  update(id: string, updateArticleDto: CreateArticleDto): IArticle | null {
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );
    if (articleIndex === -1) {
      return null;
    }
    const updatedArticle: IArticle = {
      ...this.articles[articleIndex],
      ...updateArticleDto,
    };
    this.articles[articleIndex] = updatedArticle;
    return updatedArticle;
  }

  delete(id: string): boolean {
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );
    if (articleIndex === -1) {
      return false;
    }
    this.articles.splice(articleIndex, 1);
    return true;
  }
}
