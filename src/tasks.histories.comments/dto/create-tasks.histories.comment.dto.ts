import { IsNotEmpty } from 'class-validator';

export class CreateTaskHistoryCommentDto {
  @IsNotEmpty()
  content: string;
}
