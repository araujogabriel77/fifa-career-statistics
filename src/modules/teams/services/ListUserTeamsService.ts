import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '../repositories/ITeamsRepository';
import Team from '@modules/teams/infra/typeorm/entities/Team';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppErrors';

interface Request {
  user_id: string;
}

@injectable()
class ListUserTeamsService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }
  public async execute({
    user_id
  }: Request): Promise<Team[] | undefined> {
    let teams = await this.cacheProvider.recover<Team[]>(`teams-list:${user_id}`);

    if (!teams) {
      teams = await this.teamsRepository.findByUserId(user_id);

      console.log('a query foi feita');

      await this.cacheProvider.save(`teams-list:${user_id}`, teams);
    }

    return teams;
  }
}

export default ListUserTeamsService;
