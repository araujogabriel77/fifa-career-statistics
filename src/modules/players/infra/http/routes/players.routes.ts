import { Router } from 'express';

import PlayersController from '../controllers/PlayersControllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const playersController = new PlayersController();
const playersRouter = Router();

playersRouter.get('/', playersController.index);

// lista jogadores do mesmo time => id da rota é o id do time
// TODO: CRIAR CONTROLLER SEPARADO
playersRouter.get('/team/:id', playersController.listById);

// lista jogadores do mesmo país
// TODO: CRIAR CONTROLLER SEPARADO
playersRouter.get('/:country', playersController.listByCountry);

playersRouter.post('/', ensureAuthenticated, playersController.create)

export default playersRouter;