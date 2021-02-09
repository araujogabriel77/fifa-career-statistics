import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
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

teamsRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(3).max(25).required(),
    short_name: Joi.string().length(3).required(),
    country: Joi.string().min(2).max(25).required(),
    foundation: Joi.string().length(4).required()
  },
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required()
  }
}), upload.single('shield'), teamsController.create);

teamsRouter.put('/update/:id', celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(3).max(25).optional(),
    short_name: Joi.string().length(3).optional(),
    country: Joi.string().min(2).max(25).optional(),
    foundation: Joi.string().length(4).optional()
  },
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required()
  }
}), teamsController.update);

teamsRouter.post(
  '/update/shield/:id',
  upload.single('shield'),
  teamShieldController.update
);


export default teamsRouter;
