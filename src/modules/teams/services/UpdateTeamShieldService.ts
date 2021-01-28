import { injectable, inject } from 'tsyringe';

import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/uploadShield';

import ITeamsRepository from '../repositories/ITeamsRepository';
import Team from '@modules/teams/infra/typeorm/entities/Team';
import AppError from '@shared/errors/AppErrors';

interface Request {
    team_id: string;
    shieldFileName?: string;
}

@injectable()
class updateUserAvatarService {
    constructor(
        @inject('TeamsRepository')
        private teamsRepository: ITeamsRepository
    ) { }
    public async execute({
        team_id,
        shieldFileName
    }: Request): Promise<Team> {
        const id = Number(team_id);

        const team = await this.teamsRepository.findById(id);

        if (!team) {
            throw new AppError('Team not found', 401);
        }

        if (team.shield && shieldFileName.length > 3) {
            const teamShieldFilePath = path.join(uploadConfig.directory.shield, team.shield);

            const shieldFileExists = await fs.promises.stat(teamShieldFilePath);

            if (shieldFileExists) {
                await fs.promises.unlink(teamShieldFilePath);
            }
        }
        await this.teamsRepository.save(team);

        return team;
    }
}

export default updateUserAvatarService;