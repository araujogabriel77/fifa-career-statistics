import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository
        );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'jacare',
            email: 'jacaca@gmail.com',
            password: '66554422jj'
        });

        await sendForgotPasswordEmailService.execute({
            email: 'jacaca@gmail.com'
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover the password using the unexistent email', async () => {
        await expect(sendForgotPasswordEmailService.execute({
            email: 'jacaca@gmail.com'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'jacare',
            email: 'jacaca@gmail.com',
            password: '66554422jj'
        });

        await sendForgotPasswordEmailService.execute({
            email: 'jacaca@gmail.com'
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });

});
