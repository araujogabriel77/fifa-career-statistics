import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import TeamRepository from '../repositories/TeamsRepository';
import CreateTeamService from '../services/Team/CreateTeamService';
import UpdateTeamService from '../services/Team/UpdateTeamService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/uploadShield';

const teamsRouter = Router();
const upload = multer(uploadConfig);

teamsRouter.use(ensureAuthenticated);

teamsRouter.get('/', async (request, response) => {

    const teamRepository = getCustomRepository(TeamRepository);
    const teams = await teamRepository.find();

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


// Por enquanto só atualiza o escudo do time
teamsRouter.patch(
    '/shield/:id',
    ensureAuthenticated,
    upload.single('shield'),
    async (request, response) => {

        const updateTeamShield = new UpdateTeamService();

        const team = await updateTeamShield.execute({
            team_id: request.params.id,
            shieldFileName: request.file.filename
        });

        return response.json(team);

    });


export default teamsRouter;