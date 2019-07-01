import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

describe('AppResolver', () => {
  let resolver: AppResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppResolver,
        {
          provide: AppService,
          useValue: {
            getData: jest.fn().mockReturnValue({ message: 'Welcome to api!' })
          }
        }
      ]
    }).compile();

    resolver = module.get<AppResolver>(AppResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should get the return from "sayHello"', () => {
    expect(resolver.sayHello()).toEqual({ message: 'Welcome to api!' });
  });
});
