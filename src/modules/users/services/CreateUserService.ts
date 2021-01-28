import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppErrors';
import validateUserFormFields from '../utils/validateUserFormFields';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkIfUserExists = await this.usersRepository.findByEmail(email);

        if (checkIfUserExists) {
            throw new AppError('Email address already used');
        }

        const hashedPassword = await hash(password, 12);

        const invalidFormFields = validateUserFormFields({ name, email, password });

        if (invalidFormFields) {
            throw new AppError(`${invalidFormFields}`);
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return user;
    }
}

export default CreateUserService;