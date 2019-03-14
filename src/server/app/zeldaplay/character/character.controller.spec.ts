import { Test } from '@nestjs/testing';
import { of } from 'rxjs';

import { AuthService } from '@Auth/auth.service';
import { CharacterController } from '@Character/character.controller';
import { DbCharacter } from '@DbModel/index';
import { CharacterService } from './character.service';

const CharacterServiceStub = {
  getAll: jest
    .fn()
    .mockReturnValue(
      of([new DbCharacter(), new DbCharacter(), new DbCharacter()])
    ),
  newChar: jest.fn().mockReturnValue(of(new DbCharacter())),
  getUserChars: jest
    .fn()
    .mockReturnValue(
      of([new DbCharacter(), new DbCharacter(), new DbCharacter()])
    ),
  getOne: jest.fn().mockReturnValue(of(new DbCharacter())),
  updateChar: jest.fn().mockReturnValue(of(new DbCharacter()))
};

const characterObserver = () => (characters: any) => {
  expect(characters).toEqual([
    new DbCharacter(),
    new DbCharacter(),
    new DbCharacter()
  ]);
};

describe('Characters Controller', () => {
  let characterController: CharacterController;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        { useValue: CharacterServiceStub, provide: CharacterService },
        { provide: AuthService, useValue: {} }
      ]
    }).compile();
    characterController = module.get<CharacterController>(CharacterController);
  });
  it('should be defined', () => {
    expect(characterController).toBeDefined();
  });
  it('should work for getAll', () => {
    characterController.getAll().subscribe(characterObserver);
  });
  it('should work for getUserChars', () => {
    characterController
      .getUser({
        userId: '00Utest12345'
      })
      .subscribe(characterObserver);
  });
  it('should work for getOne', () => {
    characterController
      .getOne({
        charId: '00Ctest12345'
      })
      .subscribe((character) => {
        expect(character).toEqual(new DbCharacter());
      });
  });
  it('should work for newChar', () => {
    characterController
      .newChar({ userId: '00Utest12345' }, new DbCharacter())
      .subscribe((character) => {
        expect(character).toEqual(new DbCharacter());
      });
  });
  it('should work for updateChar', () => {
    characterController
      .updateOne({ charId: '' }, new DbCharacter())
      .subscribe((character) => {
        expect(character).toEqual(new DbCharacter());
      });
  });
});
