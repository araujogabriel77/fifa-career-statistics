import { Router } from 'express';
import multer from 'multer';

import TeamsController from '../controllers/TeamsController';
import TeamsCountryController from '../controllers/TeamsCountryController';
import TeamShieldController from '../controllers/TeamShieldController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/uploadAvatar';

const teamsController = new TeamsController();
const teamsCountryController = new TeamsCountryController();
const teamShieldController = new TeamShieldController();
const teamsRouter = Router();
const upload = multer(uploadConfig);

teamsRouter.use(ensureAuthenticated);

//GET
teamsRouter.get('/', teamsController.index);

teamsRouter.get('/:country', teamsCountryController.index);

//POST
teamsRouter.post('/', upload.single('shield'), teamsController.create);

//PATCH
//FIXME:
teamsRouter.patch('/update/:id', teamsController.update);

teamsRouter.patch(
    '/update/:id/shield',
    upload.single('avatar'),
    teamShieldController.update
);


export default teamsRouter;