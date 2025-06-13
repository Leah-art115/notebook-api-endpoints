/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @ApiProperty({ description: 'The title of the note', example: 'Updated Note Title', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The content of the note', example: 'Updated note content.', required: false })
  @IsString()
  @IsOptional()
  content?: string;
}