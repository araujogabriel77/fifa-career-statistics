import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'jacare',
            email: 'jacaca@gmail.com',
            password: '123456'
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        await resetPassword.execute({
            token,
            password: 'jacarecare'
        });

        expect(user.password).toEqual('jacarecare');
    });

});
