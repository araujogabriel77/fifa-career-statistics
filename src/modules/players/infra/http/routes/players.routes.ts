import { Router } from 'express';
import { container } from 'tsyringe';

import PlayerRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';
import CreatePlayerService from '@modules/players/services/CreatePlayerService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const playersRouter = Router();

playersRouter.get('/', async (request, response) => {
    const playerRepository = new PlayerRepository();
    const players = await playerRepository.findAll();

    return response.json(players);
});

// lista jogadores do mesmo time => id da rota é o id do time
playersRouter.get('/team/:id', async (request, response) => {
    const playerRepository = new PlayerRepository();
    const { id } = request.params;
    const playerId = Number(id);
    const players = await playerRepository.findPlayerByTeam(playerId);

    return response.json(players);
});

// lista jogadores do mesmo país
playersRouter.get('/:country', async (request, response) => {
    const playerRepository = new PlayerRepository();
    const { country } = request.params;
    const formated_country = country.toLowerCase();

    const players = await playerRepository.findByCountry(formated_country);

    return response.json(players);
});


playersRouter.post('/', ensureAuthenticated, async (request, response) => {
    const createPlayer = container.resolve(CreatePlayerService);

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
        team_id
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
        team_id
    });

    return response.json(player);
})

export default playersRouter;