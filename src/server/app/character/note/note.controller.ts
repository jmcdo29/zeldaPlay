import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { Note } from 'entities/note.entity';

import { NotePipe } from './note.pipe';
import { NoteService } from './note.service';

@ApiUseTags('note')
@Controller('characters/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(':charId')
  @ApiOperation({
    title: 'Get Notes',
    description: 'Get all the notes of one character.'
  })
  async getNotes(@Param('charId') charId: string): Promise<Note[]> {
    return this.noteService.getNotes(charId);
  }

  @Post(':charId')
  @ApiOperation({
    title: 'New Note',
    description: 'Make a new note tied to this character.'
  })
  @UsePipes(NotePipe)
  async newNote(
    @Body() inNote: Note,
    @Param('charId') charId: string
  ): Promise<Note> {
    return this.noteService.saveNote(inNote, charId);
  }
}
