import 'reflect-metadata';
import { v4 } from 'uuid';

import FakeTeamsRepository from '../repositories/fakes/FakeTeamsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateTeamService from './UpdateTeamService';
import CreateTeamService from './CreateTeamService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

let fakeTeamsRepository: FakeTeamsRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeCacheProvider: FakeCacheProvider;
let createTeam: CreateTeamService;
let updateTeam: UpdateTeamService;

describe('UpdateTeam', () => {
  beforeEach(() => {
    fakeTeamsRepository = new FakeTeamsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createTeam = new CreateTeamService(
      fakeTeamsRepository,
      fakeStorageProvider,
      fakeCacheProvider
    );
    updateTeam = new UpdateTeamService(fakeTeamsRepository);
  });

  it('should be able to update a team', async () => {
    const team = await createTeam.execute({
      name: 'Flamengo',
      short_name: 'FLA',
      country: 'França',
      foundation: '1795',
      user_id: v4()
    });

    const team_id = team.id.toString();

    const updated_team = await updateTeam.execute({
      team_id,
      name: 'Clube de Regatas Flamengo',
      country: 'Brasil',
      foundation: '1895',
      user_id: team.user_id
    });

    expect(updated_team.name).toBe('clube de regatas flamengo');
    expect(updated_team.country).toBe('brasil');
    expect(updated_team.foundation).toBe('1895');
    expect(updated_team.short_name).toBe('fla');
  });

  it('should not be able to update a team with invalid form fields', async () => {
    const team = await createTeam.execute({
      name: 'Flamengo',
      short_name: 'FLA',
      country: 'França',
      foundation: '1795',
      user_id: v4()
    });

    const team_id = team.id.toString();

    await expect(
      updateTeam.execute({
        team_id,
        name: 'C',
        country: 'Brasil',
        foundation: '1895',
        user_id: team.user_id
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a inexistent team', async () => {
    const team = await createTeam.execute({
      name: 'Flamengo',
      short_name: 'FLA',
      country: 'Brasil',
      foundation: '1795',
      user_id: v4()
    });

    const team_id = (team.id + 500000).toString();

    await expect(
      updateTeam.execute({
        team_id,
        name: 'Flamengo',
        short_name: randomString(3),
        country: randomString(7),
        foundation: '1895',
        user_id: team.user_id
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
