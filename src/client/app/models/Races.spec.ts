import * as Races from '#Models/Races';

describe('all races should be truthy', () => {
  test('fairy', () => {
    expect(Races.Fairy).toBeTruthy();
  });
  test('gerudo', () => {
    expect(Races.Gerudo).toBeTruthy();
  });
  test('goron', () => {
    expect(Races.Goron).toBeTruthy();
  });
  test('hylian', () => {
    expect(Races.Hylian).toBeTruthy();
  });
  test('rito', () => {
    expect(Races.Rito).toBeTruthy();
  });
  test('sheikah', () => {
    expect(Races.Sheikah).toBeTruthy();
  });
  test('twili', () => {
    expect(Races.Twili).toBeTruthy();
  });
  test('zora', () => {
    expect(Races.Zora).toBeTruthy();
  });
});
