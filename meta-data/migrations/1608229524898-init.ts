import {MigrationInterface, QueryRunner} from "typeorm";

export class init1608229524898 implements MigrationInterface {
    name = 'init1608229524898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_categories_posts" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "some_column" varchar NOT NULL, "post_id" integer, "category_id" integer, CONSTRAINT "FK_70980bcc3dc8718e5d580afc620" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_653a5dd4ae2517979bc6be018ab" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_categories_posts"("created_at", "updated_at", "id", "some_column", "post_id", "category_id") SELECT "created_at", "updated_at", "id", "some_column", "post_id", "category_id" FROM "categories_posts"`);
        await queryRunner.query(`DROP TABLE "categories_posts"`);
        await queryRunner.query(`ALTER TABLE "temporary_categories_posts" RENAME TO "categories_posts"`);
        await queryRunner.query(`CREATE TABLE "temporary_categories_posts" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "some_column" varchar, "post_id" integer, "category_id" integer, CONSTRAINT "FK_70980bcc3dc8718e5d580afc620" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_653a5dd4ae2517979bc6be018ab" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_categories_posts"("created_at", "updated_at", "id", "some_column", "post_id", "category_id") SELECT "created_at", "updated_at", "id", "some_column", "post_id", "category_id" FROM "categories_posts"`);
        await queryRunner.query(`DROP TABLE "categories_posts"`);
        await queryRunner.query(`ALTER TABLE "temporary_categories_posts" RENAME TO "categories_posts"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_posts" RENAME TO "temporary_categories_posts"`);
        await queryRunner.query(`CREATE TABLE "categories_posts" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "some_column" varchar NOT NULL, "post_id" integer, "category_id" integer, CONSTRAINT "FK_70980bcc3dc8718e5d580afc620" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_653a5dd4ae2517979bc6be018ab" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "categories_posts"("created_at", "updated_at", "id", "some_column", "post_id", "category_id") SELECT "created_at", "updated_at", "id", "some_column", "post_id", "category_id" FROM "temporary_categories_posts"`);
        await queryRunner.query(`DROP TABLE "temporary_categories_posts"`);
        await queryRunner.query(`ALTER TABLE "categories_posts" RENAME TO "temporary_categories_posts"`);
        await queryRunner.query(`CREATE TABLE "categories_posts" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "some_column" varchar NOT NULL, "post_id" integer, "category_id" integer, CONSTRAINT "FK_70980bcc3dc8718e5d580afc620" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_653a5dd4ae2517979bc6be018ab" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "categories_posts"("created_at", "updated_at", "id", "some_column", "post_id", "category_id") SELECT "created_at", "updated_at", "id", "some_column", "post_id", "category_id" FROM "temporary_categories_posts"`);
        await queryRunner.query(`DROP TABLE "temporary_categories_posts"`);
    }

}
