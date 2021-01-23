import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateTeam1611367756363 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'teams',
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
                        isNullable: false
                    },
                    {
                        name: 'short_name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'foundation',
                        type: 'varchar',
                        isNullable: false
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('teams');
    }

}
