import { injectable, inject } from 'tsyringe';

import Player from '@modules/players/infra/typeorm/entities/Player';
import IPlayersRepository from '../repositories/IPlayersRepository';
import AppError from '@shared/errors/AppErrors';

interface IRequest {
  id: string;
  name?: string;
  country?: string;
  birth_date?: Date;
  position?: string;
  first_overall?: number;
  current_overall?: number;
  games_played?: number;
  goals?: number;
  assists?: number;
  clean_sheets?: number;
  bio?: string;
  team_id?: number;
}

@injectable()
class UpdatePlayerService {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository
  ) { }
  public async execute({
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
  }: IRequest): Promise<Player> {
    const playerId = Number(id);

    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      throw new AppError('This player does not exists');
    }

    if (name)
      player.name = name.toLowerCase();
    else
      player.name = player.name;

    if (country)
      player.country = country.toLowerCase();
    else
      player.country = player.country;

    if (position)
      player.position = position.toLowerCase();
    else
      player.position = player.position;

    if (birth_date)
      player.birth_date = birth_date;
    else
      player.birth_date = player.birth_date;

    if (first_overall)
      player.first_overall = first_overall;
    else
      player.first_overall = player.first_overall;

    if (current_overall)
      player.current_overall = current_overall;
    else
      player.current_overall = player.current_overall;

    if (current_overall)
      player.current_overall = current_overall;
    else
      player.current_overall = player.current_overall;

    if (games_played)
      player.games_played = games_played;
    else
      player.games_played = player.games_played;

    if (goals)
      player.goals = goals;
    else
      player.goals = player.goals;

    if (assists)
      player.assists = assists;
    else
      player.assists = player.assists;

    if (team_id)
      player.team_id = team_id;
    else
      player.team_id = player.team_id;

    await this.playersRepository.save(player);

    return player;
  }
}

export default UpdatePlayerService;
