import { Request, Response } from 'express';
import { container } from 'tsyringe';

import PlayerRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';
import CreatePlayerService from '@modules/players/services/CreatePlayerService';
import UpdatePlayerService from '@modules/players/services/UpdatePlayerService';

export default class PlayersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const playerRepository = new PlayerRepository();
        const players = await playerRepository.findAll();

        return response.json(players);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const createPlayer = container.resolve(CreatePlayerService);

        const {
            name,
            country,
            birth_date,
            position,
            first_overall,
            current_overall,
            games_played,
            goals,
            assists,
            clean_sheets,
            team_id
        } = request.body;

        const player = await createPlayer.execute({
            name,
            country,
            birth_date,
            position,
            first_overall,
            current_overall,
            games_played,
            goals,
            assists,
            clean_sheets,
            team_id
        });

        return response.json(player);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const updatePlayer = container.resolve(UpdatePlayerService);

        const {
            name,
            country,
            birth_date,
            position,
            first_overall,
            current_overall,
            games_played,
            goals,
            assists,
            clean_sheets,
            team_id
        } = request.body;

        const { id } = request.params;

        const player = await updatePlayer.execute({
            id,
            name,
            country,
            birth_date,
            position,
            first_overall,
            current_overall,
            games_played,
            goals,
            assists,
            clean_sheets,
            team_id
        });

        return response.json(player);
    }
}