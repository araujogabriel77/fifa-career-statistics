import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import AppError from '@shared/errors/AppErrors';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();
        updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider
        );
    });
    it('should be able to update a user avatar', async () => {
        const user = await fakeUsersRepository.create({
            name: 'jacare',
            email: 'jacare@gmail.com',
            password: 'jacaca'
        });

        const avatarFileName = 'jacaronga.png';

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName
        });

        expect(user.avatar).toEqual(avatarFileName);
    });

    it('should be able to update a existent avatar', async () => {
        const user = await fakeUsersRepository.create({
            name: 'jacare',
            email: 'jacare@gmail.com',
            password: 'jacaca'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'jacaronga.png'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'jacaca.png'
        });

        expect(user.avatar).toEqual('jacaca.png');
    });

    it('should not be able to update avatar from non existent user', async () => {
        const avatarFileName = 'jacaronga.png';

        await expect(updateUserAvatar.execute({
            user_id: 'blablabla-no',
            avatarFileName
        })
        ).rejects.toBeInstanceOf(AppError);
    });

});
