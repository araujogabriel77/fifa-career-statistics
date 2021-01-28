import { getRepository, Repository } from 'typeorm';

import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';
import ICreateTeamDTO from '@modules/teams/dtos/ICreateTeamDTO';

import Team from '@modules/teams/infra/typeorm/entities/Team';

class TeamRepository implements ITeamsRepository {
    private ormRepository: Repository<Team>;

    constructor() {
        this.ormRepository = getRepository(Team);
    }

    public async create({
        name,
        short_name,
        country,
        foundation,
        shield,
        user_id
    }: Omit<ICreateTeamDTO, 'id'>): Promise<Team> {
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

    public async save(team: Team): Promise<Team> {
        await this.ormRepository.save(team);

        return team;
    }

    public async findAll(): Promise<Team[] | undefined> {
        const teams = await this.ormRepository.find();

        return teams || undefined;
    }

    public async findByCountry(country: string): Promise<Team[] | undefined> {
        const findTeamsWithSameCountry = await this.ormRepository.find({
            where: { country }
        });

        return findTeamsWithSameCountry || undefined;
    }

    public async findByName(name: string): Promise<Team | undefined> {
        const findTeamWithSameName = await this.ormRepository.findOne({
            where: { name }
        })

        return findTeamWithSameName || undefined;
    }

    public async findById(id: number): Promise<Team | undefined> {
        const team = await this.ormRepository.findOne({
            where: { id }
        });

        return team;
    }
}

export default TeamRepository;