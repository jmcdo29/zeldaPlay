import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { agent as request } from 'supertest';

import { AppModule } from 'apps/api/src/app/app.module';
import { DatabaseService } from 'apps/api/src/app/database/database.service';
import { DatabaseTestService } from './helpers/database-test.service';

describe('Tabletop-Companion e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DatabaseService)
      .useClass(DatabaseTestService)
      .compile();
    app = module.createNestApplication();
    await app.init();
  });

  it('should initialize the server', () => {
    expect(app).toBeTruthy();
  });

  describe('AppService', () => {
    it('should get the hello world through GraphQL', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: 'query{sayHello(data: ""){message}}' })
        .expect(200)
        .expect({ data: { sayHello: { message: 'Welcome to api!' } } });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
