import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1734171493820 implements MigrationInterface {
    name = 'Migrations1734171493820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."song_groups_type_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "song_groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."song_groups_type_enum" NOT NULL DEFAULT '0', "coverImageUrl" character varying, "releaseDate" TIMESTAMP, "isListed" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "artistId" uuid, CONSTRAINT "UQ_ca0829ef06241fa1c396aa090db" UNIQUE ("type"), CONSTRAINT "PK_ceca1b13505645db603a83f05d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "audios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "spotifyId" character varying NOT NULL, "title" character varying NOT NULL, "artist" character varying NOT NULL, "featuredArtists" text NOT NULL, "album" character varying NOT NULL, "albumCoverUrl" character varying, "releaseDate" character varying, "durationInSeconds" integer NOT NULL DEFAULT '0', "popularity" double precision NOT NULL DEFAULT '0', "explicit" boolean NOT NULL DEFAULT false, "genres" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "UQ_945c04b98b5a20994e52a09da5a" UNIQUE ("spotifyId"), CONSTRAINT "PK_97a1fa83e0d0dac358d498d0a64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "song_groups" ADD CONSTRAINT "FK_8f1bfbee8902f874723039ffc99" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "audios" ADD CONSTRAINT "FK_21d3a2dfe8f62e787c32c14c2a7" FOREIGN KEY ("userId") REFERENCES "audios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audios" DROP CONSTRAINT "FK_21d3a2dfe8f62e787c32c14c2a7"`);
        await queryRunner.query(`ALTER TABLE "song_groups" DROP CONSTRAINT "FK_8f1bfbee8902f874723039ffc99"`);
        await queryRunner.query(`DROP TABLE "audios"`);
        await queryRunner.query(`DROP TABLE "song_groups"`);
        await queryRunner.query(`DROP TYPE "public"."song_groups_type_enum"`);
    }

}
