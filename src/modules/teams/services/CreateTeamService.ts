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
    name = name.toLowerCase();
    short_name = short_name.toLowerCase();
    country = country.toLowerCase();

    const findTeamWithSameName = await this.teamsRepository.findByName(name);

    if (findTeamWithSameName) {
      throw new AppError('This name is already in use');
    }

    // const filename = await this.storageProvider.saveFile(shieldFileName);

    const team = await this.teamsRepository.create({
      name,
      short_name,
      country,
      foundation,
      user_id
    });

    const jaca = await this.cacheProvider.invalidatePrefix(`teams-list`);

    console.log(jaca);

    return team;
  }
}

export default CreateTeamService;
