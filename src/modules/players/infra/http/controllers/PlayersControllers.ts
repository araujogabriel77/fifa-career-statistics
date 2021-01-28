import { Request, Response } from 'express';
import { container } from 'tsyringe';

import PlayerRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';
import CreatePlayerService from '@modules/players/services/CreatePlayerService';

export default class TeamsController {
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

    // public async update(request: Request, response: Response): Promise<Response> {

    // }

    public async listByCountry(request: Request, response: Response): Promise<Response> {
        const playerRepository = new PlayerRepository();
        const { country } = request.params;
        const formated_country = country.toLowerCase();

        const players = await playerRepository.findByCountry(formated_country);

        return response.json(players);
    }

    public async listById(request: Request, response: Response): Promise<Response> {
        const playerRepository = new PlayerRepository();
        const { id } = request.params;
        const playerId = Number(id);
        const players = await playerRepository.findPlayerByTeam(playerId);

        return response.json(players);
    }
}