import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiImplicitBody,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger';

import { Note } from '@Entity/note.entity';

import { NoteDTO } from '@Character/note/interfaces/note.dto';
import { NotePipe } from '@Character/note/note.pipe';
import { NoteService } from '@Character/note/note.service';

@ApiUseTags('note')
@Controller('character/note')
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiImplicitBody({ name: 'note', type: NoteDTO })
  async newNote(
    @Body('note', NotePipe) inNote: Note,
    @Param('charId') charId: string
  ): Promise<Note> {
    return this.noteService.saveNote(inNote, charId);
  }
}
