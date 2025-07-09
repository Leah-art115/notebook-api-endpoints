/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private databaseService: DatabaseService) {}

  async create(createNoteDto: CreateNoteDto) {
    const { title, content } = createNoteDto;

    // Check for duplicate note with same title and content
    const checkQuery = `
      SELECT id
      FROM notes
      WHERE title = $1 AND content = $2;
    `;
    const checkResult = await this.databaseService.query(checkQuery, [
      title,
      content,
    ]);
    if (checkResult.rows.length > 0) {
      throw new BadRequestException(
        'A note with the same title and content already exists',
      );
    }

    // Insert new note if no duplicate is found
    const insertQuery = `
      INSERT INTO notes (title, content)
      VALUES ($1, $2)
      RETURNING id, title, content, created_at;
    `;
    const insertResult = await this.databaseService.query(insertQuery, [
      title,
      content,
    ]);
    const row = insertResult.rows[0];
    return {
      ...row,
      created_at: new Date(row.created_at).toISOString(),
    };
  }

  async findAll() {
    const query = `
      SELECT id, title, content, created_at
      FROM notes
      ORDER BY created_at DESC;
    `;
    const result = await this.databaseService.query(query);
    return result.rows.map((row: { created_at: string | number | Date }) => ({
      ...row,
      created_at: new Date(row.created_at).toISOString(),
    }));
  }

  async findOne(id: number) {
    const query = `
      SELECT id, title, content, created_at
      FROM notes
      WHERE id = $1;
    `;
    const result = await this.databaseService.query(query, [id]);
    if (result.rows.length === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    const row = result.rows[0];
    return {
      ...row,
      created_at: new Date(row.created_at).toISOString(),
    };
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const { title, content } = updateNoteDto;
    const query = `
      UPDATE notes
      SET title = COALESCE($1, title),
          content = COALESCE($2, content)
      WHERE id = $3
      RETURNING id, title, content, created_at;
    `;
    const result = await this.databaseService.query(query, [
      title,
      content,
      id,
    ]);
    if (result.rows.length === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    const row = result.rows[0];
    return {
      ...row,
      created_at: new Date(row.created_at).toISOString(),
    };
  }

  async remove(id: number) {
    const query = `
      DELETE FROM notes
      WHERE id = $1
      RETURNING id;
    `;
    const result = await this.databaseService.query(query, [id]);
    if (result.rows.length === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return { message: `Note with ID ${id} deleted successfully` };
  }
}
