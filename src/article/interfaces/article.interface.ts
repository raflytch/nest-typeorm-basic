export interface IArticle {
  id: number;
  title: string;
  content: string;
  status: ArticleStatus;
}

export enum ArticleStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}
