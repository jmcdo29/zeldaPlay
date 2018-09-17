import { hashSync } from 'bcryptjs';
import * as Knex from 'knex';
import { Model } from 'objection';
import { User } from '../../src/db/models/user_schema';
import { login, signUp } from '../../src/services/user.service';
import { conn } from '../dbConnection';
const email = 'someemail@asdf.com';

describe('#UserServerService', () => {
  beforeAll(() => {
    Model.knex(Knex(conn));
  });
  // kill database connection
  afterAll(() => {
    Model.knex().destroy();
  });
  describe('#UserRegister', () => {
    test('it should error for mismatching passwords', async () => {
      try {
        expect.assertions(1);
        await signUp(email, 'does not', 'match');
      } catch (err) {
        expect(err.message).toEqual(
          expect.stringContaining('Confirmation password does not match.')
        );
      }
    });
    test('it should error for too short of a password', async () => {
      try {
        expect.assertions(1);
        await signUp(email, 'short', 'short');
      } catch (err) {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password must be at least eight (8) characters long.'
          )
        );
      }
    });
    test('it should error for no CAPITAL letter', async () => {
      try {
        expect.assertions(1);
        await signUp(email, 'nocaps', 'nocaps');
      } catch (err) {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password must contain at least one uppercase character.'
          )
        );
      }
    });
    test('SHOULD ERROR FOR NO lowercase LETTER', async () => {
      try {
        expect.assertions(1);
        await signUp(email, 'ALLCAPS', 'ALLCAPS');
      } catch (err) {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password must contain at least one lowercase character.'
          )
        );
      }
    });
    test('should error for no $pec!@l character', async () => {
      try {
        expect.assertions(1);
        await signUp(email, 'noSpecial', 'noSpecail');
      } catch (err) {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password must contain at least one special character.'
          )
        );
      }
    });
    test('should error for having a space', async () => {
      try {
        expect.assertions(1);
        await signUp(email, 'has spaces', 'has spaces');
      } catch (err) {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password should not contain any spaces.'
          )
        );
      }
    });
    test('should error due to no numbers', async () => {
      try {
        expect.assertions(1);
        await signUp(email, 'noNumbers', 'noNumbers');
      } catch (err) {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password must contain at least one number.'
          )
        );
      }
    });
    test('should fail due to duplicate email', async () => {
      try {
        expect.assertions(1);
        const user = await User.query().insertAndFetch({
          email: 'testing@test.test',
          password: 'reallyWeak'
        });
        await signUp(user.email, 'reallyWeak!4', 'reallyWeak!4');
      } catch (err) {
        expect(err.message).toBe(
          'Email already in use. Please log in or use a new email.'
        );
        await User.query()
          .delete()
          .where({
            email: 'testing@test.test'
          });
      }
    });
    test('should allow user to register', async () => {
      try {
        expect.assertions(2);
        const user = await signUp(email, 'It$allg00d', 'It$allg00d');
        const tempUser = user;
        await User.query()
          .delete()
          .where({
            id: user.id
          });
        expect(tempUser).toBeTruthy();
        expect(user.id).toBeTruthy();
      } catch (err) {
        console.log('Should not be here.');
        console.error(err.message);
      }
    });
  });

  describe('#UserLogin', () => {
    const goodPass = 'notGood';
    // create user for testing purposes
    beforeAll(async () => {
      await User.query().insert({
        email,
        password: hashSync(goodPass)
      });
    });
    // delete test user
    afterAll(async () => {
      await User.query()
        .delete()
        .where({ email });
    });
    test('should not log in due to wrong password', async () => {
      try {
        expect.assertions(2);
        await login(email, goodPass + 'bad');
      } catch (err) {
        expect(err.message).toBe('Username or password is incorrect.');
        expect(err.reasonCode).toBe('INCORRECT_PASSWORD');
      }
    });
    test('should not log in with wrong email', async () => {
      try {
        expect.assertions(2);
        await login('wrongEmail.test@unknown', goodPass);
      } catch (err) {
        expect(err.message).toBe('Username or password is incorrect.');
        expect(err.reasonCode).toBe('NO_USER_FOUND');
      }
    });
    test('should log in with correct password', async () => {
      try {
        expect.assertions(1);
        const user = await login(email, goodPass);
        expect(user).toBeTruthy();
      } catch (err) {
        console.error(err);
      }
    });
  });
});
