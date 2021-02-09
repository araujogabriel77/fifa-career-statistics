import Player from '../infra/typeorm/entities/Player';
import ICreatePlayerDTO from '../dtos/ICreatePlayerDTO';
export default interface IPlayersRepository {
  findAll(): Promise<Player[] | undefined>;
  findByCountry(country: string): Promise<Player[] | undefined>;
  findByName(name: string): Promise<Player | undefined>;
  findById(id: number): Promise<Player | undefined>;
  findPlayerByTeam(team_id: number): Promise<Player[] | undefined>;
  create(data: ICreatePlayerDTO): Promise<Player>;
  save(player: Player): Promise<Player>;
}
