import { Item } from '#Models/item';

test('should create an item with full constructor', () => {
  const myItem = new Item('the id of the item', 'item', 'an item');
  expect(myItem).toBeTruthy();
  expect(myItem.name).toBe('item');
  expect(myItem.description).toBe('an item');
  expect(myItem.id).toBe('the id of the item');

  // getters and setters
  myItem.id = 'a new id';
  expect(myItem.id).toBe('a new id');
  myItem.name = 'a new item';
  expect(myItem.name).toBe('a new item');
  myItem.description = 'a new Desc';
  expect(myItem.description).toBe('a new Desc');
});
