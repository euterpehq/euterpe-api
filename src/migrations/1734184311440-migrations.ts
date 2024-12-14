import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734184311440 implements MigrationInterface {
  name = 'Migrations1734184311440';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "audios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "spotifyId" character varying NOT NULL, "title" character varying NOT NULL, "artist" character varying NOT NULL, "featuredArtists" text NOT NULL, "album" character varying NOT NULL, "albumCoverUrl" character varying, "releaseDate" character varying, "durationInSeconds" integer NOT NULL DEFAULT '0', "popularity" double precision NOT NULL DEFAULT '0', "explicit" boolean NOT NULL DEFAULT false, "genres" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "UQ_945c04b98b5a20994e52a09da5a" UNIQUE ("spotifyId"), CONSTRAINT "PK_97a1fa83e0d0dac358d498d0a64" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."audio_groups_type_enum" AS ENUM('single', 'ep', 'album')`,
    );
    await queryRunner.query(
      `CREATE TABLE "audio_groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."audio_groups_type_enum" NOT NULL DEFAULT 'single', "coverImageUrl" character varying, "releaseDate" TIMESTAMP, "isListed" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "artistId" uuid, CONSTRAINT "UQ_3822c237d2c115cd5d08319efa0" UNIQUE ("type"), CONSTRAINT "PK_5d78005c299ba4f832c402f1d5c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistName" character varying, "profileBannerUrl" character varying, "bio" text, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying, "firstName" character varying, "lastName" character varying, "profileImageUrl" character varying, "lastLoginDate" TIMESTAMP NOT NULL, "refreshToken" character varying, "spotifyAccessToken" character varying, "spotifyRefreshToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "artistId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_3390add11e3594fa33d4516fe1" UNIQUE ("artistId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_03585d421deb10bbc326fffe4c" ON "user" ("refreshToken") `,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD CONSTRAINT "FK_21d3a2dfe8f62e787c32c14c2a7" FOREIGN KEY ("userId") REFERENCES "audios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_groups" ADD CONSTRAINT "FK_5ca4a6a2a707da43a601ff4a4f6" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_3390add11e3594fa33d4516fe15" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_3390add11e3594fa33d4516fe15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_groups" DROP CONSTRAINT "FK_5ca4a6a2a707da43a601ff4a4f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" DROP CONSTRAINT "FK_21d3a2dfe8f62e787c32c14c2a7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_03585d421deb10bbc326fffe4c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "artists"`);
    await queryRunner.query(`DROP TABLE "audio_groups"`);
    await queryRunner.query(`DROP TYPE "public"."audio_groups_type_enum"`);
    await queryRunner.query(`DROP TABLE "audios"`);
  }
}
