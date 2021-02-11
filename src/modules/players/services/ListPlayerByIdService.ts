import { injectable, inject } from 'tsyringe';

import Player from '@modules/players/infra/typeorm/entities/Player';

import IPlayersRepository from '../repositories/IPlayersRepository';

import AppError from '@shared/errors/AppErrors';

interface IRequest {
  player_id: number;
}

@injectable()
class ListPlayerByIdService {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository
  ) { }
  public async execute({
    player_id
  }: IRequest): Promise<Player> {
    const player = await this.playersRepository.findById(player_id);

    if (!player) {
      throw new AppError('Player does not exist');
    }

    return player;
  }
}

export default ListPlayerByIdService;
