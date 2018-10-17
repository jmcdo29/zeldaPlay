import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { NoteController } from '@Character/note/note.controller';
import { NoteService } from '@Character/note/note.service';

const NoteServiceStub = {};

describe('Note Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [NoteController],
      providers: [{ useValue: NoteServiceStub, provide: NoteService }]
    }).compile();
  });
  it('should be defined', () => {
    const controller: NoteController = module.get<NoteController>(
      NoteController
    );
    expect(controller).toBeDefined();
  });
});
