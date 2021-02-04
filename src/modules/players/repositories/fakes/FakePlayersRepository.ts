import ICreatePlayerDTO from '@modules/players/dtos/ICreatePlayerDTO';
import IPlayersRepository from '@modules/players/repositories/IPlayersRepository';

import Player from '../../infra/typeorm/entities/Player';

class PlayerRepository implements IPlayersRepository {
    private players: Player[] = [];

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
        const player = new Player();

        Object.assign(player, {
            id: Math.round(Math.random() * (200 - 10) + 10),
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

        this.players.push(player);

        return player;
    }

    public async save(player: Player) {
        const playerIndex = this.players.findIndex(findPlayer => findPlayer.id === player.id);

        this.players[playerIndex] = player;

        return player;
    }

    public async findAll(): Promise<Player[] | undefined> {
        return this.players;
    }

    public async findByCountry(country: string): Promise<Player[] | undefined> {
        const playersWithSameCountry = this.players.filter(player => player.country === country);

        return playersWithSameCountry;
    }

    public async findByName(name: string): Promise<Player | undefined> {
        const findPlayerWithSameName = this.players.find(player => player.name === name);

        return findPlayerWithSameName;
    }

    public async findPlayerByTeam(team_id: number): Promise<Player[] | undefined> {
        const findPlayersInTheSameTeam = this.players.filter(player => player.team_id === team_id);

        return findPlayersInTheSameTeam;
    }

    public async findById(id: number): Promise<Player | undefined> {
        const playerIndex = this.players.findIndex(player => player.id === id);

        return this.players[playerIndex];
    }
}

export default PlayerRepository;