import { Injectable } from '@nestjs/common';
import { IArticle } from './interfaces/article.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindOneArticleDto } from './dto/find-article.dto';
import { randomUUID } from 'crypto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  private articles: IArticle[] = [];

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

  updateArticleByParams(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): IArticle | null {
    const article = this.articles.find((a) => a.id === id);
    if (!article) return null;
    Object.assign(article, updateArticleDto);
    return article;
  }

  delete(id: string): boolean {
    const initialLength = this.articles.length;
    this.articles = this.articles.filter((article) => article.id !== id);
    return this.articles.length < initialLength;
  }
}
