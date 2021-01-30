import 'reflect-metadata';
import { v4 } from 'uuid';

import FakeTeamsRepository from '../repositories/fakes/FakeTeamsRepository';
import CreateTeamService from './CreateTeamService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

describe('CreateTeam', () => {
    it('should be able to create a new team', async () => {
        const fakeTeamsRepository = new FakeTeamsRepository();
        const createTeam = new CreateTeamService(fakeTeamsRepository);

        const team = await createTeam.execute({
            name: randomString(8),
            short_name: randomString(3),
            country: randomString(7),
            foundation: '1898',
            user_id: v4()
        });

        expect(team).toHaveProperty('id');
        expect(team.foundation).toBe('1898');
    });

    it('should not be able to create a team with same name', async () => {
        const fakeTeamsRepository = new FakeTeamsRepository();
        const createTeam = new CreateTeamService(fakeTeamsRepository);

        const createdTeam = await createTeam.execute({
            name: 'Manchester United',
            short_name: randomString(3),
            country: randomString(7),
            foundation: '1898',
            user_id: v4()
        });

        expect(
            createTeam.execute({
                name: createdTeam.name,
                short_name: randomString(3),
                country: randomString(7),
                foundation: '1898',
                user_id: v4()
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a team with invalid characters size', async () => {
        const fakeTeamsRepository = new FakeTeamsRepository();
        const createTeam = new CreateTeamService(fakeTeamsRepository);

        expect(
            createTeam.execute({
                name: randomString(2),
                short_name: randomString(4),
                country: randomString(7),
                foundation: randomString(5),
                user_id: v4()
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});