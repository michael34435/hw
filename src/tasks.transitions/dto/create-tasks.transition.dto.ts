import { $Enums } from '@prisma/client';
import { Equals, IsNotEmpty } from 'class-validator';

export class CreateTaskTransitionDto {
  @IsNotEmpty()
  @Equals($Enums.Status.DONE)
  status: $Enums.Status;
}
