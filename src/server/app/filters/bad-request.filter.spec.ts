import { BadRequestException } from '@nestjs/common';
import { BadRequestFilter } from './bad-request.filter';

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
      new BadRequestException({
        message: [{ constraints: ['A bad request'] }]
      }),
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
