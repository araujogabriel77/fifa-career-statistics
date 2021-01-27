import { getCustomRepository, getRepository } from 'typeorm';

import Team from '@modules/Teams/infra/typeorm/entities/Team';
import User from '@modules/Users/infra/typeorm/entities/User';

import TeamRepository from '@modules/Teams/infra/typeorm/repositories/TeamsRepository';
import ITeamsRepository from '../repositories/ITeamsRepository';

import AppError from '@shared/errors/AppErrors';
import validateTeamFormFields from '@modules/Teams/utils/validateTeamFormFields';

interface Request {
    name: string;
    short_name: string;
    country: string;
    foundation: string;
    user_id: string;
    shieldFileName?: string;
}

class CreateTeamService {
    constructor(private teamRepository: ITeamsRepository)
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

        const invalidFormFields = validateTeamFormFields({
            name,
            short_name,
            country,
            foundation
        });

        if (invalidFormFields) {
            throw new AppError(`${invalidFormFields}`);
        }

        name = name.toLowerCase();
        short_name = short_name.toLowerCase();
        country = country.toLowerCase();

        const team = await teamRepository.create({
            name,
            short_name,
            country,
            foundation,
            user_id,
            shield: shieldFileName
        });

        return team;
    }
}

export default CreateTeamService;