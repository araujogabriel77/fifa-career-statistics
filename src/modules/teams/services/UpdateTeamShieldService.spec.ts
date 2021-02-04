import 'reflect-metadata';
import { v4 } from 'uuid';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeTeamsRepository from '../repositories/fakes/FakeTeamsRepository';
import CreateTeamService from './CreateTeamService';
import UpdateTeamShieldService from './UpdateTeamShieldService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

let fakeTeamsRepository: FakeTeamsRepository;
let fakeStorageProvider: FakeStorageProvider;
let createTeam: CreateTeamService;
let updateTeamShieldService: UpdateTeamShieldService;

describe('UpdateTeamShield', () => {
    beforeEach(() => {
        fakeTeamsRepository = new FakeTeamsRepository();
        fakeStorageProvider = new FakeStorageProvider();
        createTeam = new CreateTeamService(fakeTeamsRepository, fakeStorageProvider);
        updateTeamShieldService = new UpdateTeamShieldService(fakeTeamsRepository, fakeStorageProvider);
    });

    it('should be able to update a team shield', async () => {
        const team = await createTeam.execute({
            name: randomString(10),
            short_name: randomString(3),
            country: randomString(6),
            foundation: '1795',
            user_id: v4()
        });

        const team_id = team.id.toString();
        const shieldFileName = 'gato.png';

        await updateTeamShieldService.execute({
            team_id,
            shieldFileName
        });

        expect(team.shield).toEqual(shieldFileName);
    });

    it('should be able to update a existent team shield', async () => {
        const team = await createTeam.execute({
            name: randomString(10),
            short_name: randomString(3),
            country: randomString(6),
            foundation: '1795',
            shieldFileName: 'gato.png',
            user_id: v4()
        });

        const team_id = team.id.toString();
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        await updateTeamShieldService.execute({
            team_id,
            shieldFileName: 'cachorro.png'
        });

        expect(team.shield).toEqual('cachorro.png');
        expect(deleteFile).toHaveBeenCalledWith('gato.png')
    });

    it('should not be able to update a team shield with different user id', async () => {
        const team = await createTeam.execute({
            name: randomString(10),
            short_name: randomString(3),
            country: randomString(6),
            shieldFileName: 'cachorro.png',
            foundation: '1795',
            user_id: v4()
        });

        const team_id = (team.id + 1).toString();

        await expect(updateTeamShieldService.execute({
            team_id,
            shieldFileName: 'gato.png'
        })).rejects.toBeInstanceOf(AppError);
    });
});