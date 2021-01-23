import { EntityRepository, Repository } from 'typeorm';

import Team from '../models/Team';

@EntityRepository(Team)
class TeamRepository extends Repository<Team> {

    public async findByName(name: string): Promise<Team | null> {
        const findTeamWithSameName = await this.findOne({
            where: { name }
        })

        return findTeamWithSameName || null;
    }

}

export default TeamRepository;