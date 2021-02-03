import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class SessonsController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { email } = request.body;

            const sendPasswordForgotEmail = container.resolve(SendForgotPasswordEmailService);

            await sendPasswordForgotEmail.execute({ email });

            return response.status(204).json();
        } catch (err) {
            return response.status(500).json({ err: err.message });
        }
    }
}