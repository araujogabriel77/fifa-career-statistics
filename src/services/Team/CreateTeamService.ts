import Team from '../../models/Team';
import TeamRepository from '../../repositories/TeamsRepository';

interface Request {
    name: string;
    short_name: string;
    country: string;
    foundation_year: string;
}

class CreateTeamService {

    private teamRepository: TeamRepository;

    constructor(teamRepository: TeamRepository) {
        this.teamRepository = teamRepository;
    }

    public execute({ name, short_name, country, foundation_year }: Request): Team {
        const findTeamWithSameName = this.teamRepository.findByName(name);

        if (findTeamWithSameName) {
            throw new Error('This team already exists');
        }

        const team = this.teamRepository.create({
            name,
            short_name,
            country,
            foundation_year
        });

        return team;
    }
}

export default CreateTeamService;