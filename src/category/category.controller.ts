import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from './dto/pagination.dto';
import { FindOneParamDto } from './dto/find-one-param.dto';
import { Category } from './entities/category.entity';
import { PaginatedResult } from './interfaces/paginated.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Category>> {
    return this.categoryService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param() params: FindOneParamDto): Promise<Category> {
    return this.categoryService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param() params: FindOneParamDto,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(params.id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: FindOneParamDto): Promise<void> {
    return this.categoryService.remove(params.id);
  }
}
