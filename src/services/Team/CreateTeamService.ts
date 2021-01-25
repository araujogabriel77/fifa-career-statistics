import { getCustomRepository, getRepository } from 'typeorm';

import Team from '../../models/Team';
import User from '../../models/User';
import TeamRepository from '../../repositories/TeamsRepository';
import AppError from '../../errors/AppErrors';
import validateFormFields from '../../utils/team/validateFormFields';

interface Request {
    name: string;
    short_name: string;
    country: string;
    foundation: string;
    user_id: string;
    shieldFileName?: string;
}

class CreateTeamService {

    public async execute({
        name,
        short_name,
        country,
        foundation,
        user_id,
        shieldFileName
    }: Request): Promise<Team> {
        const teamRepository = getCustomRepository(TeamRepository);
        const userRepository = getRepository(User);

        const checkUserId = await userRepository.findOne({
            where: {
                id: user_id
            }
        });

        if (!checkUserId) {
            throw new AppError('Only authenticated users can create teams');
        }

        const findTeamWithSameName = await teamRepository.findByName(name);

        if (findTeamWithSameName) {
            throw new AppError('This name is already in use');
        }

        const invalidFormFields = validateFormFields({
            name,
            short_name,
            country,
            foundation
        });

        if (invalidFormFields) {
            throw new AppError(`${invalidFormFields}`);
        }

        const team = teamRepository.create({
            name,
            short_name,
            country,
            foundation,
            user_id,
            shield: shieldFileName
        });

        await teamRepository.save(team);

        return team;
    }
}

export default CreateTeamService;