import { NotFoundExceptionFilter } from './notFoundException.filter';
import { NotFoundException } from '@nestjs/common';

describe('UnauthorizedFilter', () => {
  let filter: NotFoundExceptionFilter<NotFoundException>;
  beforeAll(() => {
    filter = new NotFoundExceptionFilter({ catch: jest.fn() } as any);
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
