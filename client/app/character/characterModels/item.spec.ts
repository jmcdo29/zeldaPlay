import { Item } from './item';

test('should create an item', () => {
  const myItem = new Item();
  myItem.name = 'item';
  myItem.description = 'an item!';
  myItem.id = 'some id, i dunno';
  expect(myItem).toBeTruthy();
});
