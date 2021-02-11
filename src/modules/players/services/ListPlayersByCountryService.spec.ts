import 'reflect-metadata';

import FakePlayersRepository from '../repositories/fakes/FakePlayersRepository';
import ListPlayerByCountryService from './ListPlayersByCountryService';
import CreatePlayerService from './CreatePlayerService';
import AppError from '@shared/errors/AppErrors';

// import { errors } from 'celebrate';

let fakePlayersRepository: FakePlayersRepository;
let createPlayer: CreatePlayerService;
let listPlayerByCountry: ListPlayerByCountryService;

describe('ListPlayersByCountry', () => {
  beforeEach(() => {
    fakePlayersRepository = new FakePlayersRepository();
    createPlayer = new CreatePlayerService(fakePlayersRepository);
    listPlayerByCountry = new ListPlayerByCountryService(fakePlayersRepository);
  });

  it('should be able to list a player of informed country', async () => {
    const country = 'brasil';

    const player = await createPlayer.execute({
      name: 'Joca',
      country,
      position: 'MEI',
      team_id: 1
    });

    console.log(player.country);

    const listedPlayers = await listPlayerByCountry.execute({ country });

    expect(listedPlayers).toContain(player);
  });

  it('should not be able to list a player that does not exist', async () => {
    await expect(
      listPlayerByCountry.execute({ country: 'brasil' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
