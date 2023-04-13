import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class device1679908366897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "devices",
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
                        name: "ip_address",
                        type: "nvarchar",
                    },
                    {
                        name: "mac_address",
                        type: "nvarchar",
                    },
                    {
                        name: "ip_type",
                        type: "varchar",
                    },
                    {
                        name: "expries",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "decription",
                        type: "varchar",
                        isNullable: true,
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
                        name: "department_id",
                        type: "int",
                    },
                    {
                        name: "subnet_id",
                        type: "int",
                    },
                ]
            }),
            true,
        )

        await queryRunner.createForeignKey(
            "devices",
            new TableForeignKey({
                columnNames: ["department_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "departments",
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.createForeignKey(
            "devices",
            new TableForeignKey({
                columnNames: ["subnet_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "subnets",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('devices');
        await queryRunner.dropTable('devices', true, true);
    }

}
