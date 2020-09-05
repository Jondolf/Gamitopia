import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTagsAndMarkdown1599240030973 implements MigrationInterface {
    name = 'AddTagsAndMarkdown1599240030973'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "news" ADD "bodyAsHTML" character varying NOT NULL DEFAULT ''`, undefined);
        await queryRunner.query(`UPDATE "news" SET "bodyAsHTML" = "body"`, undefined);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "body"`, undefined);
        await queryRunner.query(`ALTER TABLE "news" ADD "tags" text array NOT NULL DEFAULT '{}'`, undefined);
        await queryRunner.query(`ALTER TABLE "news" ADD "bodyAsMarkdown" character varying NOT NULL DEFAULT ''`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "news" ADD "body" character varying DEFAULT ''`, undefined);
        await queryRunner.query(`UPDATE "news" SET "body" = "bodyAsHTML"`, undefined);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "bodyAsHTML"`, undefined);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "bodyAsMarkdown"`, undefined);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "tags"`, undefined);
    }

}
