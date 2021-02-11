import 'reflect-metadata';

import FakePlayersRepository from '../repositories/fakes/FakePlayersRepository';
import ListPlayerByIdService from './ListPlayerByIdService';
import CreatePlayerService from './CreatePlayerService';
import AppError from '@shared/errors/AppErrors';

// import { errors } from 'celebrate';

let fakePlayersRepository: FakePlayersRepository;
let createPlayer: CreatePlayerService;
let listPlayer: ListPlayerByIdService;
5
describe('ListPlayersById', () => {
  beforeEach(() => {
    fakePlayersRepository = new FakePlayersRepository();
    createPlayer = new CreatePlayerService(fakePlayersRepository);
    listPlayer = new ListPlayerByIdService(fakePlayersRepository);
  });

  it('should be able to list a player', async () => {
    const player = await createPlayer.execute({
      name: 'Joca',
      country: 'Brasil',
      position: 'MEI',
      team_id: 1
    });

    const listedPlayer = await listPlayer.execute({
      player_id: player.id
    });

    expect(listedPlayer).toEqual(player);
  });

  it('should not be able to list a player that does not exist', async () => {
    await expect(
      listPlayer.execute({
        player_id: 2222
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
