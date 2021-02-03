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
}

@injectable()
class updateUserAvatarService {
    constructor(
        @inject('TeamsRepository')
        private teamsRepository: ITeamsRepository
    ) { }
    public async execute({
        team_id,
        name,
        short_name,
        country,
        foundation
    }: Request): Promise<Team> {
        const id = Number(team_id);

        const team = await this.teamsRepository.findById(id);

        if (!team) {
            throw new AppError('Team not found', 401);
        }
        console.log(
            team_id,
            name,
            short_name,
            country,
            foundation
        );

        if (name) {
            team.name = name.length < 3 ? team.name : name.toLowerCase();
        }
        if (short_name) {
            team.short_name = short_name.length < 3 || undefined ? team.short_name : short_name.toLowerCase();
        }
        if (country) {
            team.country = country.length < 1 ? team.country : country.toLowerCase();
        }
        if (foundation) {
            team.foundation = foundation.length < 4 ? team.foundation : foundation;
        }

        await this.teamsRepository.save(team);

        return team;
    }
}

export default updateUserAvatarService;