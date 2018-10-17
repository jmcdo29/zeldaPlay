import { SaveModule } from './save.module';

describe('SaveModule', () => {
  let saveModule: SaveModule;

  beforeEach(() => {
    saveModule = new SaveModule();
  });

  it('should create an instance', () => {
    expect(saveModule).toBeTruthy();
  });
});
