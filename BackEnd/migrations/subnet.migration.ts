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
                        name: "subnet_address",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "subnet_mask",
                        type: "varchar",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "decription",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "permission",
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
                        name: "network_id",
                        type: "int",
                    },
                    {
                        name: "vlan_id",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "department_id",
                        type: "int",
                        isNullable: true,
                    },
                ]
            }),
            true,
        )

        await queryRunner.createForeignKey(
            "subnets",
            new TableForeignKey({
                columnNames: ["network_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "networks",
                onDelete: "CASCADE",
            }),
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
                columnNames: ["department_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "departments",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('subnets');
        await queryRunner.dropTable('subnets', true, true);
    }

}
