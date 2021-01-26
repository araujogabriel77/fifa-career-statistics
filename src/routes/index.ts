import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import teamsRouter from './teams.routes';
import playersRouter from './players.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/teams', teamsRouter);
routes.use('/players', playersRouter);

export default routes;