import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateTeamShieldService from '@modules/teams/services/UpdateTeamShieldService';

export default class TeamsController {
    public async update(request: Request, response: Response): Promise<Response> {
        try {
            const updateTeamShield = container.resolve(UpdateTeamShieldService);

            const team = await updateTeamShield.execute({
                team_id: request.params.id,
                shieldFileName: request.file.filename
            });

            return response.json(team);
        } catch (error) {
            return response.json({ error: error.message });
        }

    }
}