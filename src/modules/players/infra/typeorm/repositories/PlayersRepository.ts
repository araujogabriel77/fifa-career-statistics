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

        return players || undefined;
    }

    public async findByCountry(country: string): Promise<Player[] | undefined> {
        const findPlayerWithSameCountry = await this.ormRepository.find({
            where: { country }
        });

        return findPlayerWithSameCountry || undefined;
    }

    public async findByName(name: string): Promise<Player | undefined> {
        const findPlayerWithSameName = await this.ormRepository.findOne({
            where: { name }
        });

        return findPlayerWithSameName || undefined;
    }

    public async findPlayerByTeam(team_id: number): Promise<Player[] | undefined> {
        const findPlayersInTheSameTeam = await this.ormRepository.find({
            where: { team_id }
        });

        return findPlayersInTheSameTeam || undefined;
    }

}

export default PlayerRepository;