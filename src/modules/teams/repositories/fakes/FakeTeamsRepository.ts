import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';
import ICreateTeamDTO from '@modules/teams/dtos/ICreateTeamDTO';

import Team from '@modules/teams/infra/typeorm/entities/Team';

class TeamRepository implements ITeamsRepository {
    private teams: Team[] = [];

    public async create({
        name,
        short_name,
        country,
        foundation,
        shield,
        user_id
    }: Omit<ICreateTeamDTO, 'id'>): Promise<Team> {
        const team = new Team();

        Object.assign(team, {
            id: Math.round(Math.random() * (200 - 10) + 10),
            name,
            short_name,
            country,
            foundation,
            shield,
            user_id
        });

        this.teams.push(team);

        return team;
    }

    public async save(team: Team): Promise<Team> {
        const teamIndex = this.teams.findIndex(findTeam => findTeam.id === team.id);

        this.teams[teamIndex] = team;

        return team;
    }

    public async findAll(): Promise<Team[] | undefined> {
        return this.teams;
    }

    public async findByCountry(country: string): Promise<Team[] | undefined> {
        const teams = this.teams.filter(team => team.country === country);

        return teams;
    }

    public async findByName(name: string): Promise<Team | undefined> {
        const team = this.teams.find(team => team.name === name);

        return team;
    }

    public async findById(id: number): Promise<Team | undefined> {
        const team = this.teams.find(team => team.id === id);

        return team;
    }
}

export default TeamRepository;