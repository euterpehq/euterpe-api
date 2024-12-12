import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734007296624 implements MigrationInterface {
  name = 'Migrations1734007296624';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_03585d421deb10bbc326fffe4c" ON "user" ("refreshToken") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_03585d421deb10bbc326fffe4c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
  }
}
