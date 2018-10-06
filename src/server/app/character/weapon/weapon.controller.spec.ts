import { Test, TestingModule } from '@nestjs/testing';
import { WeaponController } from './weapon.controller';

describe('Weapon Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [WeaponController]
    }).compile();
  });
  it('should be defined', () => {
    const controller: WeaponController = module.get<WeaponController>(
      WeaponController
    );
    expect(controller).toBeDefined();
  });
});
