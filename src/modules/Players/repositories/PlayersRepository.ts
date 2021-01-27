import { EntityRepository, Repository } from 'typeorm';

import Player from '@modules/Players/infra/typeorm/entities/Player';

@EntityRepository(Player)
class PlayerRepository extends Repository<Player> {

    public async findByName(name: string): Promise<Player | null> {
        const findPlayerWithSameName = await this.findOne({
            where: { name }
        })

        return findPlayerWithSameName || null;
    }

    public async findByTeam(team_id: number): Promise<Player[] | null> {
        const findPlayersInTheSameTeam = await this.find({
            where: { team_id }
        });

        return findPlayersInTheSameTeam || null;
    }

}

export default PlayerRepository;