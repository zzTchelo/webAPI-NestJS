import { MigrationInterface, QueryRunner } from "typeorm";

export class CatalogoTable1715404762669 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`
            CREATE TABLE FILMES(
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                title VARCHAR(256) NOT NULL,
                gender VARCHAR(50) NOT NULL DEFAULT 'GeneroFilme',
                date_release timestampz NOT NULL
                CONSTRAINT filme_pk PRIMARY KEY(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS FILMES;`);
    }

}
