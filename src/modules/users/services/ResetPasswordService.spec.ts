import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

import AppError from '@shared/errors/AppErrors';

describe('ResetPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            fakeHashProvider,
        );
    });

    //FIXME: retornando erro "token expired"
    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'jaca',
            email: 'jaca@gmail.com',
            password: '123456'
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
            password: 'jacarecare',
            token
        });

        const updateUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('jacarecare');
        expect(updateUser?.password).toBe('jacarecare');
    });

    it('should not be able to reset password with no existent token', async () => {
        await expect(
            resetPassword.execute({
                token: 'token inválido',
                password: '123321123321'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password with no existent user', async () => {
        const { token } = await fakeUserTokensRepository.generate(
            'non-existent-user'
        );

        await expect(
            resetPassword.execute({
                token,
                password: '123321123321'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password if passed more than two hours', async () => {
        const user = await fakeUsersRepository.create({
            name: 'jacare',
            email: 'jacaca@gmail.com',
            password: '123456'
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPassword.execute({
                token,
                password: '123321123321'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});
