import { Router } from 'express';

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
playersRouter.post('/', ensureAuthenticated, playersController.create);

// rota de atualização de jogadores
playersRouter.put('/:id', ensureAuthenticated, playersController.update)

export default playersRouter;