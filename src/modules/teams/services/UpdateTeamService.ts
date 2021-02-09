import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '../repositories/ITeamsRepository';
import Team from '@modules/teams/infra/typeorm/entities/Team';
import AppError from '@shared/errors/AppErrors';

interface Request {
  team_id: string;
  name?: string;
  short_name?: string;
  country?: string;
  foundation?: string;
  user_id: string;
}

@injectable()
class updateUserAvatarService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) { }
  public async execute({
    team_id,
    name,
    short_name,
    country,
    foundation,
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

    team.name = name === undefined ? team.name : name.toLowerCase();
    team.short_name = short_name === undefined ? team.short_name : short_name.toLowerCase();
    team.country = country === undefined ? team.country : country.toLowerCase();
    team.foundation = foundation === undefined ? team.foundation : foundation;

    await this.teamsRepository.save(team);

    return team;
  }
}

export default updateUserAvatarService;
