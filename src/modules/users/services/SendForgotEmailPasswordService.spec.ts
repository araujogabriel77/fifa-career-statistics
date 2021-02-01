import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmail from './SendForgotEmailPasswordService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using the email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new SendForgotPasswordEmail(fakeUsersRepository);

        const userName = randomString(6);

        const user = await createUser.execute({
            name: userName,
            email: `${userName}@gmail.com`,
            password: randomString(8)
        });

        expect(user).toHaveProperty('id');
    });

});
