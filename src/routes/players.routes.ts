import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import PlayerRepository from '../repositories/PlayersRepository';
import CreatePlayerService from '../services/Player/CreatePlayerService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const playersRouter = Router();

playersRouter.get('/', async (request, response) => {
    const playerRepository = getCustomRepository(PlayerRepository);

    const players = await playerRepository.find();

    return response.json(players);
});

playersRouter.post('/', ensureAuthenticated, async (request, response) => {
    const createPlayer = new CreatePlayerService();

    const {
        name,
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