import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('teams')
class Team {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column()
    name: string;

    @Column({ length: 3 })
    short_name: string;

    @Column()
    country: string;

    @Column({ length: 4 })
    foundation: string;
}

export default Team;