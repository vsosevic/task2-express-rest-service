import { ConnectionOptions } from "typeorm";
import path from "path";
import {
    POSTGRES_PORT,
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB
} from './config';

const config: ConnectionOptions = {
    type: 'postgres',
    host: POSTGRES_HOST || 'localhost',
    port: POSTGRES_PORT ? parseInt(POSTGRES_PORT, 10): 5432,
    username: POSTGRES_USER || 'postgres',
    password: POSTGRES_PASSWORD || 'postgres',
    database: POSTGRES_DB || 'postgres',
    synchronize: false,
    migrationsRun: true,
    connectTimeoutMS: 60000,
    logging: false,
    entities: [path.join(__dirname, '../resources/**/*.model{.ts,.js}')],
    migrations: [path.join(__dirname, '../migrations/**/*{.ts,.js}')],
    cli: {
        migrationsDir: '/src/migrations'
    }
}

export default config;