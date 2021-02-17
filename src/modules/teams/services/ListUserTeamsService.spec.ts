import 'reflect-metadata';
import { v4 } from 'uuid';

import FakeTeamsRepository from '../repositories/fakes/FakeTeamsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import ListUserTeamsService from './ListUserTeamsService';
import CreateTeamService from './CreateTeamService';

import AppError from '@shared/errors/AppErrors';

let fakeTeamsRepository: FakeTeamsRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeCacheProvider: FakeCacheProvider;
let createTeam: CreateTeamService;
let listUserTeams: ListUserTeamsService;

describe('listUserTeams', () => {
  beforeEach(() => {
    fakeTeamsRepository = new FakeTeamsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createTeam = new CreateTeamService(
      fakeTeamsRepository,
      fakeStorageProvider,
      fakeCacheProvider
    );
    listUserTeams = new ListUserTeamsService(fakeTeamsRepository, fakeCacheProvider);
  });

  it('should be able to list all user´s teams', async () => {
    const user_id = v4();
    await createTeam.execute({
      name: 'Flamengo',
      short_name: 'FLA',
      country: 'Brasil',
      foundation: '1795',
      user_id
    });

    const team_list = await listUserTeams.execute({ user_id });

    expect(team_list.length).toBe(1);
  });

  it('should be able to list an empty array of teams', async () => {
    const user_id = v4();

    const team_list = await listUserTeams.execute({ user_id });

    expect(team_list.length).toBe(0);
  });

});
