import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../../config/upload';

import User from '../../models/User';
import AppError from '../../errors/AppErrors';

interface Request {
    user_id: string;
    avatarFileName: string;
}

class updateUserAvatarService {
    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

        if (!user) {
            throw new AppError('Only authenticated user can change avatar', 401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const avatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (avatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await userRepository.save(user);

        return user;
    }
}

export default updateUserAvatarService;