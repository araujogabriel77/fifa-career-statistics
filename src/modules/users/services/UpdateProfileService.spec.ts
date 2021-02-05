import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

import AppError from '@shared/errors/AppErrors';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider
        );
    });

    it('should be able to update a user profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'jacare',
            email: 'jacare@gmail.com',
            password: 'jacaca'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'jacaca',
            email: 'jacaca@fpss.com.br'
        });

        expect(updatedUser.name).toBe('jacaca')
    });

    it('should not be able to update the profile from a non-existing user', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'non-existing-user-id',
                name: 'Test',
                email: 'test@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to switch to an already used email ', async () => {
        await fakeUsersRepository.create({
            name: 'jocare',
            email: 'jocare@gmail.com',
            password: 'jocaca'
        });

        const user = await fakeUsersRepository.create({
            name: 'jacare',
            email: 'jacare@gmail.com',
            password: 'jacaca'
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'jacaca',
                email: 'jocare@gmail.com'
            })
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'jacare',
            email: 'jacare@gmail.com',
            password: 'jacaca'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'jacaca',
            email: 'jacaca@fpss.com.br',
            old_password: 'jacaca',
            password: '123123'
        });

        expect(updatedUser.password).toBe('123123')
    });

    it('should not be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'jacare',
            email: 'jacare@gmail.com',
            password: 'jacaca'
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'jacaca',
                email: 'jacaca@fpss.com.br',
                password: '123123'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'jacare',
            email: 'jacare@gmail.com',
            password: 'jacaca'
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'jacaca',
                email: 'jacaca@fpss.com.br',
                old_password: 'wrong-old-password',
                password: '123123'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});
