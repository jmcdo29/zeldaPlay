import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiImplicitBody,
  ApiImplicitParam,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger';

import { AuthGuard } from '@Auth/auth.guard';
import { NoteDTO } from '@Body/index';
import { DbNote } from '@DbModel/index';
import { NotePipe } from '@Note/note.pipe';
import { NoteService } from '@Note/note.service';
import { CharacterIdParam } from '@Parameter/index';
import { Observable } from 'rxjs';

@ApiUseTags('Note')
@Controller('character/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(':charId')
  @ApiOperation({
    title: 'Get Notes',
    description: 'Get all the notes of one character.'
  })
  @ApiImplicitParam({ name: 'charId', type: 'string', required: true })
  @ApiOkResponse({ type: DbNote, isArray: true })
  getNotes(@Param() params: CharacterIdParam): Observable<DbNote[]> {
    return this.noteService.getNotes(params.charId);
  }

  @Post(':charId')
  @ApiOperation({
    title: 'New Note',
    description: 'Make a new note tied to this character.'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: DbNote })
  @ApiImplicitParam({ name: 'charId', type: 'string', required: true })
  @ApiImplicitBody({ name: 'note', type: NoteDTO })
  newNote(
    @Body('note', NotePipe) inNote: DbNote,
    @Param() params: CharacterIdParam
  ): Observable<DbNote> {
    return this.noteService.saveNote(inNote, params.charId);
  }
}
