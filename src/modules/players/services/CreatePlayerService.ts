import { injectable, inject } from 'tsyringe';

import Player from '@modules/players/infra/typeorm/entities/Player';

import IPlayersRepository from '../repositories/IPlayersRepository';

import AppError from '@shared/errors/AppErrors';
import validatePlayerFormFields from '@modules/players/utils/validatePlayerFormFields';

interface IRequest {
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
    team_id: number;
}

@injectable()
class CreatePlayerService {
    constructor(
        @inject('PlayersRepository')
        private playersRepository: IPlayersRepository
    ) { }
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
        team_id
    }: IRequest): Promise<Player> {
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

        const player = await this.playersRepository.create({
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

        return player;
    }
}

export default CreatePlayerService;