import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        authUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    });

    it('should be able to authenticate', async () => {
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
        const userName = randomString(6);
        const email = `${userName}@gmail.com`;
        const password = 'jacare';

        await createUser.execute({
            name: userName,
            email,
            password,
        });

        await expect(authUser.execute({ email, password: 'jacaca' }))
            .rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with non existent user', async () => {
        const email = 'jacare@gmail.com';
        const password = 'jacaca';

        await expect(authUser.execute({ email, password }))
            .rejects.toBeInstanceOf(AppError);
    });

});
