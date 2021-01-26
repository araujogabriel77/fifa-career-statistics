import { getCustomRepository } from 'typeorm';

import Player from '../../models/Player';

import PlayerRepository from '../../repositories/PlayersRepository';
import TeamRepository from '../../repositories/TeamsRepository';
import AppError from '../../errors/AppErrors';

interface Request {
    name: string;
    birth_date?: Date;
    position: string;
    first_overall?: number;
    current_overall?: number;
    games_played?: number;
    goals?: number;
    assists?: number;
    clean_sheets?: number;
    team_name: string;
}

export default class CreatePlayerService {

    public async execute({
        name,
        birth_date,
        position,
        first_overall,
        current_overall,
        games_played,
        goals,
        assists,
        clean_sheets,
        team_name
    }: Request): Promise<Player> {
        const playersRepositoty = getCustomRepository(PlayerRepository);
        const teamsRepositoty = getCustomRepository(TeamRepository);

        const team = await teamsRepositoty.findByName(team_name);

        if (!team) {
            throw new AppError('Team name not found');
        }

        const team_id = team.id;


        const player = playersRepositoty.create({
            name,
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

        await playersRepositoty.save(player);

        return player;
    }
}