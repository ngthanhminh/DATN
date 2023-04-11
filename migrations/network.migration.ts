import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class networkt1679908365697 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "networks",
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
                        type: "varchar",
                    },
                    {
                        name: "network_address",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "subnet_mask",
                        type: "varchar",
                    },
                    {
                        name: "gateway",
                        type: "varchar",
                    },
                    {
                        name: "decription",
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
                        name: "department_id",
                        type: "int",
                        isNullable: true,
                    }
                ]
            }),
            true,
        )

        await queryRunner.createForeignKey(
            "networks",
            new TableForeignKey({
                columnNames: ["department_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "departments",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('ip_address');
        await queryRunner.dropTable('ip_address', true, true);
    }

}
