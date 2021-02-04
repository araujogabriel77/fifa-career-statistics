import 'reflect-metadata';
import { v4 } from 'uuid';

import FakeTeamsRepository from '../repositories/fakes/FakeTeamsRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import CreateTeamService from './CreateTeamService';

import randomString from '../utils/randomString';
import AppError from '@shared/errors/AppErrors';

let fakeTeamsRepository: FakeTeamsRepository;
let fakeStorageProvider: FakeStorageProvider;
let createTeam: CreateTeamService;

describe('CreateTeam', () => {
    beforeEach(() => {
        fakeTeamsRepository = new FakeTeamsRepository();
        fakeStorageProvider = new FakeStorageProvider();
        createTeam = new CreateTeamService(fakeTeamsRepository, fakeStorageProvider);
    });

    it('should be able to create a new team', async () => {
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
        const createdTeam = await createTeam.execute({
            name: 'Manchester United',
            short_name: randomString(3),
            country: randomString(7),
            foundation: '1898',
            user_id: v4()
        });

        await expect(
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
        await expect(
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