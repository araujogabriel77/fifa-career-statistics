import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/uploadAvatar';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppErrors';

interface IRequest {
    user_id: string;
    avatarFileName: string;
}

@injectable()
class updateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Only authenticated user can change avatar', 401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory.avatar, user.avatar);

            const avatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (avatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await this.usersRepository.save(user);

        return user;
    }
}

export default updateUserAvatarService;