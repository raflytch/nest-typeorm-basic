import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{ data: Article[]; total: number; page: number; limit: number }> {
    return this.articleService.findAll(page, limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<Article | null> {
    return this.articleService.findOne({ id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article | null> {
    const updatedArticle = this.articleService.update(id, updateArticleDto);
    if (!updatedArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return updatedArticle;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<void> {
    return this.articleService.remove(id);
  }
}
