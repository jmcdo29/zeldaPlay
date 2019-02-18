import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiImplicitBody,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger';

import { AuthGuard } from '@Auth/auth.guard';
import { DbNote } from '@DbModel/db_note.model';
import { NoteDTO } from '@Models/note/note.dto';
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
  @ApiOkResponse({ type: DbNote, isArray: true })
  async getNotes(@Param('charId') charId: string): Promise<DbNote[]> {
    return this.noteService.getNotes(charId);
  }

  @Post(':charId')
  @ApiOperation({
    title: 'New Note',
    description: 'Make a new note tied to this character.'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: DbNote })
  @ApiImplicitBody({ name: 'note', type: NoteDTO })
  async newNote(
    @Body('note', NotePipe) inNote: DbNote,
    @Param('charId') charId: string
  ): Promise<DbNote> {
    return this.noteService.saveNote(inNote, charId);
  }
}
