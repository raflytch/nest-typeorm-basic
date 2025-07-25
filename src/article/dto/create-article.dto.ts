import { ArticleStatus } from '../interfaces/article.interface';

export class CreateArticleDto {
  title: string;
  content: string;
  status?: ArticleStatus;
}
