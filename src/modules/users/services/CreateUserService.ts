import { injectable, inject } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppErrors';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const formatedEmail = email.toString();
    const checkIfUserExists = await this.usersRepository.findByEmail(formatedEmail);

    if (checkIfUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return user;
  }
}

export default CreateUserService;
