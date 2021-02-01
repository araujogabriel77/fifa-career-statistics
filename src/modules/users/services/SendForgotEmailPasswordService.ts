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
class SendForgotEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ name, email, password }: IRequest): Promise<void> {

    }
}

export default SendForgotEmailService;