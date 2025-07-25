import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindOneArticleDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
