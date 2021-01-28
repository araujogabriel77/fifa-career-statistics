import 'reflect-metadata';
import { v4 } from 'uuid';
import FakeTeamsRepository from '../repositories/fakes/FakeTeamsRepository';
import CreateTeamService from './CreateTeamService';

import randomString from '../utils/randomString';

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
        expect(typeof team.id).toBe(Number);
    });

});