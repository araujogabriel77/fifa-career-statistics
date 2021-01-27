import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddShieldToTeams1611436891205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('teams', new TableColumn({
            name: 'shield',
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('teams', 'shield');
    }

}
