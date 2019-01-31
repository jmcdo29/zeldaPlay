import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('App Controller', () => {
  let controller: AppController;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController]
    }).compile();
    controller = module.get<AppController>(AppController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return index.html', async () => {
    const resMock = {sendFile: jest.fn()};
    const response = await controller.returnApp(resMock);
    expect(resMock.sendFile).toBeCalled();
    expect(resMock.sendFile).toBeCalledWith('index.html');
  });
});
