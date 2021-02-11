import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '../repositories/ITeamsRepository';
import Team from '@modules/teams/infra/typeorm/entities/Team';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppErrors';
interface IRequest {
  name: string;
  short_name: string;
  country: string;
  foundation: string;
  user_id: string;
  shieldFileName?: string;
}

@injectable()
class CreateTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider

  ) { }
  public async execute({
    name,
    short_name,
    country,
    foundation,
    user_id,
    shieldFileName
  }: IRequest): Promise<Team> {
    const formatedName = name.toLowerCase();

    const findTeamWithSameName = await this.teamsRepository.findByName(formatedName);

    if (findTeamWithSameName) {
      throw new AppError('This name is already in use');
    }

    name = name.toLowerCase();
    short_name = short_name.toLowerCase();
    country = country.toLowerCase();

    // const filename = await this.storageProvider.saveFile(shieldFileName);

    const team = await this.teamsRepository.create({
      name,
      short_name,
      country,
      foundation,
      user_id
    });

    await this.cacheProvider.invalidatePrefix('teams-list')

    return team;
  }
}

export default CreateTeamService;
