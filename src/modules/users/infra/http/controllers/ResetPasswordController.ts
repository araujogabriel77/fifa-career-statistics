import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class SessonsController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { token, password } = request.body;

            const resetPasswordService = container.resolve(ResetPasswordService);

            await resetPasswordService.execute({ token, password });

            return response.status(204).json();
        } catch (err) {
            return response.status(500).json({ err: err.message });
        }
    }
}