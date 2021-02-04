import { Request, Response } from 'express';

import PlayerRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';

export default class PlayerById {
    public async index(request: Request, response: Response): Promise<Response> {
        const playerRepository = new PlayerRepository();
        const { id } = request.params;
        const playerId = Number(id);
        const player = await playerRepository.findById(playerId);

        return response.json(player);
    }
}