import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;
}
