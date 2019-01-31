import { ArgumentMetadata } from '@nestjs/common';

import { AuthPipe } from './auth.pipe';

const meta: ArgumentMetadata = { type: 'body' };
const testEmail = 'test@test.email';
const testPass = 'Passw0rd!';
const generalRequest = {
  email: testEmail,
  password: testPass,
  confirmationPassword: testPass
};

describe('#authPipe', () => {
  let pipe: AuthPipe;
  beforeAll(() => {
    pipe = new AuthPipe();
  });
  it('should be a good input', async () => {
    const pipeOut = await pipe.transform(generalRequest, meta);
    expect(pipeOut).toBeTruthy();
    expect(pipeOut).toEqual(generalRequest);
  });
  it('should have an error for mismatched password', async () => {
    try {
      generalRequest.password = 'Password!1';
      await pipe.transform(generalRequest, meta);
    } catch (err) {
      expect(err.message.message).toBe(
        'Password and Confirmation Password must match.'
      );
    }
  });
  it('should have an error for no capitals', async () => {
    try {
      generalRequest.password = generalRequest.confirmationPassword =
        'passw0rd!';
      await pipe.transform(generalRequest, meta);
    } catch (err) {
      expect(err.message.message).toBe(
        'Password must contain at least one upper case character.'
      );
    }
  });
  it('should have an error for no lower case', async () => {
    try {
      generalRequest.password = generalRequest.confirmationPassword =
        'PASSW0RD!';
      await pipe.transform(generalRequest, meta);
    } catch (err) {
      expect(err.message.message).toBe(
        'Password must contain at least one lower case character.'
      );
    }
  });
  it('should have an error for no numbers', async () => {
    try {
      generalRequest.password = generalRequest.confirmationPassword =
        'Password!';
      await pipe.transform(generalRequest, meta);
    } catch (err) {
      expect(err.message.message).toBe(
        'Password must contain at least one digit.'
      );
    }
  });
  it('should have an error for no special characters', async () => {
    try {
      generalRequest.password = generalRequest.confirmationPassword =
        'Passw0rd';
      await pipe.transform(generalRequest, meta);
    } catch (err) {
      expect(err.message.message).toBe(
        'Password must contain at least one special character (!@#$%^&*_-+).'
      );
    }
  });
  it('should have an error for being less than 8 characters', async () => {
    try {
      generalRequest.password = generalRequest.confirmationPassword = 'P4ss!';
      await pipe.transform(generalRequest, meta);
    } catch (err) {
      expect(err.message.message).toBe(
        'Password must be at least 8 characters long.'
      );
    }
  });
  it('should have an error for having spaces', async () => {
    try {
      generalRequest.confirmationPassword = generalRequest.password =
        'Pass W0Rd!';
      await pipe.transform(generalRequest, meta);
    } catch (err) {
      expect(err.message.message).toBe(
        'Password should not contain any spaces.'
      );
    }
  });
});
