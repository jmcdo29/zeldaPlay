import { CapitalizePipe } from './capitalize.pipe';

describe('#test needed to pass', () => {
  let pipe: CapitalizePipe;

  beforeAll(() => {
    pipe = new CapitalizePipe();
  });
  it('Capitalizes any word', () => {
    expect(pipe.transform('word')).toBe('Word');
    expect(pipe.transform('something')).toBe('Something');
    expect(pipe.transform('name')).toBe('Name');
  });
});
