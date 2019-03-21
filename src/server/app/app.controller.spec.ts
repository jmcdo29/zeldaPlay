import { Test } from '@nestjs/testing';
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
  it('should return index.html', () => {
    const sendFile: any = { sendFile: jest.fn() };
    controller.returnApp(sendFile);
    expect(sendFile.sendFile).toBeCalled();
    expect(sendFile.sendFile).toBeCalledWith('build/client/index.html');
  });
});
