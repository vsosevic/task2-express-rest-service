import * as dotenv from 'dotenv';

dotenv.config();
export const {
    PORT,
    NODE_ENV,
    MONGO_CONNECTION_STRING,
    JWT_SECRET_KEY,
    AUTH_MODE,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_DATA,
    POSTGRES_HOST
} = process.env;
