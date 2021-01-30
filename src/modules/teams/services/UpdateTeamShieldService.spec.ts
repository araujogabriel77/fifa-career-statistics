import 'reflect-metadata';
import { v4 } from 'uuid';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeTeamsRepository from '../repositories/fakes/FakeTeamsRepository';
import UpdateTeamShieldService from './UpdateTeamShieldService';
import CreateTeamService from './CreateTeamService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

describe('UpdateTeam', () => {
    it('should be able to update a team shield', async () => {
        const fakeTeamsRepository = new FakeTeamsRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        const createTeam = new CreateTeamService(fakeTeamsRepository);
        const updateTeam = new UpdateTeamShieldService(
            fakeTeamsRepository,
            fakeStorageProvider
        );

        const team = await createTeam.execute({
            name: randomString(10),
            short_name: randomString(3),
            country: randomString(6),
            foundation: '1795',
            user_id: v4()
        });

        const team_id = team.id.toString();
        const shieldFileName = 'gato.png';

        await updateTeam.execute({
            team_id,
            shieldFileName
        });

        expect(team.shield).toEqual(shieldFileName);
    });

    it('should be able to update a existent team shield', async () => {
        const fakeTeamsRepository = new FakeTeamsRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        const createTeam = new CreateTeamService(fakeTeamsRepository);
        const updateTeam = new UpdateTeamShieldService(
            fakeTeamsRepository,
            fakeStorageProvider
        );

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

        await updateTeam.execute({
            team_id,
            shieldFileName: 'cachorro.png'
        });

        expect(team.shield).toEqual('cachorro.png');
        expect(deleteFile).toHaveBeenCalledWith('gato.png')
    });

    it('should not be able to update a team shield with different user id', async () => {
        const fakeTeamsRepository = new FakeTeamsRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        const createTeam = new CreateTeamService(fakeTeamsRepository);
        const updateTeam = new UpdateTeamShieldService(
            fakeTeamsRepository,
            fakeStorageProvider
        );

        const team = await createTeam.execute({
            name: randomString(10),
            short_name: randomString(3),
            country: randomString(6),
            shieldFileName: 'cachorro.png',
            foundation: '1795',
            user_id: v4()
        });

        const team_id = (team.id + 1).toString();

        expect(updateTeam.execute({
            team_id,
            shieldFileName: 'gato.png'
        })).rejects.toBeInstanceOf(AppError);
    });
});