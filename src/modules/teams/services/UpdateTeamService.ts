import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '../repositories/ITeamsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
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
        private teamsRepository: ITeamsRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
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
        team.name = name.length < 3 || undefined ? team.name : name.toLowerCase();
        team.short_name = short_name.length < 3 || undefined ? team.short_name : short_name.toLowerCase();
        team.country = country.length < 1 || undefined ? team.country : country.toLowerCase();
        team.foundation = foundation.length < 4 || undefined ? team.foundation : foundation;

        await this.teamsRepository.save(team);

        return team;
    }
}

export default updateUserAvatarService;