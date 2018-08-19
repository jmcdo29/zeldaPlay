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
    test('it should error for mismatching passwords', () => {
      expect.assertions(1);
      return signUp(email, 'does not', 'match').catch((err) => {
        expect(err.message).toEqual(
          expect.stringContaining('Confirmation password does not match.')
        );
      });
    });
    test('it should error for too short of a password', () => {
      expect.assertions(1);
      return signUp(email, 'short', 'short').catch((err) => {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password must be at least eight (8) characters long.'
          )
        );
      });
    });
    test('it should error for no CAPITAL letter', () => {
      expect.assertions(1);
      return signUp(email, 'nocaps', 'nocaps').catch((err) => {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password must contain at least one uppercase character.'
          )
        );
      });
    });
    test('SHOULD ERROR FOR NO lowercase LETTER', () => {
      expect.assertions(1);
      return signUp(email, 'ALLCAPS', 'ALLCAPS').catch((err) => {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password must contain at least one lowercase character.'
          )
        );
      });
    });
    test('should error for no $pec!@l character', () => {
      expect.assertions(1);
      return signUp(email, 'noSpecial', 'noSpecail').catch((err) => {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password must contain at least one special character.'
          )
        );
      });
    });
    test('should error for having a space', () => {
      expect.assertions(1);
      return signUp(email, 'has spaces', 'has spaces').catch((err) => {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password should not contain any spaces.'
          )
        );
      });
    });
    test('should error due to no numbers', () => {
      expect.assertions(1);
      return signUp(email, 'noNumbers', 'noNumbers').catch((err) => {
        expect(err.message).toEqual(
          expect.stringContaining(
            'Your password must contain at least one number.'
          )
        );
      });
    });
    test('should fail due to duplicate email', () => {
      expect.assertions(1);
      return User.query()
        .insertAndFetch({
          email: 'testing@test.test',
          password: 'reallyWeak'
        })
        .then((user) => {
          return signUp(user.email, 'reallyWeak!4', 'reallyWeak!4');
        })
        .catch((err) => {
          expect(err.message).toBe(
            'Email already in use. Please log in or use a new email.'
          );
          return User.query()
            .delete()
            .where({
              email: 'testing@test.test'
            });
        })
        .then(() => {
          return;
        });
    });
    test('should allow user to register', () => {
      expect.assertions(1);
      return signUp(email, 'It$allg00d', 'It$allg00d')
        .then((user) => {
          const tempUser = user;
          return Promise.all([
            User.query()
              .delete()
              .where({
                id: user.id
              }),
            Promise.resolve(tempUser)
          ]);
        })
        .then((results) => {
          const testUser = results[1];
          expect(testUser).toBeTruthy();
        })
        .catch((err) => {
          console.log('Should not be here.');
          console.error(err.message);
        });
    });
  });

  describe('#UserLogin', () => {
    const goodPass = 'notGood';
    // create user for testing purposes
    beforeAll(() => {
      return User.query()
        .insert({
          email,
          password: hashSync(goodPass)
        })
        .then(() => {
          return;
        });
    });
    // delete test user
    afterAll(() => {
      return User.query()
        .delete()
        .where({ email })
        .then(() => {});
    });
    test('should not log in due to wrong password', () => {
      expect.assertions(2);
      return login(email, goodPass + 'bad').catch((err) => {
        expect(err.message).toBe('Username or password is incorrect.');
        expect(err.reasonCode).toBe('INCORRECT_PASSWORD');
      });
    });
    test('should not log in with wrong email', () => {
      expect.assertions(2);
      return login('wrongEmail.test@unknown', goodPass).catch((err) => {
        expect(err.message).toBe('Username or password is incorrect.');
        expect(err.reasonCode).toBe('NO_USER_FOUND');
      });
    });
    test('should log in with correct password', () => {
      expect.assertions(1);
      return login(email, goodPass).then((user) => {
        expect(user).toBeTruthy();
      });
    });
  });
});
