import { Router } from 'express';
import multer from 'multer';

import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const usersController = new UsersController();
const userAvatarController = new UsersAvatarController();

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update
);


export default usersRouter;