import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewsEntity1581775371254 implements MigrationInterface {
  name = 'CreateNewsEntity1581775371254';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "news"`, undefined);
  }
}
