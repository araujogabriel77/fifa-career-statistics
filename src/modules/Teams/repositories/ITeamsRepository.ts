import Team from '../infra/typeorm/entities/Team';

import ICreateTeamDTO from '@modules/Teams/dtos/ICreateTeamDTO';

export default interface ITeamsRepository {
    create(data: ICreateTeamDTO): Promise<Team>
    findByName(name: string): Promise<Team | undefined>
}