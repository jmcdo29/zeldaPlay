import { Item } from './item';

test('should create an item with full constructor', () => {
  const myItem = new Item('the id of the item', 'item', 'an item');
  expect(myItem).toBeTruthy();
  expect(myItem.getName()).toBe('item');
  expect(myItem.getDescription()).toBe('an item');
  expect(myItem.getId()).toBe('the id of the item');

  // getters and setters
  myItem.setId('a new id');
  expect(myItem.getId()).toBe('a new id');
  myItem.setName('a new item');
  expect(myItem.getName()).toBe('a new item');
  myItem.setDescription('a new Desc');
  expect(myItem.getDescription()).toBe('a new Desc');
});
