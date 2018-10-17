import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { WeaponController } from '@Character/weapon/weapon.controller';
import { WeaponService } from '@Character/weapon/weapon.service';

const WeaponServiceStub = {};

describe('Weapon Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [WeaponController],
      providers: [{ useValue: WeaponServiceStub, provide: WeaponService }]
    }).compile();
  });
  it('should be defined', () => {
    const controller: WeaponController = module.get<WeaponController>(
      WeaponController
    );
    expect(controller).toBeDefined();
  });
});
