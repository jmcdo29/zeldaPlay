import { Test } from '@nestjs/testing';
import { of } from 'rxjs';

import { AuthService } from '@Auth/auth.service';
import { DbSpell } from '@DbModel/index';
import { SpellController } from '@Spell/spell.controller';
import { SpellService } from './spell.service';

const SpellServiceStub = {
  getSpells: jest
    .fn()
    .mockReturnValue(of([new DbSpell(), new DbSpell(), new DbSpell()])),
  newSpell: jest.fn().mockReturnValue(of(new DbSpell())),
  updateSpell: jest.fn().mockReturnValue(of(new DbSpell()))
};

const charId = '00Ctest12345';

describe('Spell Controller', () => {
  let spellController: SpellController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [SpellController],
      providers: [
        { useValue: SpellServiceStub, provide: SpellService },
        { provide: AuthService, useValue: {} }
      ]
    }).compile();
    spellController = module.get<SpellController>(SpellController);
  });
  it('should be defined', () => {
    expect(spellController).toBeDefined();
  });
  it('should work for the getSpells route', () => {
    spellController.getSpells({ charId }).subscribe((spells) => {
      expect(SpellServiceStub.getSpells).toBeCalledTimes(1);
      expect(SpellServiceStub.getSpells).toBeCalledWith(charId);
      expect(spells.length).toBe(3);
      expect(spells).toEqual([new DbSpell(), new DbSpell(), new DbSpell()]);
    });
  });
  it('should work for the newSpell route', () => {
    spellController
      .newSpell(new DbSpell(), { charId })
      .subscribe((newSpell) => {
        expect(SpellServiceStub.newSpell).toBeCalledTimes(1);
        expect(SpellServiceStub.newSpell).toBeCalledWith(new DbSpell(), charId);
        expect(newSpell).toEqual(new DbSpell());
      });
  });
  it('should work for the updateSpell route', () => {
    spellController
      .updateSpell(new DbSpell(), {
        spellId: '0Spwmu7JnWil'
      })
      .subscribe((updatedSpell) => {
        expect(SpellServiceStub.updateSpell).toBeCalledTimes(1);
        expect(SpellServiceStub.updateSpell).toBeCalledWith(new DbSpell());
        expect(updatedSpell).toEqual(new DbSpell());
      });
  });
});
