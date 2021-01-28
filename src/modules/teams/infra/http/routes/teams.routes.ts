import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TeamsRepository from '@modules/teams/infra/typeorm/repositories/TeamsRepository';

import CreateTeamService from '@modules/teams/services/CreateTeamService';
import UpdateTeamService from '@modules/teams/services/UpdateTeamService';
import UpdateTeamShieldService from '@modules/teams/services/UpdateTeamShieldService';

import uploadConfig from '@config/uploadShield';

const upload = multer(uploadConfig);

const teamsRouter = Router();


teamsRouter.use(ensureAuthenticated);


teamsRouter.get('/', async (request, response) => {
    const teamsRepository = new TeamsRepository();
    const teams = await teamsRepository.findAll();

    return response.json(teams);
});

teamsRouter.get('/:country', async (request, response) => {
    const teamsRepository = new TeamsRepository();
    const { country } = request.params;

    const formated_country = country.toLowerCase();

    const teams = await teamsRepository.findByCountry(formated_country)

    return response.json(teams);
});

teamsRouter.post(
    '/',
    upload.single('shield'),
    async (request, response) => {
        const createTeam = container.resolve(CreateTeamService);

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

teamsRouter.patch('/update/:id', async (request, response) => {
    const updateTeam = container.resolve(UpdateTeamService);

    const {
        name,
        short_name,
        country,
        foundation
    } = request.body;

    const team = await updateTeam.execute({
        name,
        short_name,
        country,
        foundation,
        team_id: request.params.id,
    });

    return response.json(team);

});

teamsRouter.patch('/update/:id/shield', upload.single('avatar'), async (request, response) => {
    const updateTeamShield = container.resolve(UpdateTeamShieldService);

    const team = await updateTeamShield.execute({
        team_id: request.params.id,
        shieldFileName: request.file.filename
    });

    return response.json(team);

});


export default teamsRouter;