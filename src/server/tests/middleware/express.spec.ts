import { myExpress } from '../../src/middleware/express';

test('eJSON should be a function', () => {
  expect(typeof myExpress.eJSON).toBe('function');
});

test('eURL should be a function', () => {
  expect(typeof myExpress.eURL).toBe('function');
});

test('eStatic should be a function', () => {
  expect(typeof myExpress.eStatic).toBe('function');
});

test('myExpress should be an object', () => {
  expect(typeof myExpress).toBe('object');
  expect(myExpress).toHaveProperty('eJSON');
  expect(myExpress).toHaveProperty('eURL');
  expect(myExpress).toHaveProperty('eStatic');
});
