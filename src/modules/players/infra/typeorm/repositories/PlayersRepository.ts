import { getRepository, Repository } from 'typeorm';

import ICreatePlayerDTO from '@modules/players/dtos/ICreatePlayerDTO';
import IPlayersRepository from '@modules/players/repositories/IPlayersRepository';

import Player from '../entities/Player';

class PlayerRepository implements IPlayersRepository {
    private ormRepository: Repository<Player>;

    constructor() {
        this.ormRepository = getRepository(Player);
    }

    public async create({
        name,
        country,
        birth_date,
        position,
        first_overall,
        current_overall,
        games_played,
        goals,
        assists,
        clean_sheets,
        team_id
    }: ICreatePlayerDTO): Promise<Player> {
        const team = this.ormRepository.create({
            name,
            country,
            birth_date,
            position,
            first_overall,
            current_overall,
            games_played,
            goals,
            assists,
            clean_sheets,
            team_id
        });

        await this.ormRepository.save(team);

        return team;
    }

    public async save(player: Player) {
        await this.ormRepository.save(player);

        return player;
    }

    public async findAll(): Promise<Player[] | undefined> {
        const players = await this.ormRepository.find();

        return players;
    }

    public async findByCountry(country: string): Promise<Player[] | undefined> {
        const formated_country = country.toLowerCase();
        const findPlayersByCountry = await this.ormRepository.find({
            where: { country: formated_country }
        });

        return findPlayersByCountry;
    }

    public async findByName(name: string): Promise<Player | undefined> {
        const findPlayerByName = await this.ormRepository.findOne({
            where: { name }
        });

        return findPlayerByName;
    }

    public async findById(id: number): Promise<Player | undefined> {
        const findPlayerById = await this.ormRepository.findOne({
            where: { id }
        });

        return findPlayerById;
    }

    public async findPlayerByTeam(team_id: number): Promise<Player[] | undefined> {
        const findPlayersByTeam = await this.ormRepository.find({
            where: { team_id }
        });

        return findPlayersByTeam;
    }

}

export default PlayerRepository;