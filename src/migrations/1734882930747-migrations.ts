import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734882930747 implements MigrationInterface {
  name = 'Migrations1734882930747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audios" DROP CONSTRAINT "FK_21d3a2dfe8f62e787c32c14c2a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" DROP CONSTRAINT "UQ_945c04b98b5a20994e52a09da5a"`,
    );
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "spotifyId"`);
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "artist"`);
    await queryRunner.query(
      `ALTER TABLE "audios" DROP COLUMN "featuredArtists"`,
    );
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "album"`);
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "albumCoverUrl"`);
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "popularity"`);
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "explicit"`);
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "genres"`);
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "audio_groups" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_groups" ADD "genre" json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_groups" ADD "subGenres" json NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."audios_filetype_enum" AS ENUM('WAV', 'MP3', 'FLAC', 'AIFF', 'WMA')`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "fileType" "public"."audios_filetype_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD CONSTRAINT "UQ_d1720fa687f1e1a1035edd6a53b" UNIQUE ("fileType")`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "trackNumber" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "coverImageUrl" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "audios" ADD "genre" json NOT NULL`);
    await queryRunner.query(`ALTER TABLE "audios" ADD "artistId" uuid`);
    await queryRunner.query(`ALTER TABLE "audios" ADD "audioGroupId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "audio_groups" DROP CONSTRAINT "UQ_3822c237d2c115cd5d08319efa0"`,
    );
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "releaseDate"`);
    await queryRunner.query(`ALTER TABLE "audios" ADD "releaseDate" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "audios" ADD CONSTRAINT "FK_2718bf425c2112f9e5b548a07b5" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD CONSTRAINT "FK_87f0a2e30024e4f679fa7c1e39e" FOREIGN KEY ("audioGroupId") REFERENCES "audio_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audios" DROP CONSTRAINT "FK_87f0a2e30024e4f679fa7c1e39e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" DROP CONSTRAINT "FK_2718bf425c2112f9e5b548a07b5"`,
    );
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "releaseDate"`);
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "releaseDate" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_groups" ADD CONSTRAINT "UQ_3822c237d2c115cd5d08319efa0" UNIQUE ("type")`,
    );
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "audioGroupId"`);
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "artistId"`);
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "genre"`);
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "coverImageUrl"`);
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "trackNumber"`);
    await queryRunner.query(
      `ALTER TABLE "audios" DROP CONSTRAINT "UQ_d1720fa687f1e1a1035edd6a53b"`,
    );
    await queryRunner.query(`ALTER TABLE "audios" DROP COLUMN "fileType"`);
    await queryRunner.query(`DROP TYPE "public"."audios_filetype_enum"`);
    await queryRunner.query(
      `ALTER TABLE "audio_groups" DROP COLUMN "subGenres"`,
    );
    await queryRunner.query(`ALTER TABLE "audio_groups" DROP COLUMN "genre"`);
    await queryRunner.query(`ALTER TABLE "audio_groups" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "audios" ADD "userId" uuid`);
    await queryRunner.query(`ALTER TABLE "audios" ADD "genres" text`);
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "explicit" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "popularity" double precision NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "albumCoverUrl" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "album" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "featuredArtists" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "artist" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD "spotifyId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD CONSTRAINT "UQ_945c04b98b5a20994e52a09da5a" UNIQUE ("spotifyId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "audios" ADD CONSTRAINT "FK_21d3a2dfe8f62e787c32c14c2a7" FOREIGN KEY ("userId") REFERENCES "audios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
