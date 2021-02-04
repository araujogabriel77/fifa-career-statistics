import { Request, Response } from 'express';

import PlayerRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';

export default class PlayersByTeam {
    public async index(request: Request, response: Response): Promise<Response> {
        const playerRepository = new PlayerRepository();
        const { id } = request.params;
        const teamId = Number(id);
        const players = await playerRepository.findPlayerByTeam(teamId);

        return response.json(players);
    }
}