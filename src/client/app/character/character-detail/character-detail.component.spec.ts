import { Component, Input, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Character } from '#Models/character';
import { MessageService } from '#Shared/messages/message.service';
import { CharacterDetailComponent } from './character-detail.component';

@Component({ selector: 'app-skill', template: '' })
class SkillsStubComponent {
  @Input()
  character;
}

// tslint:disable:max-classes-per-file
@Component({ selector: 'app-weapon', template: '' })
class WeaponsStubComponent {
  @Input()
  character;
}

@Component({ selector: 'app-spell', template: '' })
class SpellStubComponent {
  @Input()
  character;
}

@Component({ selector: 'app-inventory', template: '' })
class InventoryStubComponent {
  @Input()
  character;
}

@Component({ selector: 'app-note', template: '' })
class NoteStubComponent {
  @Input()
  character;
}

@Component({ selector: 'app-save', template: '' })
class SaveStubComponent {
  @Input()
  character;
  @Input()
  characterDetailComponent;
}

@Component({ selector: 'app-die', template: '' })
class DieStubComponent {
  @Input()
  sides;
  @Input()
  character;
  @Input()
  mod;
}

@Component({ selector: 'app-character-level-up', template: '' })
class CharacterLevelUpStubComponent implements OnInit {
  @Input()
  currChar;
  ngOnInit() {
    return;
  }
}

const messageServiceStub: Partial<MessageService> = {
  add(message) {
    return message;
  }
};

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        CharacterDetailComponent,
        InventoryStubComponent,
        NoteStubComponent,
        SkillsStubComponent,
        SpellStubComponent,
        WeaponsStubComponent,
        DieStubComponent,
        SaveStubComponent,
        CharacterLevelUpStubComponent
      ],
      providers: [{ provide: MessageService, useValue: messageServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('health modal', () => {
    beforeEach(() => {
      component.character.setMaxHealth(25);
      component.character.setHealth(component.character.getMaxHealth());
      component.type = -1;
      component.modHealth();
    });
    test('finalize good', () => {
      component.hpDmg = 15;
      component.finalizeHealthMod();
      expect(component.character.getHealth()).toBe(10);
    });
    test('restore', () => {
      component.type = 1;
      component.character.setHealth(10);
      component.hpDmg = 14;
      component.finalizeHealthMod();
      expect(component.character.getHealth()).toBe(24);
      component.hpDmg = 100;
      component.finalizeHealthMod();
      expect(component.character.getHealth()).toBe(
        component.character.getMaxHealth()
      );
    });
    test('finalize dying', () => {
      component.hpDmg = 15;
      component.finalizeHealthMod();
      expect(component.character.getHealth()).toBe(10);
      component.hpDmg = 50;
      component.finalizeHealthMod();
      expect(component.character.getHealth()).toBe(-10);
    });
    test('modTheHMod', () => {
      component.hpDmg = 5;
      component.modTheHMod(5);
      expect(component.hpDmg).toBe(10);
      component.modTheHMod(35);
      expect(component.hpDmg).toBe(component.character.getMaxHealth() + 10);
    });
  });
  describe('magic modal', () => {
    beforeEach(() => {
      component.character.setMaxMagic(25);
      component.character.setMagic(component.character.getMaxMagic());
      component.type = -1;
      component.modMagic();
    });
    test('finalize good', () => {
      component.mpDmg = 15;
      component.finalizeMagicMod();
      expect(component.character.getMagic()).toBe(10);
    });
    test('restore', () => {
      component.type = 1;
      component.character.setMagic(10);
      component.mpDmg = 14;
      component.finalizeMagicMod();
      expect(component.character.getMagic()).toBe(24);
      component.mpDmg = 100;
      component.finalizeMagicMod();
      expect(component.character.getMagic()).toBe(
        component.character.getMaxMagic()
      );
    });
    test('finalize bad', () => {
      component.mpDmg = 15;
      component.finalizeMagicMod();
      expect(component.character.getMagic()).toBe(10);
      component.mpDmg = 15;
      component.finalizeMagicMod();
      expect(component.character.getMagic()).toBe(0);
    });
    test('modTheMMod', () => {
      component.mpDmg = 5;
      component.modTheMMod(5);
      expect(component.mpDmg).toBe(10);
      component.modTheMMod(25);
      expect(component.mpDmg).toBe(component.character.getMaxMagic());
    });
  });
  describe('experience modal', () => {
    beforeEach(() => {
      component.character.setExp(100);
      component.modExp();
    });
    test('add experience', () => {
      component.expMod = 1000;
      component.finalizeExpMod();
      expect(component.character.getExp()).toBe(100 + 1000);
    });
    test('add negative experience', () => {
      const startExp = component.character.getExp();
      component.expMod = -1000;
      component.finalizeExpMod();
      expect(component.character.getExp() - startExp).toBe(0);
      expect(component.negExp).toBe(true);
    });
  });
  describe('expand functions', () => {
    test('expandDets', () => {
      const start = component.showDets;
      component.expandDets();
      expect(component.showDets).not.toBe(start);
      component.expandDets();
      expect(component.showDets).toBe(start);
    });
    test('expandSave', () => {
      const start = component.showSaves;
      component.expandSaves();
      expect(component.showSaves).not.toBe(start);
      component.expandSaves();
      expect(component.showSaves).toBe(start);
    });
  });
  describe('get objects', () => {
    test('heartContainer', () => {
      const startMaxHealth = component.character.getMaxHealth();
      component.gotHeartContainer();
      expect(component.character.getHealth()).toBe(startMaxHealth + 16);
      expect(component.character.getMaxHealth()).toBe(startMaxHealth + 16);
    });
    test('magicContainer', () => {
      const startMaxMagic = component.character.getMaxMagic();
      component.gotMagicContainer();
      expect(component.character.getMagic()).toBe(startMaxMagic + 6);
      expect(component.character.getMaxMagic()).toBe(startMaxMagic + 6);
    });
  });
  test('changeSection', () => {
    for (let i = 0; i < component.showSet.length; i++) {
      component.changeSection(i);
      for (let j = 0; j < component.showSet.length; j++) {
        if (i !== j) {
          expect(component.showSet[i]).not.toBe(component.showSet[j]);
        }
      }
    }
  });
  test('set edit', () => {
    component.setEdit();
    component.setEdit();
  });
  test('set roll', () => {
    component.setRoll('4');
    expect(component.roll).toBe('4');
  });
});
