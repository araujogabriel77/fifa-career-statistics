import 'reflect-metadata';
import { v4 } from 'uuid';

import FakeTeamsRepository from '../repositories/fakes/FakeTeamsRepository';
import UpdateTeamService from './UpdateTeamService';
import CreateTeamService from './CreateTeamService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

describe('UpdateTeam', () => {
    it('should be able to update a team', async () => {
        const fakeTeamsRepository = new FakeTeamsRepository();
        const createTeam = new CreateTeamService(fakeTeamsRepository);
        const updateTeam = new UpdateTeamService(fakeTeamsRepository);

        const teamName = 'Flamengo';

        const team = await createTeam.execute({
            name: teamName,
            short_name: 'FLA',
            country: 'França',
            foundation: '1795',
            user_id: v4()
        });

        const team_id = team.id.toString();

        const updated_team = await updateTeam.execute({
            team_id,
            name: 'Clube de Regatas Flamengo',
            short_name: '',
            country: 'Brasil',
            foundation: '1895',
        });

        expect(updated_team.name).toBe('clube de regatas flamengo');
        expect(updated_team.country).toBe('brasil');
        expect(updated_team.foundation).toBe('1895');
        expect(updated_team.short_name).toBe('fla');
    });

    it('should not be able to update a team', async () => {
        const fakeTeamsRepository = new FakeTeamsRepository();
        const createTeam = new CreateTeamService(fakeTeamsRepository);
        const updateTeam = new UpdateTeamService(fakeTeamsRepository);

        const teamName = 'Flamengo';

        const team = await createTeam.execute({
            name: teamName,
            short_name: 'FLA',
            country: 'Brasil',
            foundation: '1795',
            user_id: v4()
        });

        const team_id = (team.id + 1).toString();

        expect(
            updateTeam.execute({
                team_id,
                name: teamName,
                short_name: randomString(3),
                country: randomString(7),
                foundation: '1895',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});