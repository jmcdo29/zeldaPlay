import { EnumToArrayPipe } from './enum-to-array.pipe';

describe('Should transform an enum to an array', () => {
  test('should run the array command', () => {
    enum example {
      'North',
      'South',
      'East',
      'West'
    }
    const myTransform = new EnumToArrayPipe();
    const myArray = myTransform.transform(example);
    expect(myArray).toHaveLength(4);
    expect(myArray[0]).toBe('North');
    expect(myArray[3]).toBe('West');
  });
});
