import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const userName = randomString(6);

        const user = await createUser.execute({
            name: userName,
            email: `${userName}@gmail.com`,
            password: randomString(8)
        });

        expect(user).toHaveProperty('id');
        expect(user.name).toBe(userName);
    });

    it('should not be able to create a user with same email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'user',
            email: 'user@gmail.com',
            password: randomString(8)
        });

        expect(createUser.execute({
            name: user.name,
            email: user.email,
            password: randomString(8)
        })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a user with invalid characters size', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        expect(createUser.execute({
            name: randomString(2),
            email: randomString(3),
            password: randomString(2)
        })
        ).rejects.toBeInstanceOf(AppError);
    });

});
