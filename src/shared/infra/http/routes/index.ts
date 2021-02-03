import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import teamsRouter from '@modules/teams/infra/http/routes/teams.routes';
import playersRouter from '@modules/players/infra/http/routes/players.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/teams', teamsRouter);
routes.use('/players', playersRouter);
routes.use('/password', passwordRouter);

export default routes;