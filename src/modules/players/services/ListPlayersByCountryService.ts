import { injectable, inject } from 'tsyringe';

import Player from '@modules/players/infra/typeorm/entities/Player';

import IPlayersRepository from '../repositories/IPlayersRepository';

import AppError from '@shared/errors/AppErrors';

interface IRequest {
  country: string;
}

@injectable()
class ListPlayerByCountryService {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository
  ) { }
  public async execute({
    country
  }: IRequest): Promise<Player[]> {
    const player = await this.playersRepository.findByCountry(country);

    if (player.keys.length === 0) {
      throw new AppError('Does not exist registered players in this country yet')
    }

    return player;
  }
}

export default ListPlayerByCountryService;
