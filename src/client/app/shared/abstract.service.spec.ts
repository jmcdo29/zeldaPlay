import { TestBed } from '@angular/core/testing';

import { AbstractService } from './abstract.service';

describe('AbstractService', () => {
  let service: AbstractService;
  beforeAll(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(AbstractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should remove underscores', () => {
    const testObj = {
      _field1: 'value1',
      _field2: 'value2'
    };
    expect(service.transform(testObj)).toEqual({
      field1: 'value1',
      field2: 'value2'
    });
  });
  it('should turn back to an array', () => {
    const testObj = {
      _array: [{ _field1: 'value1' }, { _field2: 'value2' }]
    };
    expect(service.transform(testObj)).toEqual({
      array: [{ field1: 'value1' }, { field2: 'value2' }]
    });
  });
  it('should remove underscores and turn back to array', () => {
    const testObj = {
      _field1: 'value1',
      _field2: 'value2',
      _array1: [
        {
          _arrayField1: 'arrayValue1'
        },
        {
          _arrayField2: 'arrayValue2'
        }
      ],
      _field3: 'value3'
    };
    expect(service.transform(testObj)).toEqual({
      field1: 'value1',
      field2: 'value2',
      array1: [
        {
          arrayField1: 'arrayValue1'
        },
        {
          arrayField2: 'arrayValue2'
        }
      ],
      field3: 'value3'
    });
  });
});
