/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ description: 'The title of the note', example: 'My First Note' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The content of the note', example: 'This is the content of my note.' })
  @IsString()
  @IsNotEmpty()
  content: string;
}