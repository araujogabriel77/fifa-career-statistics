import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/uploadAvatar';
import AppError from '@shared/errors/AppErrors';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();


app.use(express.json());
app.use('/files', express.static(uploadConfig.directory.root));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    return response.status(500).json({
        status: 'error',
        message: `Internal server error ${err}`
    });
});

app.listen(3333 || process.env.PORT, () => {
    console.log('Server running on port 3333!');
});