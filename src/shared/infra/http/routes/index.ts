import { Router } from 'express';

import usersRouter from '@modules/Users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/Users/infra/http/routes/sessions.routes';
import teamsRouter from '@modules/Teams/infra/http/routes/teams.routes';
import playersRouter from '@modules/Players/infra/http/routes/players.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/teams', teamsRouter);
routes.use('/players', playersRouter);

export default routes;