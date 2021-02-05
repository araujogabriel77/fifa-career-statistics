import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;


describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    })

    it('should be able to create a new user', async () => {
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
        const user = await createUser.execute({
            name: 'user',
            email: 'user@gmail.com',
            password: randomString(8)
        });

        await expect(createUser.execute({
            name: user.name,
            email: user.email,
            password: randomString(8)
        })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a user with invalid characters size', async () => {
        await expect(createUser.execute({
            name: randomString(2),
            email: randomString(3),
            password: randomString(2)
        })
        ).rejects.toBeInstanceOf(AppError);
    });

});
