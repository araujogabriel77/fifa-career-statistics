import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import Player from '../models/Player';
import PlayerRepository from '../repositories/PlayersRepository';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const playersRouter = Router();

playersRouter.get('/', async (request, response) => {
    const playerRepository = getCustomRepository(PlayerRepository);

    const players = await playerRepository.find();

    return response.json(players);
});