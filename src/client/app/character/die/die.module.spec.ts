import { DieModule } from './die.module';

describe('DieModule', () => {
  let dieModule: DieModule;

  beforeEach(() => {
    dieModule = new DieModule();
  });

  it('should create an instance', () => {
    expect(dieModule).toBeTruthy();
  });
});
