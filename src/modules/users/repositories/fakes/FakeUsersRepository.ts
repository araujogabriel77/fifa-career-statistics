import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';
import { v4 } from 'uuid';

class FakeUserRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);

        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: v4() }, userData);

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const userIndex = this.users.findIndex(findUser => findUser.id === user.id);

        this.users[userIndex] = user;

        return user;
    }
}

export default FakeUserRepository;