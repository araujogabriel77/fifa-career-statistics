import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '../repositories/ITeamsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Team from '@modules/teams/infra/typeorm/entities/Team';
import AppError from '@shared/errors/AppErrors';

interface Request {
  team_id: string;
  shieldFileName?: string;
  user_id: string;
}

@injectable()
class updateUserAvatarService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }
  public async execute({
    team_id,
    shieldFileName,
    user_id
  }: Request): Promise<Team> {
    const id = Number(team_id);
    const team = await this.teamsRepository.findById(id);

    if (user_id !== team.user_id) {
      throw new AppError('Only the team owner can update it', 403);
    }

    if (!team) {
      throw new AppError('Team not found', 401);
    }

    if (team.shield) {
      await this.storageProvider.deleteFile(team.shield)
    }
    const filename = await this.storageProvider.saveFile(shieldFileName);

    team.shield = filename;

    await this.teamsRepository.save(team);

    return team;
  }
}

export default updateUserAvatarService;
