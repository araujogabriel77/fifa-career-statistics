import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import TeamsController from '../controllers/TeamsController';
import TeamsOfUserController from '../controllers/TeamsOfUserController';
import TeamsCountryController from '../controllers/TeamsOfUserController';
import TeamShieldController from '../controllers/TeamShieldController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const teamsController = new TeamsController();
const teamsOfUserController = new TeamsOfUserController();
const teamsCountryController = new TeamsCountryController();
const teamShieldController = new TeamShieldController();
const teamsRouter = Router();
const upload = multer(uploadConfig.multer);

teamsRouter.use(ensureAuthenticated);

teamsRouter.get('/', teamsController.index);

teamsRouter.get('/myteams', teamsOfUserController.index);

teamsRouter.get('/:country', teamsCountryController.index);

teamsRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(3).max(25).required(),
    short_name: Joi.string().length(3).required(),
    country: Joi.string().min(2).max(25).required(),
    foundation: Joi.string().length(4).required()
  }
}), upload.single('shield'), teamsController.create);

teamsRouter.put('/update/:id', celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(3).max(25).optional(),
    short_name: Joi.string().length(3).optional(),
    country: Joi.string().min(2).max(25).optional(),
    foundation: Joi.string().length(4).optional()
  }
}), teamsController.update);

teamsRouter.post(
  '/update/shield/:id',
  upload.single('shield'),
  teamShieldController.update
);


export default teamsRouter;
