import { getCustomRepository } from 'typeorm';

import Player from '@modules/Players/infra/typeorm/entities/Player';

import PlayerRepository from '@modules/Players/repositories/PlayersRepository';
import TeamRepository from '@modules/Teams/infra/typeorm/repositories/TeamsRepository';
import AppError from '@shared/errors/AppErrors';
import validatePlayerFormFields from '@modules/Players/utils/validatePlayerFormFields';

interface Request {
    name: string;
    country: string;
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
        country,
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

        const invalidFormFields = validatePlayerFormFields({
            name,
            country,
            position,
            first_overall,
            current_overall,
            games_played,
            goals,
            assists,
            clean_sheets,
        });

        if (invalidFormFields) {
            throw new AppError(`${invalidFormFields}`);
        }

        name = name.toLowerCase();
        country = country.toLowerCase();
        position = position.toLowerCase();

        const player = playersRepositoty.create({
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

        await playersRepositoty.save(player);

        return player;
    }
}