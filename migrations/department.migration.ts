import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class department1679908365696 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "departments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: "name",
                        type: "nvarchar",
                    },
                    {
                        name: "location",
                        type: "varchar",
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
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "gateway_id",
                        type: "int",
                    },
                ]
            }),
            true,
        )

        await queryRunner.createForeignKey(
            "departments",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.createForeignKey(
            "departments",
            new TableForeignKey({
                columnNames: ["gateway_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "gateways",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('departments');
        await queryRunner.dropTable('departments', true);
    }

}
