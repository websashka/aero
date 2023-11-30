import { MigrationInterface, QueryRunner } from "typeorm";

export class UserConstraints1701306437275 implements MigrationInterface {
  name = "UserConstraints17013064372751701306437275";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_2d443082eccd5198f95f2a36e2\` (\`login\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`unique_login)constraint\` ON \`users\` (\`login\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`unique_login)constraint\` ON \`users\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_2d443082eccd5198f95f2a36e2\``,
    );
  }
}
