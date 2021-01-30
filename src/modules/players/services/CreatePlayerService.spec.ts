import 'reflect-metadata';

import FakePlayersRepository from '../repositories/fakes/FakePlayersRepository';
import CreatePlayerService from './CreatePlayerService';

import AppError from '@shared/errors/AppErrors';

describe('CreatePlayer', () => {
    it('should be able to create a new player', async () => {
        const fakePlayersRepository = new FakePlayersRepository();
        const createPlayer = new CreatePlayerService(fakePlayersRepository);

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
        const fakePlayersRepository = new FakePlayersRepository();
        const createPlayer = new CreatePlayerService(fakePlayersRepository);

        expect(createPlayer.execute({
            name: 'a',
            country: 'a',
            position: 'I',
            team_id: 1
        })).rejects.toBeInstanceOf(AppError);
    });

});
