import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';

describe('Note Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [NoteController]
    }).compile();
  });
  it('should be defined', () => {
    const controller: NoteController = module.get<NoteController>(
      NoteController
    );
    expect(controller).toBeDefined();
  });
});
