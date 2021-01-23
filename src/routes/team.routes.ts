import { Router } from 'express';

import CreateTeamService from '../services/Team/CreateTeamService';
import TeamRepository from '../repositories/TeamsRepository';

const teamRouter = Router();
const teamRepository = new TeamRepository();

teamRouter.get('/', (request, response) => {
    const teams = teamRepository.all();

    return response.json(teams);
});

teamRouter.post('/', (request, response) => {
    try {
        const {
            name,
            short_name,
            country,
            foundation_year
        } = request.body;


        const createTeam = new CreateTeamService(teamRepository);

        const team = createTeam.execute({
            name,
            short_name,
            country,
            foundation_year
        });

        return response.json(team);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }

});


export default teamRouter;