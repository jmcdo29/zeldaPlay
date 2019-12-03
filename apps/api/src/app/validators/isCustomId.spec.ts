import { IsCustomId } from './';
import { IsCustomIdConstrain } from './isCustomId';

describe('isCustomId', () => {
  it('should return the function for isCustomId', () => {
    const func = IsCustomId('CHR', {} as any);
    expect(typeof func).toBe('function');
    func({}, '');
    const validator = new IsCustomIdConstrain();
    expect(
      validator.validate('CHRcc57a88b-448c-4220-a779-b0e25d95c275', {
        constraints: ['CHR'],
      } as any),
    ).toBeTruthy();
  });
});
