import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '@modules/Users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppErrors';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkIfUserExists = await userRepository.findOne({
            where: { email },
        });

        if (checkIfUserExists) {
            throw new AppError('Email address already used');
        }

        const hashedPassword = await hash(password, 12);

        if (name.length < 3) {
            throw new AppError('Username must be at least 3 characters');
        }

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;