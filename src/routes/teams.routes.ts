import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TeamRepository from '../repositories/TeamsRepository';
import CreateTeamService from '../services/Team/CreateTeamService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const teamsRouter = Router();

teamsRouter.use(ensureAuthenticated);

teamsRouter.get('/', async (request, response) => {

    const teamRepository = getCustomRepository(TeamRepository);
    const teams = await teamRepository.find();

    return response.json(teams);
});

teamsRouter.post('/', async (request, response) => {
    const {
        name,
        short_name,
        country,
        foundation,
        user_id
    } = request.body;

    const createTeam = new CreateTeamService();

    const team = await createTeam.execute({
        name,
        short_name,
        country,
        foundation,
        user_id
    });

    return response.json(team);

});


export default teamsRouter;