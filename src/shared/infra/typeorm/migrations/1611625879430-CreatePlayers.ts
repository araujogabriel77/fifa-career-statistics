import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePlayers1611625879430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'players',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                    },
                    {
                        name: 'birth_date',
                        type: 'date',
                        isNullable: true,
                    },
                    {
                        name: 'position',
                        type: 'varchar',
                    },
                    {
                        name: 'first_overall',
                        type: 'integer',
                        default: 40
                    },
                    {
                        name: 'current_overall',
                        type: 'integer',
                        default: 50
                    },
                    {
                        name: 'games_played',
                        type: 'integer',
                        default: 0
                    },
                    {
                        name: 'goals',
                        type: 'integer',
                        default: 0
                    },
                    {
                        name: 'assists',
                        type: 'integer',
                        default: 0
                    },
                    {
                        name: 'clean_sheets',
                        type: 'integer',
                        default: 0
                    },
                    {
                        name: 'bio',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'team_id',
                        type: 'integer',
                        isNullable: true
                    }
                ]
            })
        );

        await queryRunner.createForeignKey('players',
            new TableForeignKey({
                name: 'playerTeam',
                columnNames: ['team_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'teams',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('players', 'playerTeam');
        await queryRunner.dropTable('players');
    }

}
