import { getCustomRepository, getRepository } from 'typeorm';

import Team from '../../models/Team';
import Player from '../../models/Player';
import PlayerRepository from '../../repositories/PlayersRepository';
import AppError from '../../errors/AppErrors';

interface Request {
    name: string;
    birth_date?: Date;
    position: string;
    first_overall?: number;
    current_overall?: number;
    games_played?: number;
    goals?: number;
    assistis?: number;
    clean_sheets?: number;
    team_id: number;
}

export default class CreatePlayerService {

    public async execute() {

    }
}