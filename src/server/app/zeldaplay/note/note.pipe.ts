import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { DbNote } from '@DbModel/index';
import { NoteDTO } from '@Models/bodies/note/note.dto';

@Injectable()
export class NotePipe implements PipeTransform<NoteDTO, DbNote> {
  transform(value: NoteDTO, metadata: ArgumentMetadata): DbNote {
    const note = new DbNote();
    note.nMessage = value.msg;
    note.nNoteTime = value.time as any;
    note.nId = value.id;
    note.nImportant = value.important;
    return note;
  }
}
