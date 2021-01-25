import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../../config/uploadShield';

import TeamRepository from '../../repositories/TeamsRepository';
import Team from '../../models/Team';
import AppError from '../../errors/AppErrors';

interface Request {
    team_id: string;
    shieldFileName: string;
}

class updateUserAvatarService {
    public async execute({ team_id, shieldFileName }: Request): Promise<Team> {
        const teamRepository = getCustomRepository(TeamRepository);

        const team = await teamRepository.findOne({
            where: {
                id: team_id
            }
        });

        if (!team) {
            throw new AppError('Team not found', 401);
        }

        if (team.shield) {
            const teamShieldFilePath = path.join(uploadConfig.directory.shield, team.shield);

            const shieldFileExists = await fs.promises.stat(teamShieldFilePath);

            if (shieldFileExists) {
                await fs.promises.unlink(teamShieldFilePath);
            }
        }

        team.shield = shieldFileName;

        await teamRepository.save(team);

        return team;
    }
}

export default updateUserAvatarService;