import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@Auth/auth.controller';
import { AuthService } from '@Auth/auth.service';

const AuthServiceStub = {};

describe('Auth Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ useValue: AuthServiceStub, provide: AuthService }]
    }).compile();
  });
  it('should be defined', () => {
    const controller: AuthController = module.get<AuthController>(
      AuthController
    );
    expect(controller).toBeDefined();
  });
});
