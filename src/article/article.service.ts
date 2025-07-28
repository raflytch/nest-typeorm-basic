import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindOneArticleDto } from './dto/find-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private ArticleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = this.ArticleRepository.create(createArticleDto);
    return this.ArticleRepository.save(newArticle);
  }

  async findAll(): Promise<Article[]> {
    return this.ArticleRepository.find();
  }

  async findOne(findOneArticleDto: FindOneArticleDto): Promise<Article | null> {
    return this.ArticleRepository.findOneBy(findOneArticleDto);
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article | null> {
    await this.ArticleRepository.update(id, updateArticleDto);
    return this.ArticleRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.ArticleRepository.delete(id);
  }
}
