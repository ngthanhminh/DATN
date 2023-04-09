import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class connection1679908366898 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "connections",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: "device_id",
                        type: "int",
                    },
                    {
                        name: "subnet_id",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        // default: "now()",
                        isNullable: true,
                    },
                ]
            }),
            true,
        )

        await queryRunner.createForeignKey(
            "connections",
            new TableForeignKey({
                columnNames: ["subnet_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "subnets",
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.createForeignKey(
            "connections",
            new TableForeignKey({
                columnNames: ["device_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "devices",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('subnets');
        await queryRunner.dropTable('subnets', true, true);
    }

}
