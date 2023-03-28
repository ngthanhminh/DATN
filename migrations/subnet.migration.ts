import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class subnet1679908366697 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "subnets",
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
                        name: "decription",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "permission",
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
                        name: "vlan_id",
                        type: "int",
                    },
                    {
                        name: "ISP_id",
                        type: "int",
                        isUnique: true,
                    },
                ]
            }),
            true,
        )

        await queryRunner.createForeignKey(
            "subnets",
            new TableForeignKey({
                columnNames: ["vlan_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "vlans",
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.createForeignKey(
            "subnets",
            new TableForeignKey({
                columnNames: ["ISP_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "ISP",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('subnets');
        await queryRunner.dropTable('subnets', true, true);
    }

}
