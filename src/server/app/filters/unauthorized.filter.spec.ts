import { UnauthorizedFilter } from './unauthorized.filter';
import { UnauthorizedException } from '@nestjs/common';

describe('UnauthorizedFilter', () => {
  let filter: UnauthorizedFilter<UnauthorizedException>;
  beforeAll(() => {
    filter = new UnauthorizedFilter({ catch: jest.fn() } as any);
  });
  it('should be defined', () => {
    expect(filter).toBeTruthy();
  });
  it('should run the catch login', () => {
    filter.catch(
      {
        getStatus: jest.fn(),
        message: {
          message: 'string'
        }
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
