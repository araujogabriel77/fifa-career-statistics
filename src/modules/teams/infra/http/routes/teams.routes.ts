import { Router } from 'express';
import multer from 'multer';

import TeamsController from '../controllers/TeamsController';
import TeamsCountryController from '../controllers/TeamsCountryController';
import TeamShieldController from '../controllers/TeamShieldController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const teamsController = new TeamsController();
const teamsCountryController = new TeamsCountryController();
const teamShieldController = new TeamShieldController();
const teamsRouter = Router();
const upload = multer(uploadConfig);

teamsRouter.use(ensureAuthenticated);

teamsRouter.get('/', teamsController.index);

teamsRouter.get('/:country', teamsCountryController.index);

teamsRouter.post('/', upload.single('shield'), teamsController.create);

teamsRouter.put('/update/:id', teamsController.update);

teamsRouter.post(
    '/update/shield/:id',
    upload.single('shield'),
    teamShieldController.update
);


export default teamsRouter;