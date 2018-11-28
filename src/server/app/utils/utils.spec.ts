import { Utils } from './utils';

describe('#Utilities testing', () => {
  test('should make a random string x characters long.', () => {
    const randomId = Utils.makeId(9);
    expect(randomId).toHaveLength(9);
    expect(randomId).toBeDefined();
    expect(typeof randomId).toBe('string');
  });

  test('should make several random ids, all being different', () => {
    let randomIds = [];
    for (let i = 0; i < 100; i++) {
      randomIds.push(Utils.makeId(9));
    }
    expect(randomIds).toHaveLength(100);
    for (const id of randomIds) {
      expect(randomIds).toContain(id);
      let index;
      do {
        index = randomIds.indexOf(id);
        if (index !== -1) {
          randomIds = randomIds
            .slice(0, index)
            .concat(randomIds.slice(index + 1, randomIds.length));
        }
      } while (index !== -1);
    }
    expect(randomIds.length >= 95);
  });

  test('should check for a null value and pass back null', () => {
    interface IobjWithNull {
      value: number;
    }
    const objectWithNull: IobjWithNull = {
      value: NaN
    };
    const retNull = Utils.checkNull(objectWithNull.value, 'number');
    expect(retNull).toBeNull();
  });

  test('should check for a null value and pass back number', () => {
    const objectWithoutNull = {
      value: 15
    };
    const retNum = Utils.checkNull(objectWithoutNull.value, 'number');
    expect(retNum).toBe(15);
  });

  test('should return undefined for something that is not a number or string', () => {
    const testObj = {
      value: null
    };
    const retVal = Utils.checkNull(testObj.value, 'object');
    expect(retVal).toBe(undefined);
  });

  test('should check for an undefined value and pass back ""', () => {
    const objectWithBlank = {
      name: ''
    };
    const retBlank = Utils.checkNull(objectWithBlank.name, 'string');
    expect(retBlank).toBe('');
  });

  test('should check for an undefined value and pass back a string', () => {
    const objectWithoutBlank = {
      name: 'some name'
    };
    const retBlank = Utils.checkNull(objectWithoutBlank.name, 'string');
    expect(retBlank).toBe('some name');
  });
});
