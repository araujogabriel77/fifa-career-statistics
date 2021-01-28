import { Router } from 'express';
import multer from 'multer';

import TeamsController from '../controllers/TeamsController';
import TeamShieldController from '../controllers/TeamShieldController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/uploadShield';

const teamsController = new TeamsController();
const teamShieldController = new TeamShieldController();
const teamsRouter = Router();
const upload = multer(uploadConfig);

teamsRouter.use(ensureAuthenticated);

//GET
teamsRouter.get('/', teamsController.index);

// FIXME: CRIAR OUTRO CONTROLLER
teamsRouter.get('/:country', teamsController.listByCountry);

//POST
teamsRouter.post('/', upload.single('shield'), teamsController.create);

//PATCH
teamsRouter.patch('/update/:id', teamsController.update);

teamsRouter.patch(
    '/update/:id/shield',
    upload.single('avatar'),
    teamShieldController.update
);


export default teamsRouter;