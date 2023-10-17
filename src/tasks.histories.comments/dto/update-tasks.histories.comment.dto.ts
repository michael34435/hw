import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskHistoryCommentDto } from './create-tasks.histories.comment.dto';

export class UpdateTaskHistoryCommentDto extends PartialType(CreateTaskHistoryCommentDto) {}
