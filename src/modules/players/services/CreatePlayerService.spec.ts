import 'reflect-metadata';

import FakePlayersRepository from '../repositories/fakes/FakePlayersRepository';
import CreatePlayerService from './CreatePlayerService';
import AppError from '@shared/errors/AppErrors';

let fakePlayersRepository: FakePlayersRepository;
let createPlayer: CreatePlayerService;

describe('CreatePlayer', () => {
    beforeEach(() => {
        fakePlayersRepository = new FakePlayersRepository();
        createPlayer = new CreatePlayerService(fakePlayersRepository);
    });

    it('should be able to create a new player', async () => {
        const player = await createPlayer.execute({
            name: 'Joca',
            country: 'Brasil',
            position: 'MEI',
            team_id: 1
        });

        expect(player).toHaveProperty('id');
        expect(player.position).toBe('mei');
    });

    it('should not be able to create a player with invalid inputs', async () => {
        await expect(createPlayer.execute({
            name: 'a',
            country: 'a',
            position: 'I',
            team_id: 1
        })).rejects.toBeInstanceOf(AppError);
    });

});
