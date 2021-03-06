import 'reflect-metadata';

import FakePlayersRepository from '../repositories/fakes/FakePlayersRepository';
import CreatePlayerService from './CreatePlayerService';
import UpdatePlayerService from './UpdatePlayerService';
import AppError from '@shared/errors/AppErrors';
import { errors } from 'celebrate';

let fakePlayersRepository: FakePlayersRepository;
let createPlayer: CreatePlayerService;
let updatePlayer: UpdatePlayerService;

describe('UpdatePlayer', () => {
  beforeEach(() => {
    fakePlayersRepository = new FakePlayersRepository();
    createPlayer = new CreatePlayerService(fakePlayersRepository);
    updatePlayer = new UpdatePlayerService(fakePlayersRepository);
  });

  it('should be able to update a player', async () => {
    const player = await createPlayer.execute({
      name: 'Joca',
      country: 'Brasil',
      position: 'MEI',
      team_id: 1
    });

    await updatePlayer.execute({
      id: player.id.toString(),
      name: 'João Carlos',
      country: 'Brasil',
      position: 'ATA'
    });

    expect(player.name).toBe('joão carlos');
    expect(player.position).toBe('ata');
  });

  it('should not be able to update a player that does not exist', async () => {
    await expect(
      updatePlayer.execute({
        id: '89875454654asd',
        name: 'João Carlos',
        country: 'Brasil',
        position: 'ATA'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a player with invalid inputs', async () => {
    const player = await createPlayer.execute({
      name: 'Joca',
      country: 'Brasil',
      position: 'MEI',
      team_id: 1
    });

    await expect(updatePlayer.execute({
      id: player.id.toString(),
      name: 'a',
      country: 'a',
      position: 'I',
      team_id: 1
    })).rejects.toBeInstanceOf(errors);
  });

});
