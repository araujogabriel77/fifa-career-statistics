import { Request, Response } from 'express';

import PlayerRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';

export default class PlayersByCountryController {
    public async index(request: Request, response: Response): Promise<Response> {
        const playerRepository = new PlayerRepository();
        const { country } = request.params;

        const players = await playerRepository.findByCountry(country);

        return response.json(players);
    }
}