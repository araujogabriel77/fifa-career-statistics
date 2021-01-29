import 'reflect-metadata';
import { v4 } from 'uuid';

import FakeTeamsRepository from '../repositories/fakes/FakeTeamsRepository';
import UpdateTeamShieldService from './UpdateTeamShieldService';
import CreateTeamService from './CreateTeamService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

describe('UpdateTeam', () => {
    it('should be able to update a team shield', async () => {
        const fakeTeamsRepository = new FakeTeamsRepository();
        const createTeam = new CreateTeamService(fakeTeamsRepository);
        const updateTeam = new UpdateTeamShieldService(fakeTeamsRepository);

        const team = await createTeam.execute({
            name: randomString(10),
            short_name: randomString(3),
            country: randomString(6),
            foundation: '1795',
            user_id: v4()
        });

        const team_id = team.id.toString();

        const updated_team = await updateTeam.execute({
            team_id,
            shieldFileName: 'gato.png'
        });

        expect(updated_team.shield).toContain('gato.png');
    });

    it('should be able to update a team shield', async () => {
        const fakeTeamsRepository = new FakeTeamsRepository();
        const createTeam = new CreateTeamService(fakeTeamsRepository);
        const updateTeam = new UpdateTeamShieldService(fakeTeamsRepository);

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