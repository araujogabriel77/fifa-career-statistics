import Team from '../infra/typeorm/entities/Team';

import ICreateTeamDTO from '@modules/teams/dtos/ICreateTeamDTO';

export default interface ITeamsRepository {
    findAll(): Promise<Team[] | undefined>;
    findByCountry(country: string): Promise<Team[] | undefined>;
    findByName(name: string): Promise<Team | undefined>;
    findById(id: number): Promise<Team | undefined>;
    create(data: Omit<ICreateTeamDTO, 'id'>): Promise<Team>;
    save(team: Team): Promise<Team>;
}