import Team from '../models/Team';

interface CreateTeamDTO {
    name: string;
    short_name: string;
    country: string;
    foundation_year: string;
}

class TeamRepository {
    private teams: Team[];

    constructor() {
        this.teams = [];
    }

    public all(): Team[] {
        return this.teams;
    }

    public findByName(name: string): Team | null {
        const findTeamWithSameName = this.teams.find(team => team.name === name);

        return findTeamWithSameName || null;
    }

    public create({ name, short_name, country, foundation_year }: CreateTeamDTO): Team {

        const team = new Team({
            name,
            short_name,
            country,
            foundation_year
        });

        this.teams.push(team);

        return team;
    }
}

export default TeamRepository;