import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiImplicitBody,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger';

import { Note } from '@Entity/note.entity';

import { AuthGuard } from '@Auth/auth.guard';
import { NoteDTO } from '@Note/interfaces/note.dto';
import { NotePipe } from '@Note/note.pipe';
import { NoteService } from '@Note/note.service';

@ApiUseTags('note')
@Controller('character/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(':charId')
  @ApiOperation({
    title: 'Get Notes',
    description: 'Get all the notes of one character.'
  })
  @ApiOkResponse({ type: Note, isArray: true })
  async getNotes(@Param('charId') charId: string): Promise<Note[]> {
    return this.noteService.getNotes(charId);
  }

  @Post(':charId')
  @ApiOperation({
    title: 'New Note',
    description: 'Make a new note tied to this character.'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: Note })
  @ApiImplicitBody({ name: 'note', type: NoteDTO })
  async newNote(
    @Body('note', NotePipe) inNote: Note,
    @Param('charId') charId: string
  ): Promise<Note> {
    return this.noteService.saveNote(inNote, charId);
  }
}
