import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { IArticle } from './interfaces/article.interface';
import { FindOneArticleDto } from './dto/find-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): IArticle[] {
    return this.articleService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: FindOneArticleDto): IArticle | null {
    const article = this.articleService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with ID ${id.id} not found`);
    }
    return article;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArticleDto: CreateArticleDto): IArticle {
    return this.articleService.create(createArticleDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: FindOneArticleDto,
    @Body() updateArticleDto: UpdateArticleDto,
  ): IArticle | null {
    const article = this.articleService.updateArticleByParams(
      id.id,
      updateArticleDto,
    );
    if (!article) {
      throw new NotFoundException(`Article with ID ${id.id} not found`);
    }
    return article;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: FindOneArticleDto): boolean {
    const deleted = this.articleService.delete(id.id);
    if (!deleted) {
      throw new NotFoundException(`Article with ID ${id.id} not found`);
    }
    return true;
  }
}
