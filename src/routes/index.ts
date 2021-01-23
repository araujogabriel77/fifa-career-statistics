import { Router } from 'express';
import teamsRouter from './teams.routes';

const routes = Router();

routes.use('/teams', teamsRouter);

export default routes;