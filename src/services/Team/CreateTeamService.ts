import { getCustomRepository } from 'typeorm';

import Team from '../../models/Team';
import TeamRepository from '../../repositories/TeamsRepository';
import AppError from '../../errors/AppErrors';

interface Request {
    name: string;
    short_name: string;
    country: string;
    foundation: string;
    user_id: string;
}

class CreateTeamService {

    public async execute({ name, short_name, country, foundation, user_id }: Request): Promise<Team> {
        const teamRepository = getCustomRepository(TeamRepository);

        const findTeamWithSameName = await teamRepository.findByName(name);

        if (findTeamWithSameName) {
            throw new AppError('This team already exists');
        }

        const team = teamRepository.create({
            name,
            short_name,
            country,
            foundation,
            user_id
        });

        await teamRepository.save(team);

        return team;
    }
}

export default CreateTeamService;