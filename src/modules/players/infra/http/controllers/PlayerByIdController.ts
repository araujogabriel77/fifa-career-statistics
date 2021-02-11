import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPlayerByIdService from '@modules/players/services/ListPlayerByIdService';

export default class PlayerById {
  public async index(request: Request, response: Response): Promise<Response> {
    const playerById = container.resolve(ListPlayerByIdService);
    const { id } = request.params;
    const player_id = Number(id);
    const player = await playerById.execute({ player_id });

    return response.json(player);
  }
}
