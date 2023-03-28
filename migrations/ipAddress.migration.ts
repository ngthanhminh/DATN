import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class ipaddress1679908466897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "IP_addresses",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "subnet_mask",
                        type: "nvarchar",
                    },
                    {
                        name: "status",
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
                        name: "device_id",
                        type: "int",
                        isUnique: true,
                    }
                ]
            }),
            true,
        )

        await queryRunner.createForeignKey(
            "IP_addresses",
            new TableForeignKey({
                columnNames: ["device_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "devices",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('ip_address');
        await queryRunner.dropTable('ip_address', true, true);
    }

}
