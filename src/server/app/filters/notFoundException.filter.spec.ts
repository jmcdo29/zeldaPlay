import { NotFoundException } from '@nestjs/common';
import { NotFoundFilter } from './notFoundException.filter';

describe('UnauthorizedFilter', () => {
  let filter: NotFoundFilter<NotFoundException>;
  beforeAll(() => {
    filter = new NotFoundFilter({ catch: jest.fn() } as any);
  });
  it('should be defined', () => {
    expect(filter).toBeTruthy();
  });
  it('should run the catch login', () => {
    filter.catch(
      {} as any,
      {
        switchToHttp: jest.fn().mockReturnValue({
          getResponse: jest.fn().mockReturnValue({
            redirect: jest.fn().mockReturnThis()
          })
        })
      } as any
    );
  });
});
