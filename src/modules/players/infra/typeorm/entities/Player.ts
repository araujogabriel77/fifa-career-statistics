import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import Team from '@modules/teams/infra/typeorm/entities/Team';

@Entity('players')
class Player {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column()
    birth_date: Date;

    @Column()
    position: string;

    @Column()
    first_overall: number;

    @Column()
    current_overall: number;

    @Column()
    games_played: number;

    @Column()
    goals: number;

    @Column()
    assists: number;

    @Column()
    clean_sheets: number;

    @Column()
    team_id: number;

    @ManyToOne(() => Team)
    @JoinColumn({ name: 'team_id' })
    team: Team;
}

export default Player;