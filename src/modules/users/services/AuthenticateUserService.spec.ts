import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const authUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        const userName = randomString(6);
        const email = `${userName}@gmail.com`;
        const password = randomString(8);

        await createUser.execute({
            name: userName,
            email,
            password,
        });

        const response = await authUser.execute({ email, password });

        expect(response).toHaveProperty('token');
    });

    it('should not be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const authUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        const userName = randomString(6);
        const email = `${userName}@gmail.com`;
        const password = randomString(8);

        const user = await createUser.execute({
            name: userName,
            email,
            password,
        });

        const response = await authUser.execute({ email, password });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const authUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        const userName = randomString(6);
        const email = `${userName}@gmail.com`;
        const password = 'jacare';

        const user = await createUser.execute({
            name: userName,
            email,
            password,
        });

        expect(authUser.execute({ email, password: 'jacaca' }))
            .rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with non existent user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        const email = 'jacare@gmail.com';
        const password = 'jacaca';

        expect(authUser.execute({ email, password }))
            .rejects.toBeInstanceOf(AppError);
    });

});
