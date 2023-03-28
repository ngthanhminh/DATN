import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class isp1679907791938 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "ISP",
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
                        type: "nvarchar",
                    },
                    {
                        name: "MAC_address",
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
                ]
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('ip_address');
        await queryRunner.dropTable('ip_address', true, true);
    }

}
