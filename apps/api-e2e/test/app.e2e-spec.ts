import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { OgmaService } from '@ogma/nestjs-module';

import { configure } from 'apps/api/src/config.main';
import { AppModule } from 'apps/api/src/app/app.module';
import { ConfigService } from 'apps/api/src/app/config/config.service';
import { signupPayload } from './fixtures/signup-payload';
import { httpPromise } from './helpers/http-promise';

describe('Tabletop-Companion e2e', () => {
  let app: INestApplication;
  let logger: OgmaService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    const config = app.get(ConfigService);
    logger = app.get(OgmaService);
    configure(app, config, logger);
    await app.listen(0);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should initialize the server', () => {
    expect(app).toBeTruthy();
  });

  describe('AuthService', () => {
    it('should sign the user up', async () => {
      expect.assertions(5);
      const url = await app.getUrl();
      const resp = await httpPromise(
        `${url}/api/auth/signup`,
        'POST',
        { 'Content-Type': 'application/json' },
        signupPayload,
      );
      expect(resp).toBeTruthy();
      expect(resp.status).toBe(201);
      expect(resp.headers).toMatchObject({
        'set-cookie': [
          expect.stringContaining('session.id'),
          expect.stringContaining('session.refresh'),
        ],
      });
      const cookie = resp.headers['set-cookie']
        .map((cookie: string) => {
          return cookie
            .split('; ')
            .filter(
              (cookiePart: string) =>
                cookiePart.split('=')[0] !== 'Path' &&
                cookiePart.split('=')[0] !== 'Expires',
            );
        })
        .flat()
        .join('; ');
      const getResp = await httpPromise(`${url}/api`, 'GET', {
        Cookie: cookie,
      });
      expect(getResp.status).toBe(200);
      expect(getResp.data).toEqual({
        message: 'Hello, ' + signupPayload.firstName + '!',
      });
    });
  });
});
