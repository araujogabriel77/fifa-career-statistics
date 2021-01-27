import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated';
import TeamRepository from '@modules/Teams/infra/typeorm/repositories/TeamsRepository';
import CreateTeamService from '@modules/Teams/services/CreateTeamService';
import UpdateTeamService from '@modules/Teams/services/UpdateTeamService';


import uploadConfig from '@config/uploadShield';

const teamsRouter = Router();
const upload = multer(uploadConfig);

teamsRouter.use(ensureAuthenticated);

teamsRouter.get('/', async (request, response) => {
    const teamRepository = getCustomRepository(TeamRepository);
    const teams = await teamRepository.find();

    return response.json(teams);
});

teamsRouter.get('/:country', async (request, response) => {
    const teamRepository = getCustomRepository(TeamRepository);

    const { country } = request.params;

    const ctry = country.toLowerCase();

    const teams = await teamRepository.find({
        where: {
            country: ctry
        }
    })

    return response.json(teams);
});

teamsRouter.post(
    '/',
    upload.single('shield'),
    async (request, response) => {
        const createTeam = new CreateTeamService();

        const {
            name,
            short_name,
            country,
            foundation,
        } = request.body;

        const user_id = request.user.id;
        const shield = request.file.filename;

        const team = await createTeam.execute({
            name,
            short_name,
            country,
            foundation,
            user_id,
            shieldFileName: shield
        });

        return response.json(team);

    });

teamsRouter.patch(
    '/update/:id',
    ensureAuthenticated,
    upload.single('shield'),
    async (request, response) => {
        const updateTeamShield = new UpdateTeamService();

        const {
            name,
            short_name,
            country,
            foundation
        } = request.body;

        const team = await updateTeamShield.execute({
            name,
            short_name,
            country,
            foundation,
            team_id: request.params.id,
            shieldFileName: request.file.filename
        });

        return response.json(team);

    });


export default teamsRouter;