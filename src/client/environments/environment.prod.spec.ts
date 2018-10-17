import { environment } from '#Environment/environment.prod';

test('assert prod env', () => {
  expect(environment.production);
  expect(environment.apiUrl).toBe('https://zeldaplay.herokuapp.com');
});
