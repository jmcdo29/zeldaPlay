import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

const NoteServiceStub = {};

describe('Note Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
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
