import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { Note } from '@Entity/note.entity';

import { NoteDTO } from '@Character/note/interfaces/note.dto';

@Injectable()
export class NotePipe implements PipeTransform<NoteDTO, Note> {
  transform(value: NoteDTO, metadata: ArgumentMetadata): Note {
    const note = new Note();
    note.message = value.msg;
    note.time = value.time;
    note.id = value.id;
    note.important = value.important;
    return note;
  }
}
