import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '../repositories/ITeamsRepository';
import Team from '@modules/teams/infra/typeorm/entities/Team';
import AppError from '@shared/errors/AppErrors';
import validateUpdateTeamFields from '../utils/validateUpdateTeamFields';

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
        private teamsRepository: ITeamsRepository,
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

        const validFields = validateUpdateTeamFields({
            name,
            short_name,
            country,
            foundation
        });

        if (validFields) {
            throw new AppError(validFields);
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