import { MigrationInterface, QueryRunner } from "typeorm";

export class Files1701286078933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`files\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`size\` int NOT NULL, \`key\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`files\` ADD CONSTRAINT \`FK_7e7425b17f9e707331e9a6c7335\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_7e7425b17f9e707331e9a6c7335\``,
    );
    await queryRunner.query(`DROP TABLE \`files\``);
  }
}
