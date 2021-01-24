import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/User/CreateUserService';
import UpdateUserAvatarService from '../services/User/UpdateUserAvatarService';

import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const {
            name,
            password,
            email
        } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            password,
            email
        });

        delete user.password;

        return response.json(user);

    } catch (error) {
        return response.status(400).json({ error: error.message });
    }

});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.json(userWithoutPassword);

    });


export default usersRouter;