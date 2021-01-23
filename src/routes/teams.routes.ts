import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TeamRepository from '../repositories/TeamsRepository';
import CreateTeamService from '../services/Team/CreateTeamService';

const teamRouter = Router();

teamRouter.get('/', async (request, response) => {
    const teamRepository = getCustomRepository(TeamRepository);
    const teams = await teamRepository.find();

    return response.json(teams);
});

teamRouter.post('/', async (request, response) => {
    try {
        const {
            name,
            short_name,
            country,
            foundation
        } = request.body;

        const createTeam = new CreateTeamService();

        const team = await createTeam.execute({
            name,
            short_name,
            country,
            foundation
        });

        return response.json(team);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }

});


export default teamRouter;