import { BadRequestFilter } from './bad-request-filter.filter';
import { BadRequestException } from '@nestjs/common';

describe('BadRequestFilterFilter', () => {
  let filter: BadRequestFilter<BadRequestException>;
  beforeAll(() => {
    filter = new BadRequestFilter({ catch: jest.fn() } as any);
  });
  it('should be defined', () => {
    expect(filter).toBeTruthy();
  });
  it('should catch the error', () => {
    filter.catch(
      {
        getStatus: jest.fn().mockReturnValue(400),
        message: [
          {
            constraints: [
              'Password should be more than 8 characters',
              'Password should contain an upper case character'
            ]
          }
        ]
      } as any,
      {
        switchToHttp: jest.fn().mockReturnValue({
          getResponse: jest.fn().mockReturnValue({
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
          })
        })
      } as any
    );
  });
});
