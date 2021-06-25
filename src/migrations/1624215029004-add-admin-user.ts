import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAdminUser1624215029004 implements MigrationInterface {
    name = 'AddAdminUser1624215029004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public."user" (login, name, password) VALUES ('admin', 'admin', '$2b$10$pbFbzS0pKm714aXF6TM.iuPt3AjZ99cU6K/jTrvfb19k5ihu7FiKq')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public."user" WHERE login='admin'`);
    }

}
