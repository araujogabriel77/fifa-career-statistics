import { getRepository, Repository } from 'typeorm';

import Team from '../entities/Team';
import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';
import ICreateTeamDTO from '@modules/teams/dtos/ICreateTeamDTO';
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

    return teams;
  }

  public async findByCountry(country: string): Promise<Team[] | undefined> {
    const findTeamsWithSameCountry = await this.ormRepository.find({
      where: { country }
    });

    return findTeamsWithSameCountry;
  }

  public async findByName(name: string): Promise<Team | undefined> {
    const findTeamWithSameName = await this.ormRepository.findOne({
      where: { name }
    })

    return findTeamWithSameName;
  }

  public async findById(id: number): Promise<Team | undefined> {
    const team = await this.ormRepository.findOne({
      where: { id }
    });

    return team;
  }

  public async findByUserId(user_id: string): Promise<Team[] | undefined> {
    const teams = await this.ormRepository.find({
      where: { user_id }
    });

    console.log(user_id, teams);

    return teams;
  }
}

export default TeamRepository;
