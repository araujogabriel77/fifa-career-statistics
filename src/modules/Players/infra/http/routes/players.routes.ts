import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import PlayerRepository from '@modules/Players/repositories/PlayersRepository';
import CreatePlayerService from '@modules/Players/services/CreatePlayerService';

import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated';

const playersRouter = Router();

playersRouter.get('/', async (request, response) => {
    const playerRepository = getCustomRepository(PlayerRepository);

    const players = await playerRepository.find();

    return response.json(players);
});

// lista jogadores do mesmo time => id da rota é o id do time
playersRouter.get('/team/:id', async (request, response) => {
    const playerRepository = getCustomRepository(PlayerRepository);

    const { id } = request.params;

    const players = await playerRepository.find({
        where: {
            team_id: id
        }
    });

    return response.json(players);
});

// lista jogadores do mesmo país
playersRouter.get('/:country', async (request, response) => {
    const playerRepository = getCustomRepository(PlayerRepository);

    const { country } = request.params;

    const ctry = country.toLowerCase();

    const players = await playerRepository.find({
        where: {
            country: ctry
        }
    });

    return response.json(players);
});


playersRouter.post('/', ensureAuthenticated, async (request, response) => {
    const createPlayer = new CreatePlayerService();

    const {
        name,
        country,
        birth_date,
        position,
        first_overall,
        current_overall,
        games_played,
        goals,
        assists,
        clean_sheets,
        team_name
    } = request.body;

    const player = await createPlayer.execute({
        name,
        country,
        birth_date,
        position,
        first_overall,
        current_overall,
        games_played,
        goals,
        assists,
        clean_sheets,
        team_name
    });

    return response.json(player);
})

export default playersRouter;