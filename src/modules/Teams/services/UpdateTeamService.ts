import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/uploadShield';

import TeamRepository from '@modules/Teams/infra/typeorm/repositories/TeamsRepository';
import Team from '@modules/Teams/infra/typeorm/entities/Team';
import AppError from '@shared/errors/AppErrors';

interface Request {
    team_id: string;
    name?: string;
    short_name?: string;
    country?: string;
    foundation?: string;
    shieldFileName?: string;
}

class updateUserAvatarService {
    public async execute({
        team_id,
        name,
        short_name,
        country,
        foundation,
        shieldFileName
    }: Request): Promise<Team> {
        const teamRepository = getCustomRepository(TeamRepository);

        const team = await teamRepository.findOne({
            where: {
                id: team_id
            }
        });

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

        team.name = name.length < 3 ? team.name : name;
        team.short_name = short_name.length < 3 ? team.short_name : short_name;
        team.country = country.length < 1 ? team.country : country;
        team.foundation = foundation.length < 4 ? team.foundation : foundation;
        team.shield = shieldFileName.length < 3 ? team.shield : shieldFileName;

        await teamRepository.save(team);

        return team;
    }
}

export default updateUserAvatarService;