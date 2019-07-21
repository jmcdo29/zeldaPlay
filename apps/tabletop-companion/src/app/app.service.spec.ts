import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';

import { AppService, sayHello } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.get(AppService);
    controller = TestBed.get(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sayHello', (done) => {
    service.getHello().subscribe(
      (result) => {
        expect(result.message).toBe('Welcome to api!');
        done();
      },
      (error) => {
        throw new Error(error.message);
      },
      () => done(),
    );
    const op = controller.expectOne(sayHello);

    op.flush({
      data: {
        sayHello: {
          message: 'Welcome to api!',
        },
      },
    });
    controller.verify();
  });
});
