import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PlayersController from '../controllers/PlayersControllers';
import PlayerByIdController from '../controllers/PlayerByIdController';
import PlayersByCountryController from '../controllers/PlayersByCountryController';
import PlayersByTeamController from '../controllers/PlayersByTeamController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const playersController = new PlayersController();
const playerByIdController = new PlayerByIdController();
const playersByCountryController = new PlayersByCountryController();
const playersByTeamController = new PlayersByTeamController();
const playersRouter = Router();

playersRouter.get('/', playersController.index);

// lista jogadores do mesmo time => id da rota é o id do time
playersRouter.get('/team/:id', playersByTeamController.index);

// lista o jogador pelo id indicado na rota
playersRouter.get('/:id', playerByIdController.index);

// lista jogadores por país
playersRouter.get('/:country', playersByCountryController.index);

// rota de criação de jogadores
playersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(3).max(30).required(),
    country: Joi.string().min(3).max(20).required(),
    birth_date: Joi.date().required(),
    position: Joi.string().length(3).required(),
    first_overall: Joi.number().min(1).max(99).default(40),
    current_overall: Joi.number().min(1).max(99).default(50),
    games_played: Joi.number().min(0).default(0),
    goals: Joi.number().min(0).default(0),
    assists: Joi.number().min(0).default(0),
    clean_sheets: Joi.number().min(0).default(0),
    team_id: Joi.number().required()
  }
}), ensureAuthenticated, playersController.create);

// rota de atualização de jogadores
playersRouter.put('/:id', celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(3).max(30).optional(),
    country: Joi.string().min(3).max(20).optional(),
    birth_date: Joi.date().optional(),
    position: Joi.string().length(3).optional(),
    first_overall: Joi.number().min(1).max(99).optional(),
    current_overall: Joi.number().min(1).max(99).optional(),
    games_played: Joi.number().min(0).optional(),
    goals: Joi.number().min(0).optional(),
    assists: Joi.number().min(0).optional(),
    clean_sheets: Joi.number().min(0).optional(),
    team_id: Joi.number().optional()
  }
}), ensureAuthenticated, playersController.update)

export default playersRouter;
