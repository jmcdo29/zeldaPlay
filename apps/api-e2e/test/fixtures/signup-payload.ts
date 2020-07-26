import { SignupDTO } from 'apps/api/src/app/auth/models';

export const signupPayload: SignupDTO = {
  email: 'test@test.com' + Math.round(Math.random() * 1000),
  password: 'Passw0rd!',
  confirmationPassword: 'Passw0rd!',
  firstName: 'Test',
  lastName: 'Test',
  consentToEmail: true,
  role: ['player'],
};
