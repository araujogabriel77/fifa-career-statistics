import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserTeamsService from '@modules/teams/services/ListUserTeamsService';

export default class TeamsOfUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listUserTeamsService = container.resolve(ListUserTeamsService);

      const user_id = request.user.id;

      const teams = await listUserTeamsService.execute({ user_id });

      return response.json(teams);

    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}
