import { BaseFilter } from './base.filter';

describe('BaseFilter', () => {
  it('should be defined', () => {
    expect(new BaseFilter({} as any)).toBeTruthy();
  });
});
