import { environment } from './environment';

test('assert env variables', () => {
  expect(environment.apiUrl).toBe('http://localhost:4000');
  expect(!environment.production);
});
