import { ApiResponseModelProperty } from '@nestjs/swagger';

export class DbNote {
  @ApiResponseModelProperty({ type: 'string', example: '00NXPBzPDWvI' })
  nId: string;
  @ApiResponseModelProperty({ type: 'boolean', example: false })
  nImportant: boolean;
  @ApiResponseModelProperty({ type: 'string', example: 'I made a note!' })
  nMessage: string;
  @ApiResponseModelProperty({ type: 'date', example: new Date(Date.now()) })
  nNoteTime: Date;
}
