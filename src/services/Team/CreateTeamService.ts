import { getCustomRepository } from 'typeorm';

import Team from '../../models/Team';
import TeamRepository from '../../repositories/TeamsRepository';

interface Request {
    name: string;
    short_name: string;
    country: string;
    foundation: string;
}

class CreateTeamService {

    public async execute({ name, short_name, country, foundation }: Request): Promise<Team> {
        const teamRepository = getCustomRepository(TeamRepository);

        const findTeamWithSameName = await teamRepository.findByName(name);

        if (findTeamWithSameName) {
            throw new Error('This team already exists');
        }

        const team = teamRepository.create({
            name,
            short_name,
            country,
            foundation
        });

        await teamRepository.save(team);

        return team;
    }
}

export default CreateTeamService;