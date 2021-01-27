import { getRepository, Repository } from 'typeorm';

import ITeamsRepository from '@modules/Teams/repositories/ITeamsRepository';
import ICreateTeamDTO from '@modules/Teams/dtos/ICreateTeamDTO';

import Team from '@modules/Teams/infra/typeorm/entities/Team';

class TeamRepository implements ITeamsRepository {
    private ormRepository: Repository<Team>;

    constructor() {
        this.ormRepository = getRepository(Team);
    }

    public async findByName(name: string): Promise<Team | undefined> {
        const findTeamWithSameName = await this.ormRepository.findOne({
            where: { name }
        })

        return findTeamWithSameName || null;
    }

    public async create({
        name,
        short_name,
        country,
        foundation,
        shield,
        user_id
    }: ICreateTeamDTO): Promise<Team> {
        const team = this.ormRepository.create({
            name,
            short_name,
            country,
            foundation,
            shield,
            user_id
        });

        await this.ormRepository.save(team);

        return team;
    }

}

export default TeamRepository;